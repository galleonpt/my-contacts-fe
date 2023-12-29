import CategoryMapper from './mappers/CategoryMapper';
import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async list(signal) {
    const categories = await this.httpClient.get('/categories', { signal });
    return categories.map(CategoryMapper.toDomain);
  }
}

export default new CategoriesService();
