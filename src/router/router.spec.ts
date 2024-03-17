import { expect } from "chai";
import Router from "./router";
import Block from "../utils/Block";

describe("Router test", () => {
  let TestBlock: typeof Block;

  before(() => {
    class TestComponent extends Block {
      constructor() {
        super("div", {});
      }

      render() {
        return document.createDocumentFragment();
      }
    }
    TestBlock = TestComponent;
  });

  it("should navigate between routes", () => {
    Router.use("/test", () => new TestBlock("div", {}));
    Router.go("/test");
    expect(window.history.length).to.eq(2);
    expect(window.location.pathname).to.eq("/test");
  });

  it("should go back", () => {
    Router.use("/test", () => new TestBlock("div", {}));
    Router.go("/");
    Router.go("/test");
    Router.back();
    expect(window.location.pathname).to.eq("/test");
  });

  it("should go forward", () => {
    Router.use("/test", () => new TestBlock("div", {}));
    Router.go("/");
    Router.go("/test");
    Router.back();
    Router.forward();
    expect(window.location.pathname).to.eq("/test");
  });
});
