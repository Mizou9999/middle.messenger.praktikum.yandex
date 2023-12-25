import Block from "../../../utils/Block";
import template from "./400";
import "../not_found.scss";

interface ErrorProps {
  title: string;
  class?: string;
}

export default class ErrorPage4 extends Block {
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
