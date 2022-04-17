# MESTO
<h1 align="center">MESTO</h1>
![Image alt](https://github.com//VladimirZaigraev/react-mesto-api-full/raw/master/screenshot/Screenshot.jpg)

Интерактивная страница, для добавления фотографии мест, с возможностью просмотра и ставить лайки фотографиям других пользователей. Реализован функционал регистрации, авторизации, редактирования профиля, добавления изображений в галерею по ссылкам. 
  
Ссылка на сайт: [https://zaigraev.nomoredomains](https://zaigraev.nomoredomains)
Публинчый ip: [51.250.105.148] 51.250.105.148

### Технологии

- HTML5 - cемантическая вёрстка
- CSS3 (Flexbox, Grid) - Модель структуры и именования элементов по методологии БЭМ. Анимации элементов. Интерфейс адаптирован под различные устройства ( от 320 до 1280 и более пикселей по ширине).
- JavaScript ES6 - функциональный подход, async/await, fetch API.

- React - функциональные компоненты.
  - Функции Context, Ref, Redirect, Route, Switch.
  - Хуки useState, useEffect, useContext, useRef, useCallback, useHistory.
  - Авторизация, валидация, защита роутов.
  - LocalStorage - хранения данных между сессиями.

- Node.js/Express.js. 
  - API реализован по принципам REST для работы с базой данных, аутентификации/авторизации.
  - MongoDB(schema) - хранение и работа с данными.
  - Mongoose - для взаимодействия Node с MongoDB.
  - validator, joi/celebrate - валидация поступающих данных.
  - JWT - авторизация с помощью серверного куки с зашифрованным токен.
  - winston - логирование ошибок.
  - Реализована централизованная обработка ошибок с отправкой корректных статусов и сообщений о ошибках на запросы.
  - ESLint(airbnb-base) - стандартизация кода

Сервер развернут на виртуальной машине Yandex.Cloud, подключен nginx для перенаправления запросов с 80 порта на порт, который слушает Node.

### Инструкция по развёртыванию

npm i - установка модулей

npm run start - запуск frontend/backend