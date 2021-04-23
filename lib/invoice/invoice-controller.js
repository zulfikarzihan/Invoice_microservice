'use strict';

module.exports = (invoiceService) => {
  const AppError = require('../app-error').AppError;
  const appCodes = require('../app-codes');
  const constant = require('../constants');

  return {
    async createInvoice(invoice) {
      invoice.amount = invoice.items.reduce((currentSum, item) => currentSum + Number(item.amount), 0);
      if (invoice.linkedInvoiceId) {
        const linkedInvoices = await invoiceService.fetch({
          id: invoice.linkedInvoiceId,
          appId: invoice.appId
        });
        if (linkedInvoices.length === 0) throw new AppError(appCodes.INVALID_LINKED_INVOICE_ID);
      }

      const ret = await invoiceService.create(invoice);
      return invoiceService.fetch({ id: ret });
    },
    async updateInvoice(updatedInvoice) {
      const prevInvoices = await invoiceService.fetch({
        id: updatedInvoice.id, appId: updatedInvoice.appId
      });
      if (prevInvoices.length === 0) {
        throw new AppError(appCodes.INVOICE_NOT_FOUND);
      }
      if (prevInvoices[0].status === constant.PAID) {
        throw new AppError(appCodes.INVOICE_STATUS_PAID);
      }
      if (prevInvoices[0].status === constant.FAIELD) {
        throw new AppError(appCodes.INVOICE_STATUS_FAILED);
      }
      if (updatedInvoice.items) {
        updatedInvoice.amount = Number(prevInvoices[0].amount)
          + updatedInvoice.items.reduce(
            (currentSum, item) => currentSum + Number(item.amount), 0
          );
      }
      await invoiceService.update(updatedInvoice);
      return invoiceService.fetch({ id: updatedInvoice.id });
    },
    async fetchInvoices(queryParams) {
      return invoiceService.fetch(queryParams);
    }
  };
};
