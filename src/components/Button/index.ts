import Block from "../../utils/Block";
import template from "./Button";

interface IbuttonProps {
  [key: string]: unknown;
  class?: string;
  type?: string;
  title: string;
  events?: Record<string, (e: Event) => void>;
}

class Button extends Block {
  constructor(props: IbuttonProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Button;
