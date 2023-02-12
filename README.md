# gophish-api.js
A JavaScript library for calling Gophish APIs.

# Install

Install by npm:

```bash
npm i @zzxzzk115/gophish-api
```

Install by yarn

```bash
yarn add @zzxzzk115/gophish-api
```

# Sample Usage

TypeScript:

```typescript
import fetch from "node-fetch";
import { Campaign, Gophish, Group, Page, SMTP, Template, User } from "@zzxzzk115/gophish-api";

// Get the API_KEY and HOST from System Environment Variables.
const API_KEY = process.env["GOPHISH_API_KEY"];
const HOST = process.env["GOPHISH_HOST"];
const RECIPIENT_EMAIL = process.env["RECIPIENT_EMAIL"];

async function test() {
  try {
    const gophish = new Gophish({ api_key: API_KEY, host: HOST, fetch_handler: fetch });
    const now = Date.now();

    // Step 1: Create a new Template
    var template = new Template();
    template.name = "Test Template" + now;
    template.subject = "Hello, gophish-api.js!";
    template.text = "This is a test template created by gophish-api.js!";
    var createdTemplate = await gophish.templates.post(template);
    console.log("Created a new Template:\n", createdTemplate);

    // Step 2: Create a new Sending Profile (SMTP)
    var smtp = new SMTP();
    smtp.name = "Test Sending Profile" + now;
    smtp.from_address = "test@gophish-api.test"; // Sender Email Address
    smtp.host = "postfix:25"; // Or smtp-relay.sendinblue.com:587 or other relay server hosts
    // smtp.username = "xxx";
    // smtp.password = "***";
    smtp.ignore_cert_errors = true;
    var createdSmtp = await gophish.smtp.post(smtp);
    console.log("Created a new SMTP:\n", createdSmtp);

    // Step 3: Create a new User (Recipient) Group
    var group = new Group();
    group.name = "Test Group" + now;
    var user = new User();
    user.email = RECIPIENT_EMAIL // "somebody@example.com";
    group.targets.push(user);
    var createdGroup = await gophish.groups.post(group);
    console.log("Created a new Group:\n", createdGroup);

    // Step 4: Create a new Landing Page
    var page = new Page();
    page.name = "Test Page" + now;
    var createdPage = await gophish.pages.post(page);
    console.log("Created a new Landing Page:\n", createdPage);

    // Step 5: Create a new Campaign
    var campaign = new Campaign();
    campaign.name = "Test Campain" + now;
    campaign.groups.push(createdGroup);
    campaign.smtp = createdSmtp;
    campaign.template = createdTemplate;
    campaign.page = createdPage;
    var createdCampaign = await gophish.campaigns.post(campaign);
    console.log("Created a new Campaign:\n", createdCampaign);

    // Clean up: Delete all the objects created by this code
    await gophish.templates.delete(createdTemplate.id!);
    await gophish.smtp.delete(createdSmtp.id!);
    await gophish.groups.delete(createdGroup.id!);
    await gophish.pages.delete(createdPage.id!);
    await gophish.campaigns.delete(createdCampaign.id!);

    console.log("Passed all tests.");
    process.exit(0);
  }
  catch (e) {
    console.log(e);
    process.exit(-1);
  }
}

test();
```

# License

MIT