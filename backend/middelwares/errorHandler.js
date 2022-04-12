/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  console.log(err.stack || err);

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
};

module.exports = errorHandler;
