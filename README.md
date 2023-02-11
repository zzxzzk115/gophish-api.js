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
import { GophishClient, Gophish } from "@zzxzzk115/gophish-api";

GophishClient.fetch_function = fetch;
const gophish = new Gophish({ api_key: "YOUR GOPHISH'S API_KEY", host: "YOUR GOPHISH'S HOST" });

// Delete all the Campaigns
const allCampaigns = await gophish.campaigns.getAll();
for (const campaign of allCampaigns) {
  let response = await gophish.campaigns.delete(campaign.id!);
  console.log(campaign.id, response.message);
}
```