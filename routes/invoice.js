'use strict';

module.exports = (invoiceController) => {
  const express = require('express');
  const router = express.Router();

  const vs = require('../validator');
  const validationHandler = require('../middlewares/validation-handler');

  const responseHandler = require('../utils/response-handler');

  router
    .get('/invoice', function (req, res, next) {
        if(req.query.status){
          req.query.status = Array.isArray(req.query.status) ? req.query.status : [req.query.status];
        }
        if(req.query.type){
          req.query.type = Array.isArray(req.query.type) ? req.query.type : [req.query.type];
        }
        req.body = req.query;
        next();
      }, validationHandler(vs['InvoiceFetchSchema']),
      async function (req, res, next) {
        try {
          res.data = await invoiceController.fetchInvoices(req.body);
          responseHandler(null, req, res);
        } catch (err) {
          responseHandler(err, req, res);
        }
      })
    .post('/invoice', validationHandler(vs['InvoiceCreateSchema']),
      async function (req, res, next) {
        try {
          res.data = await invoiceController.createInvoice(req.body);
          responseHandler(null, req, res);
        } catch (err) {
          responseHandler(err, req, res);
        }
      })
    .put('/invoice', validationHandler(vs['InvoiceUpdateSchema']),
      async function (req, res, next) {
        try {
          res.data = await invoiceController.updateInvoice(req.body);
          responseHandler(null, req, res);
        } catch (err) {
          responseHandler(err, req, res);
        }
      });

  return router;
};