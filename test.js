const fetch = require("node-fetch");
const { CampaignAPI } = require("./lib/cjs/api/campaigns");
const { GophishClient } = require("./lib/cjs/client");
const { Campaign } = require("./lib/cjs/models");

GophishClient.fetch_function = fetch;

// Get the API_KEY and HOST from System Environment Variables.
const API_KEY = process.env["GOPHISH_API_KEY"];
const HOST = process.env["GOPHISH_HOST"];

async function test() {
  try {
    const gophishClient = new GophishClient({api_key: API_KEY, host: HOST});

    /* Campaign API Test */
    const campaignAPI = new CampaignAPI(gophishClient);
    // Delete the first Campaign
    const allCampaigns = await campaignAPI.get();
    await campaignAPI.delete(allCampaigns[0].id);

    console.log("Passed all tests.");
    process.exit(0);
  }
  catch (e) {
    console.log(e);
    process.exit(-1);
  }
}

test();