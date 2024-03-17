import { expect } from "chai";
import Input from "./index";

describe("input component", () => {
  it("renders a div containing an input element with the provided props", () => {
    const props = {
      class: "custom-class",
      type: "text",
      name: "inputName",
      value: "inputValue",
      placeholder: "inputPlaceholder",
      label: "inputLable",
      events: {
        focusout: () => {},
      },
    };

    const input = new Input(props);
    const inputDiv = input.getContent() as HTMLDivElement;

    expect(inputDiv.innerHTML).to.include("<label");
    expect(inputDiv.innerHTML).to.include("<input");
    expect(inputDiv.innerHTML).to.include("<span");

    expect(inputDiv.querySelector("label")).to.have.property("textContent", props.label);

    expect(inputDiv.querySelector("input")).to.have.property("value", props.value);
    expect(inputDiv.querySelector("input")).to.have.property("type", props.type);
    expect(inputDiv.querySelector("input")).to.have.property("name", props.name);
    expect(inputDiv.querySelector("input")).to.have.property("placeholder", props.placeholder);
  });
});
