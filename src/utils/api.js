import {config} from './constants';

class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }

  _handleResponse(response){
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.statusText);
    }
  }

  getUser() {
    return fetch(`${this.url}/users/me`, { headers: this.headers})
      .then(this._handleResponse)
      .catch((err)=>{
        console.log(`Ошибка запроса пользователя: ${err}`);
      });
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, { headers: this.headers})
      .then(this._handleResponse)
      .catch((err)=>{
        console.log(`Ошибка запроса карточек: ${err}`);
      });
  }

  updateProfileInfo(data) {
    return fetch(`${this.url}/users/me`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          about: data.object
        })
      }
    )
      .then(this._handleResponse)
      .catch((err)=>{
        console.log(`Ошибка обновления профиля: ${err}`);
      });
  }

  updateProfileAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: data.object
        })
      }
    )
      .then(this._handleResponse)
      .catch((err)=>{
        console.log(`Ошибка обновления аватара: ${err}`);
      });
  }

  createCard(data) {
    return fetch(`${this.url}/cards`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          link: data.object
        })
      }
    )
      .then(this._handleResponse)
      .catch((err)=>{
        console.log(`Ошибка создания карточек: ${err}`);
      });
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`,
      {
        method: 'DELETE',
        headers: this.headers
      }
    )
      .then(this._handleResponse)
      .catch((err)=>{
        console.log(`Ошибка удаления карточки: ${err}`);
      });
  }

  createLike(id) {
    return fetch(`${this.url}/cards/likes/${id}`,
      {
        method: 'PUT',
        headers: this.headers
      }
    )
      .then(this._handleResponse)
      .catch((err)=>{
        console.log(`Ошибка добавления лайка: ${err}`);
      });
  }

  deleteLike(id) {
    return fetch(`${this.url}/cards/likes/${id}`,
      {
        method: 'DELETE',
        headers: this.headers
      }
    )
      .then(this._handleResponse)
      .catch((err)=>{
        console.log(`Ошибка удаления лайка: ${err}`);
      });
  }
}

const api = new Api(config);

export default api;
