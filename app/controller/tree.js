'use strict';

const Controller = require('egg').Controller;

class TreeController extends Controller {
  async category() {
    const { ctx } = this;
    const category = await ctx.service.tree.category();
    ctx.body = {
      code: 1,
      data: {
        category,
      },
    };

  }
}

module.exports = TreeController;
