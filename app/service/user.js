'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async register(data) {
    // console.log(data);
    const res = await this.app.mysql.insert('user', data);
    return res;
  }
  async find(where) {
    const res = await this.app.mysql.select('user', where);
    return res;
  }
}
module.exports = UserService;
