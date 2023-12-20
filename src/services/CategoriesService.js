import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async list() {
    return this.httpClient.get('/categories');
  }
}

export default new CategoriesService();
