import { expect } from "chai";
import Sinon from "sinon";
import Block from "./Block";

describe("Block test", () => {
  let TestBlock: typeof Block;

  before(() => {
    class TestComponent extends Block {
      constructor(tagname: string, props: { text: string }) {
        super(tagname, props);
      }
      render() {
        const fragment = document.createDocumentFragment();
        const div = document.createElement("div");
        const p = document.createElement("p");
        p.id = "test-text";
        p.innerHTML = String(this.props.text);
        div.appendChild(p);
        fragment.appendChild(div);
        return fragment;
      }
    }
    TestBlock = TestComponent;
  });

  it("creates a component instance using the constructor", () => {
    const text = "Hello";
    const block = new TestBlock("div", { text });
    const spanText = block.getContent()?.querySelector("#test-text")?.innerHTML;
    expect(spanText).to.be.equal(text);
  });

  it("changes its state", () => {
    const text = "new value";
    const block = new TestBlock("div", { text: "Hello" });
    block.setProps({ text });
    const spanText = block.getContent()?.querySelector("#test-text")?.innerHTML;
    expect(spanText).to.be.equal(text);
  });

  it("should set events on the element", () => {
    const handlerStub = Sinon.stub();
    const block = new TestBlock("div", {
      events: {
        click: handlerStub,
      },
      text: "Click Me",
    });
    const event = new MouseEvent("click");
    block.getContent()?.dispatchEvent(event);
    expect(handlerStub.calledOnce).to.be.true;
  });
});
