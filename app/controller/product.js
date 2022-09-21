'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async list() {
    const { ctx } = this;
    const {
      page = 1,
      page_size = 10,
    } = ctx.query;
    const data = await ctx.service.product.product({
      page,
      page_size,
    });
    ctx.body = {
      code: 1,
      data: data.map(item => {
        return {
          ...item,
          images: JSON.parse(item.images),
          promotionInfoList: JSON.parse(item.promotionInfoList),
        };
      }),
    };
  }
}

module.exports = HomeController;
