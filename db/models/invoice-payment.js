'use strict';

module.exports = (sequelize, DataTypes) => {
  const InvoicePayment = sequelize.define('InvoicePayment', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    invoiceId: {
      field: 'invoice_id',
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    paymentId: { 
      field: 'payment_id',
      type: DataTypes.STRING,
      allowNull: true
    },
    paymentDate: { 
      field: 'payment_date',
      type: DataTypes.DATE,
      allowNull: false
    },
    success: { 
      type: DataTypes.TINYINT,
      defaultValue: 1,
      allowNull: true
    }
  }, {
    tableName: 'invoice_payment',
    timestamps: false
  });

  InvoicePayment.associate = function(models) {
    InvoicePayment.belongsTo(models['Invoice'], { foreignKey: 'invoiceId' });
  };

  return InvoicePayment;
};