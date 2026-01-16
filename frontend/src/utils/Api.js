class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this._token = null;
  }

  setToken(token) {
    this._token = token;
  }

  _getHeaders() {
    const token = localStorage.getItem("jwt");

    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  }

  async _checkResponse(res) {
    const contentType = res.headers.get("content-type");

    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (res.ok) return data;

    return Promise.reject({
      status: res.status,
      message: data?.message || data || "Erro desconhecido",
    });
  }

  _makeRequest(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  getUserInfo() {
    return this._makeRequest(`${this._baseUrl}/users/me`);
  }

  getInitialCards() {
    return this._makeRequest(`${this._baseUrl}/cards`);
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  updateUserInfo({ name, about }) {
    return this._makeRequest(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  addCard({ name, link }) {
    return this._makeRequest(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  likeCard(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  unlikeCard(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  updateLike(cardId, isLiked) {
    return isLiked ? this.likeCard(cardId) : this.unlikeCard(cardId);
  }

  deleteCard(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  updateAvatar({ avatar }) {
    return this._makeRequest(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }
}

const api = new Api({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
