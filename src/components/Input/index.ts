import Block from "../../utils/Block";
import template from "./Input";

type Props = { [key: string]: unknown };

interface inputProps extends Props {
  label: string;
  type?: string;
  name: string;
  id?: string;
  class?: string;
  placeholder: string;
  events: Record<string, (e: InputEvent) => void>;
}

class Input extends Block {
  constructor(props: inputProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Input;
