'use strict';

module.exports = (db) => {
  return require('./invoice-controller')(
    require('./invoice-service')(db)
  );
};