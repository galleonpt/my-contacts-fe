import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  list(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  getById(id) {
    return this.httpClient.get(`/contacts/${id}`);
  }

  create(contact) {
    const payload = ContactMapper.toPersistence(contact);
    return this.httpClient.post('/contacts', {
      body: payload,
    });
  }

  update(id, contact) {
    const payload = ContactMapper.toPersistence(contact);
    return this.httpClient.put(`/contacts/${id}`, {
      body: payload,
    });
  }

  delete(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
