// const BASE_URL = "https://api.zaigraev.nomoredomains.work";
const BASE_URL = 'http://localhost:3000';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

const checkResult = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

//регистрация пользователя /sign-up
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
      password
    }),
  }).then(checkResult);
};

// авторизация /sign-in
export const authorize = (email, password, token) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers
      : {
      ...headers,
      Authorization: `Bearer ${token}`,
    }
    ,
    body: JSON.stringify({ email, password }),
  }).then(checkResult);
};

// проверка токена /users/me
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResult);
};

export const showError = (err, text) => {
  console.groupCollapsed('%c Auth error', 'color: red')
  console.log(err, text)
  console.groupEnd()
}

export default BASE_URL;