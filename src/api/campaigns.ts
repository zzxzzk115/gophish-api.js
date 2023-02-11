import { GophishClient } from "../client";
import { Campaign } from "../models";
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
}