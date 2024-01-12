import Block from "../../../utils/Block";
import template from "./ChatContent";
import "./ChatContent.scss";

interface IChatContentProps {
  [key: string]: unknown;
  time: string;
  msg_content: string;
  msg_author?: string;
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
