import fetch from "node-fetch";
import { GophishClient, Gophish } from "./src/index";

GophishClient.fetch_function = fetch;

// Get the API_KEY and HOST from System Environment Variables.
const API_KEY = process.env["GOPHISH_API_KEY"];
const HOST = process.env["GOPHISH_HOST"];

async function test() {
  try {
    const gophish = new Gophish({ api_key: API_KEY, host: HOST });

    /* Campaign API Test */
    // Delete all the Campaigns
    const allCampaigns = await gophish.campaigns.getAll();
    for (const campaign of allCampaigns) {
      let response = await gophish.campaigns.delete(campaign.id!);
      console.log(campaign.id, response.message);
    }

    /* Template API Test */
    // Delete all the Templates
    const allTemplates = await gophish.templates.getAll();
    for (const template of allTemplates) {
      let response = await gophish.templates.delete(template.id!);
      console.log(template.id, response.message);
    }

    /* Group API Test */
    // Delete all the Groups
    const allGroups = await gophish.groups.getAll();
    for (const group of allGroups) {
      let response = await gophish.groups.delete(group.id!);
      console.log(group.id, response.message);
    }

    /* Page API Test */
    // Delete all the Pages
    const allPages = await gophish.pages.getAll();
    for (const page of allPages) {
      let response = await gophish.pages.delete(page.id!);
      console.log(page.id, response.message);
    }

    /* SMTP API Test */
    // Delete all the SMTPs
    const allSMTPs = await gophish.smtp.getAll();
    for (const smtp of allSMTPs) {
      let response = await gophish.smtp.delete(smtp.id!);
      console.log(smtp.id, response.message);
    }

    console.log("Passed all tests.");
    process.exit(0);
  }
  catch (e) {
    console.log(e);
    process.exit(-1);
  }
}

test();