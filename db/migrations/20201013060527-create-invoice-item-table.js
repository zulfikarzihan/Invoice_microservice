'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('invoice_item', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      invoiceId: {
        field: 'invoice_id',
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false
      },
      subscriptionId: { 
        field: 'subscription_id',
        type: Sequelize.STRING,
        allowNull: true
      },
      productId: { 
        field: 'product_id',
        type: Sequelize.STRING,
        allowNull: false
      },
      productName: { 
        field: 'product_name',
        type: Sequelize.STRING,
        allowNull: false
      },
      planId: { 
        field: 'plan_id',
        type: Sequelize.STRING,
        allowNull: true
      },
      planName: { 
        field: 'plan_name',
        type: Sequelize.STRING,
        allowNull: true
      },
      phaseType: { 
        field: 'phase_type',
        type: Sequelize.STRING,
        allowNull: true
      },
      amount: {
        type: Sequelize.DECIMAL(20, 6),
        allowNull: false
      },
      quantity: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1
      },
      details: {
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable('invoice_item');
  }
};