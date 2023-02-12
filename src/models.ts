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
    return json as Campaign;
  }
}

/**
 * Represents a list of campaign summary objects
 */
export class CampainSummaries implements IGophishModel {
  total: Nullable<number>
  campaigns: Array<CampainSummary> = []

  static parse(json: any): CampainSummaries {
    return json as CampainSummaries;
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
    return json as CampainSummary;
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
    return json as Stat;
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
    return json as Group;
  }
}

export class Header {
  key: Nullable<string>
  value: Nullable<string>
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
  headers: Array<Header> = []

  static parse(json: any): SMTP {
    return json as SMTP;
  }
}

export class Template implements IIndexdedGophishModel {
  id: Nullable<number>
  name: Nullable<string>
  subject: Nullable<string>
  text: Nullable<string>
  html: Nullable<string>
  modified_date: Nullable<string>
  attachments: Array<Attachment> = []

  static parse(json: any): Template {
    return json as Template;
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
    return json as Page;
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
    return json as ResponseModel;
  }

  toString(): string {
    return `ResponseModel { message: ${this.message}, success: ${this.success}, data: ${this.data}}`;
  }
}