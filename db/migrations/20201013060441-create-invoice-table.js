'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('invoice', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      type: {
        type: Sequelize.ENUM('Subscription', 'Recurring', 'Fixed', 'External-Charge', 'Refund'),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Created', 'Pending', 'Cancelled', 'Paid', 'Failed'),
        allowNull: false,
        defaultValue: 'Created'
      },
      orderId: {
        field: 'order_id',
        type: Sequelize.STRING,
        allowNull: true
      },
      accountId: {
        field: 'account_id',
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(20, 6),
        allowNull: false
      },
      currency: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      invoiceAt: {
        field: 'invoice_at',
        type: Sequelize.DATE,
        allowNull: false
      },
      paymentAttemptAt: {
        field: 'payment_attempt_at',
        type: Sequelize.DATE,
        allowNull: false
      },
      remarks: {
        type: Sequelize.STRING(1024),
        allowNull: true
      },
      gatewayId: {
        field: 'gateway_id',
        type: Sequelize.STRING,
        allowNull: true
      },
      gatewayParams: {
        field: 'gateway_params',
        type: Sequelize.JSON,
        allowNull: true
      },
      linkedInvoiceId: {
        field: 'linked_invoice_id',
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true
      },
      appId: {
        field: 'app_id',
        type: Sequelize.STRING,
        allowNull: true
      },
      createdBy: {
        field: 'created_by',
        type: Sequelize.STRING(255),
        allowNull: false
      },
      updatedBy: {
        field: 'updated_by',
        type: Sequelize.STRING(255),
        allowNull: true
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
        allowNull: true
      }
    }, {
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('invoice');
  }
};
