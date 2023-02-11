const fetch = require("node-fetch");
const { CampaignAPI } = require("./lib/cjs/api/campaigns");
const { GophishClient } = require("./lib/cjs/client");

GophishClient.fetch_function = fetch;

// Get the API_KEY and HOST from System Environment Variables.
const API_KEY = process.env["GOPHISH_API_KEY"];
const HOST = process.env["GOPHISH_HOST"];

async function test() {
  const gophishClient = new GophishClient(API_KEY, HOST);
  const campaignAPI = new CampaignAPI(gophishClient);
  const firstCampaign = await campaignAPI.get(1);
  console.log(firstCampaign);
}

test();