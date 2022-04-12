/*Класс Api -- это класс, который не связан с пользовательским интерфейсом,
а полностью занят отправкой запросов на сервер и получением от них ответа. */

class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }
  //получаем данные пользователя
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkResult);
  }
  //передаем данные пользователя
  editUserInfo(userInfoData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify((userInfoData))
    })
      .then(this._checkResult);
  }
  //загрузка карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkResult);
  }
  //добавить карточку
  addCard(newCard) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(newCard)
    })
      .then(this._checkResult);
  }
  //удалить карточку
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResult);
  }
  //добавление лайка
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResult)
  }

  //удаление лайка
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResult)
  }

  //заменяем данные пользователя
  editUserAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatarLink)
    })
      .then(this._checkResult);
  }

  _checkResult(res) {
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

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.removeLike(cardId);
    } else {
      return this.addLike(cardId);
    }
  }

}

const api = new Api({
  baseUrl: 'https://api.zaigraev.nomoredomains.work',
  headers: {
    'content-Type': 'application/json',
    //'Authorization': `${localStorage.getItem('jwt')}`,
  }
});
export default api;
