'use strict';

module.exports = (req, res, next) => {
  !req.body.appId && (req.body.appId = 'NA');
  !req.query.appId && (req.query.appId = 'NA');
  next();
};