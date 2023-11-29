class ContactsService {
  async list(orderBy = 'asc') {
    const response = await fetch(`http://localhost:3333/contacts?orderBy=${orderBy}`);
    return response.json();
  }
}

export default new ContactsService();
