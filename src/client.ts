const DEFAULT_URL = "https://localhost:3333";

/**
 * A standard HTTP REST client used by Gophish
 */
class GophishClient {

  /**
   * Gophish API_KEY
   */
  api_key: string

  /**
   * The host URL
   * 
   * Example value:
   * 
   * `https://localhost:3333`
   */
  host: string

  /**
   * Additional arguments
   */
  _client_kwargs: any[]

  constructor(api_key: string, host: string = DEFAULT_URL, ...kwargs) {
    this.api_key = api_key;

    if (host.endsWith('/')) {
      this.host = host;
    } else {
      this.host = host + '/';
    }

    this._client_kwargs = kwargs;
  }

  /**
   * Executes a request to a given endpoint, returning the result
   * @param method 
   * @param path 
   * @param kwargs 
   */
  async execute(method: string, path: string, ...kwargs) {
    let url = this.host + path;

    kwargs.push(this._client_kwargs);

    return await fetch(url, {
      method: method,
      headers: {
        "Authorization": `Bearer ${this.api_key}`
      },
      ...kwargs
    });
  }
}

class Gophish {

  client: GophishClient

  constructor(api_key: string, host: string = DEFAULT_URL, ...kwargs) {
    this.client = new GophishClient(api_key, host, ...kwargs);
  }
}