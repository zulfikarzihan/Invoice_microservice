'use strict';

module.exports = (sequelize, DataTypes) => {
  const InvoiceItem = sequelize.define('InvoiceItem', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    invoiceId: {
      field: 'invoice_id',
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    subscriptionId: { 
      field: 'subscription_id',
      type: DataTypes.STRING,
      allowNull: true
    },
    productId: { 
      field: 'product_id',
      type: DataTypes.STRING,
      allowNull: false
    },
    productName: { 
      field: 'product_name',
      type: DataTypes.STRING,
      allowNull: false
    },
    planId: { 
      field: 'plan_id',
      type: DataTypes.STRING,
      allowNull: true
    },
    planName: { 
      field: 'plan_name',
      type: DataTypes.STRING,
      allowNull: true
    },
    phaseType: { 
      field: 'phase_type',
      type: DataTypes.STRING,
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(20, 6),
      allowNull: false
    },
    quantity: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'invoice_item',
    timestamps: false
  });

  InvoiceItem.associate = function(models) {
    InvoiceItem.belongsTo(models['Invoice'], { foreignKey: 'invoiceId' });
  };

  return InvoiceItem;
};