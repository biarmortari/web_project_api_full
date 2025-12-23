class AuthApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  register = (email, password) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  };

  authorize = (email, password) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  };

  checkToken = (token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then(this._checkResponse);
  };
}

const authApi = new AuthApi({
  baseUrl: "https://se-register-api.en.tripleten-services.com/v1",
  headers: { "Content-Type": "application/json" },
});

export default authApi;
