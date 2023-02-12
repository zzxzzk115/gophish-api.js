# Gophish-API.js

<div align="center">
    <img src="./docs/media/logo.svg" />
</div>
<h4 align="center">
  A JavaScript/TypeScript library for calling Gophish APIs.
</h4>


<p align="center">
    <a href="https://github.com/zzxzzk115/gophish-api.js/actions" alt="CI">
        <img src="https://img.shields.io/github/actions/workflow/status/zzxzzk115/gophish-api.js/publish.yml?branch=master&label=CI&logo=github" /></a>
    <a href="https://github.com/zzxzzk115/gophish-api.js/issues" alt="GitHub Issues">
        <img src="https://img.shields.io/github/issues/zzxzzk115/gophish-api.js">
    </a>
    <a href="https://github.com/zzxzzk115/gophish-api.js/blob/master/LICENSE" alt="GitHub">
        <img src="https://img.shields.io/github/license/zzxzzk115/gophish-api.js">
    </a>
    <a href="https://www.npmjs.com/package/@zzxzzk115/gophish-api" alt="npm (scoped)">
        <img src="https://img.shields.io/npm/v/@zzxzzk115/gophish-api?logo=npm">
    </a>
</p>

## Motivation

Gophish provides its RESTful APIs and a [python API library](https://github.com/gophish/api-client-python).

But as a programmer, I'm not fond of writing bunch of web request function callings.

Therefore, **Gophish-API.js** borns.

## Features

- Supports importing as an ES6 module.
- Supports importing as a CommonJS module.
- async - await.
- Written by TypeScript.
- Easy to use.

## Installation

### Gophish-API.js

Gophish-API.js is available as an [npm package](https://www.npmjs.com/package/@zzxzzk115/gophish-api).

**npm:**

```bash
npm i @zzxzzk115/gophish-api
```

**yarn:**

```bash
yarn add @zzxzzk115/gophish-api
```

## Loading and configuring the module

### ES Modules (ESM)

```javascript
import { Gophish } from "@zzxzzk115/gophish-api";
```

### CommonJS (CJS)

```javascript
const { Gophish } = require("@zzxzzk115/gophish-api");
```

## Getting started with Gophish-API.js

A TypeScript (ts-node) example:

```typescript
import fetch from "node-fetch";
import { Campaign, Gophish, Group, Page, SMTP, Template, User } from "@zzxzzk115/gophish-api";

// Get the API_KEY,HOST and RECIPIENT_EMAIL from System Environment Variables.
const API_KEY = process.env["GOPHISH_API_KEY"];
const HOST = process.env["GOPHISH_HOST"];
const RECIPIENT_EMAIL = process.env["RECIPIENT_EMAIL"];

// Do NOT forget to set up the fetch handler!!!
Gophish.fetch_handler = fetch;

async function test() {
  try {
    const gophish = new Gophish({ api_key: API_KEY, host: HOST });
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

## License

MIT