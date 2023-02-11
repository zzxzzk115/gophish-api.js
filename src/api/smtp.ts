import { GophishClient } from "../client";
import { ResponseModel, SMTP } from "../models";
import { APIEndpoint } from "./api";

export class SMTPAPI extends APIEndpoint {
  /**
   * Creates a new instance of the smtps API
   * @param api 
   * @param endpoint 
   */
  constructor(api: GophishClient, endpoint: string = "api/smtp/") {
    super(api, endpoint, SMTP.parse);
  }

  /**
   * Gets the detail for a smtp by ID
   * @param smtp_id 
   */
  public async get(smtp_id: number): Promise<SMTP> {
    return await super.get(smtp_id);
  }

  /**
   * Gets all the details for smtps
   */
  public async getAll(): Promise<Array<SMTP>> {
    return await super.get();
  }

  /**
   * Creates a new smtp
   * @param smtp 
   */
  public async post(smtp: SMTP): Promise<SMTP> {
    return await super.post(smtp);
  }

  /**
   * Edits an existing smtp
   * @param smtp 
   * @returns 
   */
  public async put(smtp: SMTP) {
    return await super.put(smtp);
  }

  /**
   * Deletes an existing smtp
   * @param smtp_id 
   */
  public async delete(smtp_id: number): Promise<ResponseModel> {
    return await super.delete(smtp_id);
  }
}