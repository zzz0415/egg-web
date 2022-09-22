'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);
  router.get('/api/product', controller.product.list);
  // router.post('/api/product', controller.product.create);
  router.get('/api/home', controller.home.index);
  router.get('/api/category', controller.product.category);
  router.get('/api/product/:id', controller.product.details);
};
