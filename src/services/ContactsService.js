import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async list(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  async create(payload) {
    return this.httpClient.post('/contacts', {
      body: payload,
    });
  }
}

export default new ContactsService();
