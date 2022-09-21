'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const banner = await ctx.service.home.banner();
    const mull_nav = await ctx.service.home.mull_nav();
    const hot_nav = await ctx.service.home.hot_nav();
    ctx.body = {
      code: 1,
      data: {
        banner,
        mull_nav,
        hot_nav,
      },
    };

  }
}

module.exports = HomeController;
