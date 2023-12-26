import Block from "../../utils/Block";
import template from "./Input";

interface IInputProps {
  [key: string]: unknown;
  label: string;
  type?: string;
  name: string;
  id?: string;
  class?: string;
  placeholder: string;
  events: Record<string, (e: InputEvent) => void>;
  errorMessage?: string;
}

class Input extends Block {
  constructor(props: IInputProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Input;
