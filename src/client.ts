import { Nullable } from "./types";

const DEFAULT_URL = "https://localhost:3333";

/**
 * A standard HTTP REST client used by Gophish
 */
export class GophishClient {

  public static fetch_function: any;

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
  _client_kwargs: object | null = null

  constructor({ api_key, host = DEFAULT_URL, ...kwargs }: any) {
    this.api_key = api_key;

    if (host.endsWith('/')) {
      this.host = host;
    } else {
      this.host = host + '/';
    }

    if (kwargs.length) {
      this._client_kwargs = kwargs;
    }
  }

  /**
   * Executes a request to a given endpoint, returning the result
   * @param method A REST Method: 'POST' | 'GET' | 'PUT' | 'DELETE'
   * @param path The request URL path
   * @param kwargs Additional arguments
   */
  execute({ method, path, ...kwargs }: any) {
    let url = this.host + path;

    if (this._client_kwargs) {
      kwargs.push(this._client_kwargs);
    }

    if (!GophishClient.fetch_function) {
      throw new Error(`
      Please set GophishClient.fetch_function as a specific fetch function, such as node-fetch.

      For Example:

      In Node.js:
      const fetch = require("node-fetch");
      GophishClient.fetch_function = fetch;
      `);
    }
    let option: any = {
      method: method,
      headers: {
        "Authorization": `Bearer ${this.api_key}`
      },
      ...kwargs
    };
    return GophishClient.fetch_function(url, option);
  }
}

export class Gophish {

  client: GophishClient

  constructor({ api_key, host, ...kwargs }: any) {
    this.client = new GophishClient({ api_key: api_key, host: host, ...kwargs });
  }
}