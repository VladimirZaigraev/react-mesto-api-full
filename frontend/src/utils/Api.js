/*Класс Api -- это класс, который не связан с пользовательским интерфейсом,
а полностью занят отправкой запросов на сервер и получением от них ответа. */

class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  // получаем данные пользователя
  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        // 'content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(this._checkResult);
  }

  // передаем данные пользователя
  editUserInfo(userData, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    })
      .then(this._checkResult);
  }
  // загрузка карточек
  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(this._checkResult);
  }
  //добавить карточку
  addCard(newCard, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
    })
      .then(this._checkResult);
  }
  //удалить карточку
  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(this._checkResult);
  }

  //добавление лайка
  addLike(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(this._checkResult)
  }

  //удаление лайка
  removeLike(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(this._checkResult)
  }

  // заменяем аватар пользователя
  editUserAvatar(link, token) {
    console.log(link)
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResult);
  }

  _checkResult(res) {
    console.log(res)
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  showError(err) {
    console.groupCollapsed('%c Api error', 'color: red')
    console.log(err)
    console.groupEnd()
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    console.log(cardId)
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,
      {
        method: isLiked ? "PUT" : "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then(this._checkResult);
  }

}

const api = new Api({
  baseUrl: 'http://localhost:3000',
});
export default api;
