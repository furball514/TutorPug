const router = require("koa-router");
const user = require('./models/user')
const route = new router();

route.get('/expiryCheck',ctx => {
  ctx.body = 'success';
})

route.get('/getAll',async ctx => {
  try {
    const data = await user.findOne({uniqueID: ctx.state.user.uniqueID});
    if (data) {
      ctx.body = data;
      console.log(data);
    }
  }
  catch (error) {
    console.error(error);
}
})

module.exports = route;