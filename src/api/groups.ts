import { GophishClient } from "../client";
import { ResponseModel, Group } from "../models";
import { APIEndpoint } from "./api";

export class GroupAPI extends APIEndpoint {
  /**
   * Creates a new instance of the groups API
   * @param api 
   * @param endpoint 
   */
  constructor(api: GophishClient, endpoint: string = "api/groups/") {
    super(api, endpoint, Group.parse);
  }

  /**
   * Gets the detail for a group by ID
   * @param group_id 
   */
  public async get(group_id: number): Promise<Group> {
    return await super.get(group_id);
  }

  /**
   * Gets all the details for groups
   */
  public async getAll(): Promise<Array<Group>> {
    return await super.get();
  }

  /**
   * Creates a new group
   * @param group 
   */
  public async post(group: Group): Promise<Group> {
    return await super.post(group);
  }

  /**
   * Edits an existing group
   * @param group 
   * @returns 
   */
  public async put(group: Group) {
    return await super.put(group);
  }

  /**
   * Deletes an existing group
   * @param group_id 
   */
  public async delete(group_id: number): Promise<ResponseModel> {
    return await super.delete(group_id);
  }
}