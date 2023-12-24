import APIError from '../../errors/ApiError';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(endpoint, options) {
    return this.makeRequest(endpoint, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post(endpoint, options) {
    return this.makeRequest(endpoint, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put(endpoint, options) {
    return this.makeRequest(endpoint, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  async makeRequest(endpoint, options) {
    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        headers.append(key, value);
      });
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: options.method,
      headers,
      body: JSON.stringify(options.body),
    });

    let responseBody = null;

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
