import { Nullable } from "./types";

export interface IGophishModel { }

export interface IIndexdedGophishModel extends IGophishModel {
  id: Nullable<number>
}

export class Campaign implements IIndexdedGophishModel {
  id: Nullable<number> = null
  name: Nullable<string> = null
  created_date: Nullable<string> = new Date().toISOString()
  launch_date: Nullable<string> = new Date().toISOString()
  send_by_date: Nullable<string> = null
  completed_date: Nullable<string> = null
  template: Nullable<Template> = null
  page: Nullable<Page> = null
  status: Nullable<string> = null
  results: Array<CampaignResult> = []
  groups: Array<Group> = []
  timeline: Array<TimelineEntry> = []
  smtp: Nullable<SMTP> = null
  url: Nullable<string> = null

  static parse(json: any): Campaign {
    const campaign = new Campaign();
    for (const key in json) {
      (<any>campaign)[key] = json[key];
    }
    return campaign;
  }
}

/**
 * Represents a list of campaign summary objects
 */
export class CampainSummaries implements IGophishModel {
  total: Nullable<number>
  campaigns: Array<CampainSummary> = []

  static parse(json: any): CampainSummaries {
    const campaignSummaries = new CampainSummaries();
    campaignSummaries.total = json.total;
    json.campaigns.map((campaign: any) => {
      (<any>campaignSummaries).campaigns.push(CampainSummary.parse(campaign));
    });
    return campaignSummaries;
  }
}

export class CampainSummary implements IIndexdedGophishModel {
  id: Nullable<number>
  name: Nullable<string>
  status: Nullable<string>
  created_date: Nullable<string>
  launch_date: Nullable<string>
  send_by_date: Nullable<string>
  completed_date: Nullable<string>
  stats: Nullable<Stat>

  static parse(json: any): CampainSummary {
    const campaignSummary = new CampainSummary();
    for (const key in json) {
      if (key === "stats") {
        (<any>campaignSummary)[key] = Stat.parse(json[key]);
        continue;
      }
      (<any>campaignSummary)[key] = json[key];
    }
    return campaignSummary;
  }
}

export class Stat implements IGophishModel {
  total: Nullable<number>
  sent: Nullable<number>
  opened: Nullable<number>
  clicked: Nullable<number>
  submitted_data: Nullable<number>
  email_reported: Nullable<number>
  error: Nullable<number>

  static parse(json: any): Stat {
    const stat = new Stat();
    for (const key in json) {
      (<any>stat)[key] = json[key];
    }
    return stat;
  }
}

/**
 * Represents a succinct view of campaign results
 */
export class CampaignResults implements IIndexdedGophishModel {
  id: Nullable<number>
  name: Nullable<string>
  status: Nullable<string>
  results: Array<CampaignResult> = []
  timeline: Array<TimelineEntry> = []
}

export class CampaignResult implements IGophishModel {
  id: Nullable<number>
  status: Nullable<string>
  ip: Nullable<string>
  latitude: Nullable<number>
  longitude: Nullable<number>
  send_date: Nullable<string>
  reported: Nullable<string>
  modified_date: Nullable<string>
  email: Nullable<string>
  first_name: Nullable<string>
  last_name: Nullable<string>
  position: Nullable<string>
}

export class TimelineEntry implements IGophishModel {
  email: Nullable<string>
  time: Nullable<string>
  message: Nullable<string>
  details: Nullable<string>
}

/**
 * User contains the attributes for a member of a group used in Gophish
 */
export class User implements IIndexdedGophishModel {
  id: Nullable<number>
  first_name: Nullable<string>
  last_name: Nullable<string>
  email: Nullable<string>
  position: Nullable<string>
}

/**
 * Groups contain one or more users
 */
export class Group implements IIndexdedGophishModel {
  id: Nullable<number>
  name: Nullable<string>
  modified_date: Nullable<string>
  targets: Array<User> = []

  static parse(json: any): Group {
    const group = new Group();
    for (const key in json) {
      (<any>group)[key] = json[key];
    }
    return group;
  }
}

export class SMTP implements IIndexdedGophishModel {
  id: Nullable<number>
  name: Nullable<string>
  interface_type: string = "SMTP"
  host: Nullable<string>
  username: Nullable<string>
  password: Nullable<string>
  from_address: Nullable<string>
  ignore_cert_errors: boolean = false
  modified_date: Nullable<string>
  headers: Nullable<Map<string, string>>

  static parse(json: any): SMTP {
    const smtp = new SMTP();
    for (const key in json) {
      (<any>smtp)[key] = json[key];
    }
    return smtp;
  }
}

export class Template implements IIndexdedGophishModel {
  id: Nullable<number>
  name: Nullable<string>
  subject: Nullable<string>
  text: Nullable<string>
  html: Nullable<string>
  modified_date: Nullable<string>
  attachments: Nullable<Array<Attachment>>

  static parse(json: any): Template {
    const template = new Template();
    for (const key in json) {
      (<any>template)[key] = json[key];
    }
    return template;
  }
}

export class Page implements IIndexdedGophishModel {
  id: Nullable<number>
  name: Nullable<string>
  html: Nullable<string>
  modified_date: Nullable<string>
  capture_credentials: boolean = false
  capture_passwords: boolean = false
  redirect_url: Nullable<string>

  static parse(json: any): Page {
    const page = new Page();
    for (const key in json) {
      (<any>page)[key] = json[key];
    }
    return page;
  }
}

export class Attachment implements IGophishModel {
  content: Nullable<string>
  type: Nullable<string>
  name: Nullable<string>
}

export class ResponseModel implements IGophishModel {
  message: string | undefined
  success: boolean = false
  data: any

  static parse(json: any): ResponseModel {
    const response = new ResponseModel();
    for (const key in json) {
      (<any>response)[key] = json[key];
    }
    return response;
  }

  toString(): string {
    return `ResponseModel { message: ${this.message}, success: ${this.success}, data: ${this.data}}`;
  }
}