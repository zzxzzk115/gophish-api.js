import { GophishClient } from "../client";
import { IIndexdedGophishModel } from "../models";
import { Nullable } from "../types";

export class APIEndpoint {
  api: GophishClient
  endpoint: Nullable<string>
  private _parse_function: any

  constructor(api: GophishClient, endpoint: Nullable<string> = null, parse_function: any = null) {
    this.api = api;
    this.endpoint = endpoint;
    this._parse_function = parse_function;
  }

  /**
   * Gets the details for one or more resources by ID
   * @param resource_id The endpoint (URL path) for the resource
   * @param resource_action An action to perform on the resource
   * @param resource_parse_function 
   * @param single_resource 
   * @returns 
   */
  async get(
    resource_id: Nullable<number> = null,
    resource_action: Nullable<string> = null,
    resource_parse_function: any = null,
    single_resource: boolean = false
  ) {
    return await this._request("GET", null,
      resource_id,
      resource_action,
      resource_parse_function,
      single_resource);
  }

  /**
   * Creates a new instance of the resource.
   * @param resource 
   * @returns IIndexdedGophishModel - The resource instance
   */
  async post(
    resource: IIndexdedGophishModel
  ) {
    return await this._request("POST", resource);
  }

  /**
   * Edits an existing resource
   * @param resource IIndexdedGophishModel - The resource instance
   * @returns 
   */
  async put(resource: IIndexdedGophishModel) {
    return await this._request("PUT", { json: resource }, resource.id, null, null, true);
  }

  /**
   * Deletes an existing resource
   * @param resource_id The resource ID to be deleted
   */
  async delete(resource_id: number) {
    return await this._request("DELETE", null, resource_id, null, null, true);
  }

  /**
   * Builds a path to an API resource by joining the individual parts with a slash (/).
   * 
   * This is used instead of urljoin since we're given relative URL parts which need to be chained together.
   * @param parts 
   * @returns The parts joined with a slash
   */
  private _build_url(...parts: any[]): string {
    return parts.map(part => String(part).replace(/\/$/, '')).join('/');
  }

  private async _request(
    method: string,
    body: any = null,
    resource_id: Nullable<number> = null,
    resource_action: Nullable<string> = null,
    resource_parse_function: any = null,
    single_resource: boolean = false
  ) {
    let endpoint = this.endpoint;

    if (!resource_parse_function) {
      resource_parse_function = this._parse_function;
    }

    if (resource_id) {
      endpoint = this._build_url(endpoint, resource_id);
    }

    if (resource_action) {
      endpoint = this._build_url(endpoint, resource_action);
    }

    const response = await this.api.execute(method, endpoint, { json: body });
    if (!response.ok) {
      throw new Error(response.json().toString());
    }

    if (resource_id || single_resource) {
      return resource_parse_function(response.json());
    }

    // return response.json().map(resource => resource_parse_function(resource));
    return response.json();
  }

}