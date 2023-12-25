import Block from "../../utils/Block";
import template from "./Button";

type Props = { [key: string]: unknown };

interface buttonProps extends Props {
  class: string;
  type?: string;
  title: string;
  events?: Record<string, (e: SubmitEvent) => void>;
}

class Button extends Block {
  constructor(props: buttonProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Button;
