import Block from "../../../utils/Block";
import template from "./ChatContent";
import "./ChatContent.scss";
type Props = { [key: string]: unknown };
interface ChatContentProps extends Props {
  msg_start_date: string;
  msg_content: string;
}

class ChatContent extends Block {
  constructor(props: ChatContentProps) {
    super("div", props);
  }
  render() {
    return this.compile(template, this.props, "chatContent");
  }
}
export default ChatContent;
