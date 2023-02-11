import { GophishClient } from "../client";
import { Campaign, CampainSummaries, CampainSummary, ResponseModel } from "../models";
import { APIEndpoint } from "./api";

export class CampaignAPI extends APIEndpoint {
  /**
   * Creates a new instance of the campaigns API
   * @param api 
   * @param endpoint 
   */
  constructor(api: GophishClient, endpoint: string = "api/campaigns/") {
    super(api, endpoint, Campaign.parse);
  }

  /**
   * Gets the detail for a campaign by ID
   * @param campaign_id 
   */
  public async get(campaign_id: number): Promise<Campaign> {
    return await super.get(campaign_id);
  }

  /**
   * Gets all the details for campaigns
   */
  public async getAll(): Promise<Array<Campaign>> {
    return await super.get();
  }

  /**
   * Creates a new campaign
   * @param campaign 
   */
  public async post(campaign: Campaign): Promise<Campaign> {
    return await super.post(campaign);
  }

  /**
   * Edits an existing campaign
   * @param campaign 
   * @returns 
   */
  public async put(campaign: Campaign) {
    return await super.put(campaign);
  }

  /**
   * Deletes an existing campaign
   * @param campaign_id 
   */
  public async delete(campaign_id: number): Promise<ResponseModel> {
    return await super.delete(campaign_id);
  }

  /**
   * Complete an existing campaign (Stop processing events)
   * @param campaign_id 
   */
  public async complete(campaign_id: number): Promise<ResponseModel> {
    return await super.get(campaign_id, "complete");
  }

  /**
   * Returns the campaign summary
   * @param campaign_id 
   */
  public async summary(campaign_id: number) {
    let parse_function: any = CampainSummary.parse;
    let single_resource = false;
    return await super.get(campaign_id, "summary", parse_function, single_resource);
  }

  /**
   * Returns the campaign summarys
   */
  public async summarys() {
    let parse_function = CampainSummaries.parse;
    let single_resource = true;
    return await super.get(null, "summary", parse_function, single_resource);
  }
}