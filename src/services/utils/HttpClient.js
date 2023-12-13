class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (response.ok) {
      return response.json();
    }

    throw new Error(response.statusText);
  }
}

export default HttpClient;
