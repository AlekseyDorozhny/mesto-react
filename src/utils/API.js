class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
    .then((res) => this._checkResponse(res))
  };

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
    .then((res) => this._checkResponse(res))
  }

  sendUserInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((res) => this._checkResponse(res))
  };

  sendUserAvatar(url) {
    console.log(url)
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: url
      })
    })
    .then((res) => this._checkResponse(res))
  };

  likeHendler(ID, status) {
    const method = (status)? 'PUT' : 'DELETE';
    return fetch(`${this.baseUrl}/cards/${ID}/likes `, {
      method: `${method}`,
      headers: this.headers,
    })
    .then((res) => this._checkResponse(res))
  }

  sendCard(link, name) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        link: link,
        name: name
      })
    })
    .then((res) => this._checkResponse(res))
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then((res) => this._checkResponse(res))
  }
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-70',
  headers: {
    authorization: 'a400d028-60ca-4464-923c-d42d02840b32',
    'Content-Type': 'application/json'
  }
});


export default api
