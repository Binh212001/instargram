const userRoute = require('./user');
const postRouter = require('./post');
const commentRoute = require('./comment');
const uploadRoute = require('./multer');
const route = (app) => {
  app.use('/api/v1', userRoute);
  app.use('/api/v1', postRouter);
  app.use('/api/v1', commentRoute);
  app.use('/api/v1', uploadRoute);
};

module.exports = route;
