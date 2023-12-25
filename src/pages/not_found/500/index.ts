import Block from "../../../utils/Block";
import template from "./500";
import "../not_found.scss";

interface ErrorProps {
  title: string;
  class?: string;
}

export default class ErrorPage5 extends Block {
  constructor(props: ErrorProps) {
    super("div", {
      ...props,
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          console.log(event, this);
        },
      },
    });
  }
  render() {
    return this.compile(template, this.props, "page-container");
  }
}
