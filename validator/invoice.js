'use strict';

module.exports = (ValidationSchema, Joi) => {
  return [
    ValidationSchema.define('InvoiceCreateSchema', Joi.object().keys({
      type: Joi.string().valid('Subscription', 'Recurring', 'Fixed', 'External-Charge', 'Refund').required(),
      accountId: Joi.string().max(225).required(),
      currency: Joi.string().max(36).required(),
      invoiceAt: Joi.date().format('YYYY-MM-DD HH:mm:ss').required(),
      paymentAttemptAt: Joi.date().format('YYYY-MM-DD HH:mm:ss').required(),
      status: Joi.string().valid('Created', 'Pending', 'Cancelled', 'Paid', 'Failed').optional(),
      remarks: Joi.string().max(1024).optional(),
      gatewayId: Joi.string().max(255).optional(),
      gatewayParams: Joi.object().optional(),
      linkedInvoiceId: Joi.number().integer().optional(),
      items: Joi.array().items(Joi.object().keys({
        productId: Joi.string().max(255).required(),
        productName: Joi.string().max(255).required(),
        subscriptionId: Joi.string().max(255).optional(),
        planId: Joi.string().max(255).optional(),
        planName: Joi.string().max(255).optional(),
        phaseType: Joi.string().max(255).optional(),
        amount: Joi.number().required(),
        quantity: Joi.number().integer().min(1).optional(),
        details: Joi.string().max(255).optional()
      })).min(1).required(),
      payment: Joi.object().keys({
        paymentId: Joi.string().max(255).optional(),
        paymentDate: Joi.date().format('YYYY-MM-DD HH:mm:ss').required(),
        success: Joi.boolean().optional()
      }).optional(),
      createdBy: Joi.string().max(255).required(),
      appId: Joi.string().max(255).optional()
    })),
    ValidationSchema.define('InvoiceUpdateSchema', Joi.object().keys({
      id: Joi.number().integer().min(1).required(),
      currency: Joi.string().max(36).optional(),
      invoiceAt: Joi.date().format('YYYY-MM-DD HH:mm:ss').optional(),
      paymentAttemptAt: Joi.date().format('YYYY-MM-DD HH:mm:ss').optional(),
      status: Joi.string().valid('Created', 'Pending', 'Cancelled', 'Paid', 'Failed').optional(),
      remarks: Joi.string().max(1024).optional(),
      gatewayId: Joi.string().max(255).optional(),
      gatewayParams: Joi.object().optional(),
      items: Joi.array().items(Joi.object().keys({
        productId: Joi.string().max(255).required(),
        productName: Joi.string().max(255).required(),
        subscriptionId: Joi.string().max(255).optional(),
        planId: Joi.string().max(255).optional(),
        planName: Joi.string().max(255).optional(),
        phaseType: Joi.string().max(255).optional(),
        amount: Joi.number().required(),
        quantity: Joi.number().integer().min(1).optional(),
        details: Joi.string().max(255).optional()
      })).min(1).optional(),
      payment: Joi.object().keys({
        paymentId: Joi.string().max(255).optional(),
        paymentDate: Joi.date().format('YYYY-MM-DD HH:mm:ss').optional(),
        success: Joi.boolean().optional()
      }).optional(),
      updatedBy: Joi.string().max(255).required(),
      appId: Joi.string().max(255).optional()
    }).or(
      'currency', 'invoiceAt', 'paymentAttemptAt', 'status', 'remarks', 'gatewayId', 'gatewayParams', 'items', 'payment'
    )),
    ValidationSchema.define('InvoiceFetchSchema', Joi.object().keys({
      id: Joi.number().integer().min(0).optional(),
      type: Joi.array().items(Joi.string().valid('Subscription', 'Recurring', 'Fixed', 'External-Charge', 'Refund')).optional(),
      accountId: Joi.string().max(225).optional(),
      startInvoiceAt: Joi.date().format('YYYY-MM-DD HH:mm:ss').options({ convert: true }).optional(),
      endInvoiceAt: Joi.date().format('YYYY-MM-DD HH:mm:ss').options({ convert: true }).optional(),
      startPaymentAttemptAt: Joi.date().format('YYYY-MM-DD HH:mm:ss').options({ convert: true }).optional(),
      endPaymentAttemptAt: Joi.date().format('YYYY-MM-DD HH:mm:ss').options({ convert: true }).optional(),
      status: Joi.array().items(Joi.string().valid('Created', 'Pending', 'Cancelled', 'Paid', 'Failed')).optional(),
      productId: Joi.string().max(255).optional(),
      planId: Joi.string().max(255).optional(),
      subscriptionId: Joi.string().max(255).optional(),
      offset: Joi.number().integer().min(0).optional(),
      limit: Joi.number().integer().min(1).optional(),
      appId: Joi.string().max(255).optional()
    }))
  ];
};
