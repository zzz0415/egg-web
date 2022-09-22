'use strict';

const Controller = require('egg').Controller;
// 扁平数据转化tree
const arrToTree = arr => {
  const newArr = [];
  const arrJSON = {};
  arr.forEach(item => {
    arrJSON[item.categoryId] = item;
    if (item.parentId === 0) {
      newArr.push(item);
    }
  });
  arr.forEach(item => {
    if (item.parentId !== 0) {
      const parent = arrJSON[item.parentId];
      if (parent.children) {
        parent.children.push(item);
      } else {
        parent.children = [ item ];
      }
    }
  });
  return newArr;
};


const getTreeId = (tree, id, flag) => {
  let ids = [];
  if (flag) {
    tree.forEach(item => {
      ids.push(item.categoryId);
      if (item.children) {
        ids = ids.concat(getTreeId(item.children, id, true));
      }
    });
  } else {
    tree.forEach(item => {
      if (item.categoryId === id * 1) {
        if (item.children) {
          ids = ids.concat(getTreeId(item.children, id, true));
        }
        ids.push(item.categoryId);
      } else {
        if (item.children) {
          ids = ids.concat(getTreeId(item.children, id, false));
        }
      }
    });
  }
  return ids;
};
class HomeController extends Controller {
  async list() {
    const { ctx } = this;
    const {
      page = 1,
      page_size = 10,
      categoryId,
    } = ctx.query;
    let ids = '';
    if (categoryId) {
      const data = await ctx.service.product.category();
      const tree = arrToTree(data);
      ids = getTreeId(tree, categoryId);
    }
    const data = await ctx.service.product.product({
      page,
      page_size,
      categoryId: ids,
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
  async category() {
    const { ctx } = this;
    const data = await ctx.service.product.category();
    ctx.body = {
      code: 1,
      data: arrToTree(data),
    };
  }
  async details() {
    const { ctx } = this;
    const id = ctx.params;
    const data = await ctx.service.product.details(id);
    ctx.body = {
      code: 1,
      data: {
        ...data,
        promotionInfoList: JSON.parse(data.promotionInfoList),
        images: JSON.parse(data.images),
        detail: JSON.parse(data.detail),
      },
    };
  }
}
module.exports = HomeController;
