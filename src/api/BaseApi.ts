import Fetch from "../utils/Fetch.ts";

export default abstract class BaseAPI {

  protected http : Fetch;

  protected constructor(endpoint: string) {
    this.http = new Fetch(endpoint);
  }

  public abstract create?(data: unknown): Promise<unknown>

  public abstract read?(id?: string): Promise<unknown>

  public abstract update?(id: string, data: unknown): Promise<unknown>

  public abstract delete?(id: string): Promise<unknown>
}
