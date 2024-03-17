import sinon, { SinonFakeXMLHttpRequest } from "sinon";
import { expect } from "chai";
import HTTPTransport from "./fetch";

describe("HTTPTransport", () => {
  let xhr: any;
  let instance: HTTPTransport;
  let requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    global.XMLHttpRequest = xhr;
    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    instance = new HTTPTransport("/test");
  });

  afterEach(() => {
    requests = [];
  });

  it("Must send GET request", () => {
    instance.get("/user");

    const [request] = requests;

    expect(request.method).to.be.eq("Get");
  });

  it("Must send POST request", () => {
    instance.post("/user");

    const [request] = requests;

    expect(request.method).to.be.eq("Post");
  });

  it("Must send DELETE request", () => {
    instance.delete("/user", "");

    const [request] = requests;

    expect(request.method).to.be.eq("Delete");
  });

  it("Must send PUT request", () => {
    instance.put("/user", "");

    const [request] = requests;

    expect(request.method).to.be.eq("Put");
  });
});
