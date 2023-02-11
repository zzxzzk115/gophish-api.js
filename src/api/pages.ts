import { GophishClient } from "../client";
import { ResponseModel, Page } from "../models";
import { APIEndpoint } from "./api";

export class PageAPI extends APIEndpoint {
  /**
   * Creates a new instance of the pages API
   * @param api 
   * @param endpoint 
   */
  constructor(api: GophishClient, endpoint: string = "api/pages/") {
    super(api, endpoint, Page.parse);
  }

  /**
   * Gets the detail for a page by ID
   * @param page_id 
   */
  public async get(page_id: number): Promise<Page> {
    return await super.get(page_id);
  }

  /**
   * Gets all the details for pages
   */
  public async getAll(): Promise<Array<Page>> {
    return await super.get();
  }

  /**
   * Creates a new page
   * @param page 
   */
  public async post(page: Page): Promise<Page> {
    return await super.post(page);
  }

  /**
   * Edits an existing page
   * @param page 
   * @returns 
   */
  public async put(page: Page) {
    return await super.put(page);
  }

  /**
   * Deletes an existing page
   * @param page_id 
   */
  public async delete(page_id: number): Promise<ResponseModel> {
    return await super.delete(page_id);
  }
}