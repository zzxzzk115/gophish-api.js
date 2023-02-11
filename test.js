const fetch = require("node-fetch");
const { CampaignAPI } = require("./lib/cjs/api/campaigns");
const { GophishClient } = require("./lib/cjs/client");

GophishClient.fetch_function = fetch;

// Get the API_KEY and HOST from System Environment Variables.
const API_KEY = process.env["GOPHISH_API_KEY"];
const HOST = process.env["GOPHISH_HOST"];

async function test() {
  const gophishClient = new GophishClient(API_KEY, HOST);

  /* Campaign API Test */
  const campaignAPI = new CampaignAPI(gophishClient);
  const firstCampaign = await campaignAPI.get(1);
  if (!firstCampaign || firstCampaign.id !== 1) {
    console.log("Campaign API test failed!");
    process.exit(-1);
  }

  console.log("Passed all tests.");
  process.exit(0);
}

test();