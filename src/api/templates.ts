import { GophishClient } from "../client";
import { ResponseModel, Template } from "../models";
import { APIEndpoint } from "./api";

export class TemplateAPI extends APIEndpoint {
  /**
   * Creates a new instance of the templates API
   * @param api 
   * @param endpoint 
   */
  constructor(api: GophishClient, endpoint: string = "api/templates/") {
    super(api, endpoint, Template.parse);
  }

  /**
   * Gets the detail for a template by ID
   * @param template_id 
   */
  public async get(template_id: number): Promise<Template> {
    return await super.get(template_id);
  }

  /**
   * Gets all the details for templates
   */
  public async getAll(): Promise<Array<Template>> {
    return await super.get();
  }

  /**
   * Creates a new template
   * @param template 
   */
  public async post(template: Template): Promise<Template> {
    return await super.post(template);
  }

  /**
   * Edits an existing template
   * @param template 
   * @returns 
   */
  public async put(template: Template) {
    return await super.put(template);
  }

  /**
   * Deletes an existing template
   * @param template_id 
   */
  public async delete(template_id: number): Promise<ResponseModel> {
    return await super.delete(template_id);
  }
}