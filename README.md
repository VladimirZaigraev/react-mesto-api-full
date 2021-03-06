<h1 align="center">MESTO</h1>

![Screenshot](https://github.com/VladimirZaigraev/react-mesto-api-full/blob/main/screenshot/Screenshot.jpg)

Интерактивная страница, для добавления фотографии мест, с возможностью просмотра и потановки лайков фотографиям других пользователей. Реализован функционал регистрации, авторизации, редактирования профиля, добавления изображений в галерею по ссылкам. 
  
Ссылка на сайт: [https://zaigraev.nomoredomains.work](https://zaigraev.nomoredomains.work)

Публинчый ip: [51.250.105.148](51.250.105.148)


<h3 align="center">Технологии</h1>

- HTML5 - cемантическая вёрстка
- CSS3 (Flexbox, Grid) - Наименования элементов и структура по методологии БЭМ Nested. Анимации элементов. Интерфейс адаптирован под различные устройства ( от 320 до 1280 и более пикселей по ширине).
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
- nginx - перенаправление запросов с 80 порта на порт, который слушает Node

Сервер создан на виртуальной машине Yandex.Cloud

<h3 align="center">Инструкция по развёртыванию</h1>

npm i - установка модулей

npm run start - запуск frontend/backend

<h3 align="center">Ограничения</h1>
react-router-dom 5
