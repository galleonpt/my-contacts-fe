class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    let body = null;

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new Error(body?.error || `${response.status} - ${response.statusText}`);
  }
}

export default HttpClient;
