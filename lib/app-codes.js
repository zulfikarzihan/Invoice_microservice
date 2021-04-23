'use strict';

const httpCodes = require('./http-codes');

module.exports = {
  SUCCESS: {
    httpCode: httpCodes.OK.code,
    code: 0,
    title: 'Success',
    details: 'Success'
  },
  INVOICE_NOT_FOUND: {
    httpCode: httpCodes.NOT_FOUND.code,
    code: 1,
    title: httpCodes.NOT_FOUND.msg,
    details: 'Invalid Invoice-Id'
  },
  INVOICE_STATUS_PAID: {
    httpCode: httpCodes.BAD_REQUEST.code,
    code: 2,
    title: httpCodes.BAD_REQUEST.msg,
    details: 'Invoice already in Paid state'
  },
  INVOICE_STATUS_FAILED: {
    httpCode: httpCodes.BAD_REQUEST.code,
    code: 3,
    title: httpCodes.BAD_REQUEST.msg,
    details: 'Invoice already in Failed state'
  },
  INVOICE_UPDATE_FAILED: {
    httpCode: httpCodes.PRECONDITION_FAILED.code,
    code: 4,
    title: httpCodes.PRECONDITION_FAILED.msg,
    details: 'Failed to update Invoice'
  },
  INVALID_LINKED_INVOICE_ID: {
    httpCode: httpCodes.BAD_REQUEST.code,
    code: 5,
    title: httpCodes.BAD_REQUEST.msg,
    details: 'Invalid Linked-Invoice-Id'
  },
  NOT_FOUND: {
    httpCode: httpCodes.NOT_FOUND.code,
    code: 253,
    title: httpCodes.NOT_FOUND.msg,
    details: httpCodes.NOT_FOUND.msg
  },
  BAD_REQUEST: {
    httpCode: httpCodes.BAD_REQUEST.code,
    code: 254,
    title: httpCodes.BAD_REQUEST.msg,
    details: httpCodes.BAD_REQUEST.msg
  },
  INTERNAL_SERVER_ERROR: {
    httpCode: httpCodes.INTERNAL_SERVER_ERROR.code,
    code: 255,
    title: httpCodes.INTERNAL_SERVER_ERROR.msg,
    details: httpCodes.INTERNAL_SERVER_ERROR.msg
  }
};
