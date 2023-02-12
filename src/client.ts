import { CampaignAPI, GroupAPI, PageAPI, SMTPAPI, TemplateAPI } from "./api/api";

const DEFAULT_URL = "https://localhost:3333";

/**
 * A standard HTTP REST client used by Gophish
 */
export class GophishClient {

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
   * Fetch handler
   */
  fetch_handler: (url: string, options: any) => Promise<any>

  /**
   * Additional arguments
   */
  _client_kwargs: object | null = null

  constructor({ api_key, host = DEFAULT_URL, fetch_handler, ...kwargs }: any) {
    this.api_key = api_key;

    if (host.endsWith('/')) {
      this.host = host;
    } else {
      this.host = host + '/';
    }

    this.fetch_handler = fetch_handler;

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

    if (!this.fetch_handler) {
      throw new Error(`
      Please set up fetch handler, such as node-fetch.

      For Example:

      In Node.js (CommonJS):
      const fetch = require("node-fetch");
      const gophish = new Gophish({api_key: "YOUR API KEY", host: "YOUR HOST", fetch_handler: fetch})

      (ES Module):
      import fetch from "node-fetch";
      const gophish = new Gophish({api_key: "YOUR API KEY", host: "YOUR HOST", fetch_handler: fetch})
      `);
    }
    let options: any = {
      method: method,
      headers: {
        "Authorization": `Bearer ${this.api_key}`
      },
      ...kwargs
    };
    return this.fetch_handler(url, options);
  }
}

export class Gophish {
  client: GophishClient
  campaigns: CampaignAPI
  groups: GroupAPI
  pages: PageAPI
  templates: TemplateAPI
  smtp: SMTPAPI

  constructor({ api_key, host, fetch_handler, ...kwargs }: any) {
    this.client = new GophishClient({ api_key: api_key, host: host, fetch_handler: fetch_handler, ...kwargs });
    this.campaigns = new CampaignAPI(this.client);
    this.groups = new GroupAPI(this.client);
    this.pages = new PageAPI(this.client);
    this.templates = new TemplateAPI(this.client);
    this.smtp = new SMTPAPI(this.client);
  }
}