'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
// const fs = require('fs');
// const path = require('path');
const random = (min, max) => {
  return Math.round(min + Math.random() * (max - min));
};
const randomNumber = len => {
  let num = '';
  while (num.length < len) {
    num += random(0, 9);
  }
  return num;
};
class UserController extends Controller {
  async sendCode() {
    const { ctx } = this;
    const { phone } = ctx.query;
    if (phone && phone.length === 11) {
      ctx.session.messageCode = randomNumber(6);
      ctx.body = {
        code: 1,
        messsge: `验证码[${ctx.session.messageCode}]已经发送至手机用户${phone}`,
      };
    } else {
      ctx.throw(422, {
        messsge: '请输入正确的手机号',
      });
    }
  }
  async login() {
    const { ctx } = this;
    const { phone, code } = ctx.request.body;
    if (code !== ctx.session.messageCode) {
      ctx.throw(422, {
        code: 1,
        messsge: '验证码错误',
      });
    } else {
      const user = await ctx.service.user.find({
        phone,
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
          messsge: '用户未注册',
        });
      }
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
