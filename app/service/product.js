const Service = require('egg').Service;

class ProductService extends Service {
  async product({ page, page_size }) {
    const data = await this.app.mysql.select('product', {
      limit: page_size * 1,
      offset: (page - 1) * page_size,
    });
    return data;
  }
}

module.exports = ProductService;
