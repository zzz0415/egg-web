'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
// const fs = require('fs');
// const path = require('path');


class UserController extends Controller {
  async login() {
    const { ctx } = this;
    const user = await ctx.service.user.find({
      account: ctx.request.body.account,
      password: ctx.request.body.password,
    });
    if (Object.keys(user).length >= 1) {
      const token = jwt.sign({
        ...user,
      }, 'zzz123');
      ctx.body = {
        code: 1,
        token,
        messsge: '登录成功',
      };
    } else {
      ctx.throw(422, {
        code: 1,
        messsge: '账号密码错误',
      });
    }
  }
  async info() {
    const { ctx } = this;
    ctx.body = {
      code: 1,
      data: ctx.info,
    };
  }
  async register() {
    const { ctx } = this;
    try {
      const user = await ctx.service.user.find({
        account: ctx.request.body.account,
        name: ctx.request.body.name,
        phone: ctx.request.body.phone,
      });
      if (Object.keys(user).length >= 1) {
        console.log(user);
        ctx.throw(422, {
          code: 0,
          messsge: '账号已被注册',
        });
      } else {
        await ctx.service.user.register(ctx.request.body);
        ctx.body = {
          code: 1,
          messsge: '添加成功',
        };
      }
    } catch (e) {
      ctx.throw(422, {
        code: 0,
        messsge: e.messsge || '添加失败',
      });
    }
  }
}


module.exports = UserController;
