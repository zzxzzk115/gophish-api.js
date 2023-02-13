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

    if (kwargs.length > 0) {
      this._client_kwargs = kwargs;
    }
  }

  /**
   * Executes a request to a given endpoint, returning the result
   * @param method A REST Method: 'POST' | 'GET' | 'PUT' | 'DELETE'
   * @param path The request URL path
   * @param body The request body
   * @param kwargs Additional arguments
   */
  execute({ method, path, body, ...kwargs }: any) {
    let url = this.host + path;

    if (this._client_kwargs) {
      kwargs.push(this._client_kwargs);
    }

    if (!Gophish.fetch_handler) {
      throw new Error(`
      Please set up fetch handler, such as node-fetch.

      For Example:

      In Node.js (CommonJS):
      const fetch = require("node-fetch");
      const { Gophish } = require("@zzxzzk115/gophish-api");
      Gophish.fetch_handler = fetch;
      const gophish = new Gophish({api_key: "YOUR API KEY", host: "YOUR HOST"})

      (ES Module):
      import fetch from "node-fetch";
      import { Gophish } from "@zzxzzk115/gophish-api";
      Gophish.fetch_handler = fetch;
      const gophish = new Gophish({api_key: "YOUR API KEY", host: "YOUR HOST"})
      `);
    }

    var bodyOption;
    if (body) {
      bodyOption = Gophish.body_packer(body);
    }

    let options: any = {
      method: method,
      headers: {
        "Authorization": `Bearer ${this.api_key}`
      },
      body: bodyOption,
      ...kwargs
    };
    return Gophish.fetch_handler(url, options);
  }
}

export class Gophish {
  client: GophishClient
  campaigns: CampaignAPI
  groups: GroupAPI
  pages: PageAPI
  templates: TemplateAPI
  smtp: SMTPAPI

  /**
   * Fetch handler
   */
  static fetch_handler: (url: string, options: any) => any

  /**
   * Body packer
   */
  static body_packer: (body: any) => any = JSON.stringify;

  /**
   * Response handler
   * @param response fetch response
   * @returns json
   */
  static response_handler: (response: any) => any = (response: any) => {
    if (response.ok !== undefined && response.statusText !== undefined && !response.ok) {
      console.error(response.statusText);
    }
    
    if (response.json !== undefined) { // normal fetch and node-fetch
      return response.json().then((data: any) => data);
    } else if (response.data !== undefined) { // tauri fetch
      return response.data;
    }

    return response;
  }

  constructor({ api_key, host, ...kwargs }: any) {
    this.client = new GophishClient({ api_key: api_key, host: host, ...kwargs });
    this.campaigns = new CampaignAPI(this.client);
    this.groups = new GroupAPI(this.client);
    this.pages = new PageAPI(this.client);
    this.templates = new TemplateAPI(this.client);
    this.smtp = new SMTPAPI(this.client);
  }
}