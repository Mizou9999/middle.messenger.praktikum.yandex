import HTTPTransport from "../utils/fetch";

export default class BaseAPI {
  protected http: HTTPTransport;
  constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }
  public create?(data: unknown): Promise<unknown>;
  public read?(identifier?: string | number): Promise<unknown>;
  public update?(identifier: string | number, data: unknown): Promise<unknown>;
  public delete?(identifier: string | number): Promise<unknown>;
}
