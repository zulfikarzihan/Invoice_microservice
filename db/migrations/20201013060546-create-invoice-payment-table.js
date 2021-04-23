'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('invoice_payment', {
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
      paymentId: { 
        field: 'payment_id',
        type: Sequelize.STRING(255),
        allowNull: true
      },
      paymentDate: { 
        field: 'payment_date',
        type: Sequelize.DATE,
        allowNull: false
      },
      success: { 
        type: Sequelize.TINYINT,
        defaultValue: 1,
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
    return queryInterface.dropTable('invoice_payment');
  }
};