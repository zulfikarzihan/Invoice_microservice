'use strict';

module.exports = (db) => {
  const { AppError } = require('../app-error');
  const appCodes = require('../app-codes');
  const constant = require('../constants');

  function buildConditionForQuery(queryParams) {
    const condition = {};
    if (queryParams.id) {
      condition.id = {
        [db.Sequelize.Op.eq]: queryParams.id
      };
    }
    if (queryParams.type) {
      condition.type = {
        [db.Sequelize.Op.in]: queryParams.type
      };
    }
    if (queryParams.accountId) {
      condition.accountId = {
        [db.Sequelize.Op.eq]: queryParams.accountId
      };
    }
    if (queryParams.startInvoiceAt && queryParams.endInvoiceAt) {
      condition[db.Sequelize.Op.and] = [
        {
          invoiceAt: {
            [db.Sequelize.Op.gte]: queryParams.startInvoiceAt
          }
        },
        {
          invoiceAt: {
            [db.Sequelize.Op.lte]: queryParams.endInvoiceAt
          }
        }
      ];
    }
    if (queryParams.startInvoiceAt && !queryParams.endInvoiceAt) {
      condition.invoiceAt = {
        [db.Sequelize.Op.gte]: queryParams.startInvoiceAt
      };
    }
    if (queryParams.endInvoiceAt && !queryParams.startInvoiceAt) {
      condition.invoiceAt = {
        [db.Sequelize.Op.lte]: queryParams.endInvoiceAt
      };
    }
    if (queryParams.startPaymentAttemptAt && queryParams.endPaymentAttemptAt) {
      condition[db.Sequelize.Op.and] = [
        {
          paymentAttemptAt: {
            [db.Sequelize.Op.gte]: queryParams.startPaymentAttemptAt
          }
        },
        {
          paymentAttemptAt: {
            [db.Sequelize.Op.lte]: queryParams.endPaymentAttemptAt
          }
        }
      ];
    }
    if (queryParams.startPaymentAttemptAt && !queryParams.endPaymentAttemptAt) {
      condition.paymentAttemptAt = {
        [db.Sequelize.Op.gte]: queryParams.startPaymentAttemptAt
      };
    }
    if (queryParams.endPaymentAttemptAt && !queryParams.startPaymentAttemptAt) {
      condition.paymentAttemptAt = {
        [db.Sequelize.Op.lte]: queryParams.endPaymentAttemptAt
      };
    }
    if (queryParams.status) {
      condition.status = {
        [db.Sequelize.Op.in]: queryParams.status
      };
    }
    if (queryParams.appId) {
      condition.appId = {
        [db.Sequelize.Op.eq]: queryParams.appId
      };
    }
    return condition;
  }
  function buildConditionForQueryInvoiceItem(queryParams) {
    const condition = {};
    if (queryParams.subscriptionId) {
      condition.subscriptionId = {
        [db.Sequelize.Op.eq]: queryParams.subscriptionId
      };
    }
    if (queryParams.productId) {
      condition.productId = {
        [db.Sequelize.Op.eq]: queryParams.productId
      };
    }
    if (queryParams.planId) {
      condition.planId = {
        [db.Sequelize.Op.eq]: queryParams.planId
      };
    }
    return condition;
  }

  async function insertInvoiceItem(item, { transaction }) {
    return db.InvoiceItem
      .create(item, { transaction })
      .catch((err) => {
        throw new AppError(appCodes.INTERNAL_SERVER_ERROR);
      });
  }
  async function insertInvoicePayment(payment, { transaction }) {
    return db.InvoicePayment
      .create(payment, { transaction })
      .catch((err) => {
        throw new AppError(appCodes.INTERNAL_SERVER_ERROR);
      });
  }

  return {
    async create(invoice) {
      return await db.sequelize.transaction(async (t) => {
        return await db.Invoice
          .create(invoice, { transaction: t })
          .then(async (createdInvoice) => {
            await invoice.items.reduce(
              (promiseChain, item) => {
                return promiseChain.then(() => {
                  item.invoiceId = createdInvoice.dataValues.id;
                  return insertInvoiceItem(item, { transaction: t });
                });
              },
              Promise.resolve()
            );
            if (invoice.payment) {
              invoice.payment.invoiceId = createdInvoice.dataValues.id;
              await insertInvoicePayment(invoice.payment, { transaction: t });
            }
            return createdInvoice.dataValues.id;
          })
          .catch((err) => {
            throw new AppError(appCodes.INTERNAL_SERVER_ERROR);
          });
      })
        .then((result) => {
          return result;
        })
        .catch((err) => {
          throw err;
        });
    },
    async update(updatedInvoice) {
      return await db.sequelize.transaction(async (t) => {
        return await db.Invoice
          .update(updatedInvoice, {
            where: {
              id: {
                [db.Sequelize.Op.eq]: updatedInvoice.id
              },
              status: {
                [db.Sequelize.Op.notIn]: [constant.FAIELD, constant.PAID]
              }
            },
            transaction: t
          })
          .then(async ([affectedRows]) => {
            if (affectedRows <= 0) {
              throw new AppError(appCodes.INVOICE_UPDATE_FAILED);
            }
            if (updatedInvoice.items) {
              await updatedInvoice.items.reduce(
                (promiseChain, item) => {
                  return promiseChain.then(() => {
                    item.invoiceId = updatedInvoice.id;
                    return insertInvoiceItem(item, { transaction: t });
                  });
                },
                Promise.resolve()
              );
            }
            if (updatedInvoice.payment) {
              updatedInvoice.payment.invoiceId = updatedInvoice.id;
              await insertInvoicePayment(updatedInvoice.payment, { transaction: t });
            }
            return affectedRows;
          })
          .catch((err) => {
            if (err.constructor.name === 'AppError') {
              throw err;
            }

            throw new AppError(appCodes.INTERNAL_SERVER_ERROR);
          });
      })
        .then((result) => {
          return result;
        })
        .catch((err) => {
          throw err;
        });
    },
    async fetch(queryParams) {
      if (queryParams.offset) {
        queryParams.offset = Number(queryParams.offset);
      }
      if (queryParams.limit) {
        queryParams.limit = Number(queryParams.limit);
      }
      return await db.Invoice
        .findAll({
          offset: queryParams.offset,
          limit: queryParams.limit,
          where: buildConditionForQuery(queryParams),
          include: [
            {
              model: db.InvoiceItem,
              as: 'items',
              where: buildConditionForQueryInvoiceItem(queryParams),
              required: true
            },
            {
              model: db.InvoicePayment,
              as: 'payments',
              required: false
            }
          ]
        })
        .then((invoices) => {
          return invoices.map((invoice) => invoice.dataValues);
        })
        .catch((err) => {
          throw new AppError(appCodes.INTERNAL_SERVER_ERROR);
        });
    }
  };
};
