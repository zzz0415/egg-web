const Service = require('egg').Service;

class ProductService extends Service {
  async product({ page, page_size, categoryId }) {
    const data = await this.app.mysql.select('product', {
      where: {
        categoryId,
      },
      limit: page_size * 1,
      offset: (page - 1) * page_size,
    });
    return data;
  }

  async category() {
    const data = await this.app.mysql.select('category');
    return data;
  }
  async details(id) {
    const data = await this.app.mysql.get('product', id);
    return data;
  }
}

module.exports = ProductService;
