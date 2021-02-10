export default class Postman {
  constructor(url, prefix) {
    this.apiUrl = `${url}${prefix}`;
  }

  get(apiMethod, data, meta) {
    return this.send(`${this.apiUrl}${apiMethod}${data ? `/${data}` : ''}${meta ? this.parseQueryString(meta) : ''}`, {
      method: 'get',
    });
  }

  post(apiMethod, data) {
    return this.send(`${this.apiUrl}${apiMethod}`, {
      method: 'post',
      body: JSON.stringify(data),
    });
  }

  put(apiMethod, meta) {

  }

  delete(apiMethod) {

  }

  send(url, options) {
    return fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      ...options,
    }).then((response) => response.json());
  }

  parseQueryString(data) {
    let queryString = '?';

    for (const key in data) {
      queryString = `${queryString}${key}=${data[key]}&`;
    }

    return queryString.slice(0, -1);
  }
}
