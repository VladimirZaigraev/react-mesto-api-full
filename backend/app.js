/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const { PORT = 3000 } = process.env;
const errorHandler = require('./middelwares/errorHandler');
const { routes } = require('./routes/index');
const auth = require('./middelwares/auth');
const {
  createUserValidation,
  loginValidation,
} = require('./middelwares/validate');
const {
  requestLogger,
  errorLogger,
} = require('./middelwares/logger');

const {
  createUser,
  loginUser,
} = require('./controllers/userControllers');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: [
    'http://localhost:3001',
    'https://zaigraev.nomoredomains.work',
    'http://zaigraev.nomoredomains.work',
  ],
  methods: ['OPTIONS', 'GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Cookie'],
  credentials: true,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(requestLogger); // логгер запросов

// роуты
app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginValidation, loginUser);
app.use('/', auth, routes);// роуты с обязательной авторизацией

app.use(errorLogger); // логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // централизованный обработчик

async function main() {
  try {
    console.log('Try to coonect to mongodb');
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
    });
  } catch (err) {
    console.log(err);
  }

  console.log('Connected');

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

main();
