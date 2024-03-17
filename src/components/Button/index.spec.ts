import { expect } from "chai";
import Button from "./index";

describe("Button component", () => {
  it("renders a div containing a button element with the provided props", () => {
    const props = {
      class: "custom-class",
      type: "submit",
      title: "Click me",
    };

    const button = new Button(props);
    const buttonDiv = button.getContent() as HTMLDivElement;

    expect(buttonDiv.innerHTML).to.include("<button");
    expect(buttonDiv.innerHTML).to.include(`class="button ${props.class}"`);
    expect(buttonDiv.innerHTML).to.include(`type="${props.type}"`);
    expect(buttonDiv.innerHTML).to.include(props.title);
  });
});
