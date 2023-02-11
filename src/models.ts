import { Nullable } from "./types";

export interface IGophishModel {}

export interface IIndexdedGophishModel extends IGophishModel {
  id: Nullable<number>
}

export class Campaign implements IIndexdedGophishModel {
  id: Nullable<number>
  name: Nullable<string>
  created_date: Nullable<string> = new Date().toISOString()
  launch_date: Nullable<string> = new Date().toISOString()
  send_by_date: Nullable<string>
  completed_date: Nullable<string>
  template: Nullable<Template>
  page: Nullable<Page>
  status: Nullable<string>
  results: Nullable<Array<CampaignResult>>
  groups: Nullable<Array<Group>>
  timeline: Nullable<Array<TimelineEntry>>
  smtp: Nullable<SMTP>
  url: Nullable<string>

  static parse(json: any): Campaign {
    const campaign = new Campaign();
    for (const key in json){
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
  campaigns: Nullable<Array<Campaign>>
}

export class CampainSummary implements IIndexdedGophishModel {
  id: Nullable<number>
  name: Nullable<string>
  status: Nullable<string>
  created_date: Nullable<string>
  launch_date: Nullable<string>
  send_by_date: Nullable<string>
  completed_date: Nullable<string>
  stats: Nullable<Array<Stat>>
}

export class Stat implements IGophishModel {
  total: Nullable<number>
  sent: Nullable<number>
  opened: Nullable<number>
  clicked: Nullable<number>
  submitted_data: Nullable<number>
  email_reported: Nullable<number>
  error: Nullable<number>
}

/**
 * Represents a succinct view of campaign results
 */
export class CampaignResults implements IIndexdedGophishModel {
  id: Nullable<number>
  name: Nullable<string>
  status: Nullable<string>
  results: Nullable<Array<CampaignResult>>
  timeline: Nullable<Array<TimelineEntry>>
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
  targets: Nullable<Array<User>>
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
}

export class Template implements IIndexdedGophishModel {
  id: Nullable<number>
  name: Nullable<string>
  subject: Nullable<string>
  text: Nullable<string>
  html: Nullable<string>
  modified_date: Nullable<string>
  attachments: Nullable<Array<Attachment>>
}

export class Page implements IIndexdedGophishModel {
  id: Nullable<number>
  name: Nullable<string>
  html: Nullable<string>
  modified_date: Nullable<string>
  capture_credentials: boolean = false
  capture_passwords: boolean = false
  redirect_url: Nullable<string>
}

export class Attachment implements IGophishModel {
  content: Nullable<string>
  type: Nullable<string>
  name: Nullable<string>
}

export class ResponseModel implements IGophishModel {
  message: Nullable<string>
  success: Nullable<string>
  data: any
}