import { GophishClient } from "../client";
import { Campaign, CampainSummaries, CampainSummary } from "../models";
import { Nullable } from "../types";
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
   * Gets the details for one or more campaigns by ID
   * @param campaign_id 
   */
  public async get(campaign_id: Nullable<number> = null) {
    return await super.get(campaign_id);
  }

  /**
   * Creates a new campaign
   * @param campaign 
   */
  public async post(campaign: Campaign) {
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
  public async delete(campaign_id: number) {
    return await super.delete(campaign_id);
  }

  /**
   * Complete an existing campaign (Stop processing events)
   * @param campaign_id 
   */
  public async complete(campaign_id: number) {
    return await super.get(campaign_id, "complete");
  }

  /**
   * Returns the campaign summary
   * @param campaign_id 
   */
  public async summary(campaign_id: Nullable<number> = null) {
    let parse_function: any = CampainSummary.parse;
    let single_resource = false;

    if (!campaign_id) {
      parse_function = CampainSummaries.parse;
      single_resource = true;
    }

    return await super.get(campaign_id, "summary", parse_function, single_resource);
  }
}