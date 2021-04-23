'use strict';

module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM('Subscription', 'Recurring', 'Fixed', 'External-Charge', 'Refund'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Created', 'Pending', 'Cancelled', 'Paid', 'Failed'),
      allowNull: false,
      defaultValue: 'Created'
    },
    orderId: {
      field: 'order_id',
      type: DataTypes.STRING,
      allowNull: true
    },
    accountId: {
      field: 'account_id',
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(20, 6),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    invoiceAt: {
      field: 'invoice_at',
      type: DataTypes.DATE,
      allowNull: false
    },
    paymentAttemptAt: {
      field: 'payment_attempt_at',
      type: DataTypes.DATE,
      allowNull: false
    },
    remarks: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    gatewayId: {
      field: 'gateway_id',
      type: DataTypes.STRING,
      allowNull: true
    },
    gatewayParams: {
      field: 'gateway_params',
      type: DataTypes.JSON,
      allowNull: true
    },
    linkedInvoiceId: {
      field: 'linked_invoice_id',
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    appId: {
      field: 'app_id',
      type: DataTypes.STRING,
      allowNull: true
    },
    createdBy: {
      field: 'created_by',
      type: DataTypes.STRING(255),
      allowNull: false
    },
    updatedBy: {
      field: 'updated_by',
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'invoice'
  });

  Invoice.associate = function(models) {
    Invoice.hasMany(models['InvoiceItem'], { foreignKey: 'invoiceId' , as: {singular: 'items', plural: 'items'}});
    Invoice.hasMany(models['InvoicePayment'], { foreignKey: 'invoiceId',  as: {singular: 'payments', plural: 'payments'} });
  };

  return Invoice;
};