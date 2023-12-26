import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async list(orderBy = 'asc') {
    const contacts = await this.httpClient.get(`/contacts?orderBy=${orderBy}`);
    return contacts.map(ContactMapper.toDomain);
  }

  async getById(id) {
    const contact = await this.httpClient.get(`/contacts/${id}`);
    return ContactMapper.toDomain(contact);
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
