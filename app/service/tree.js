const Service = require('egg').Service;
// 扁平数据转化为tree
function arrayToTree(items) {
  const result = [];
  const itemMap = {};
  for (const item of items) {
    if (!itemMap[item.categoryId]) {
      itemMap[item.categoryId] = {
        children: [],
      };
    }
    itemMap[item.categoryId] = {
      ...item,
      children: itemMap[item.categoryId].children,
    };
    const treeItem = itemMap[item.categoryId];
    if (item.parentId === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[item.parentId]) {
        itemMap[item.parentId] = {
          children: [],
        };
      }
      itemMap[item.parentId].children.push(treeItem);
    }

  }
  return result;
}

class TreeService extends Service {
  async category() {
    const data = await this.app.mysql.select('category');
    return arrayToTree(data);
  }
}

module.exports = TreeService;
