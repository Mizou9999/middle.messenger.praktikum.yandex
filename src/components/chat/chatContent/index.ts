import Block from "../../../utils/Block";
import template from "./ChatContent";
import "./ChatContent.scss";

interface IChatContentProps {
  [key: string]: unknown;
  msg_start_date: string;
  msg_content: string;
}

class ChatContent extends Block {
  constructor(props: IChatContentProps) {
    super("div", props);
  }
  render() {
    return this.compile(template, this.props, "chatContent");
  }
}
export default ChatContent;
