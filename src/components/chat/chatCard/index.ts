import Block from "../../../utils/Block";
import template from "./Chat";
import "./Chat.scss";

interface IChatProps {
  [key: string]: unknown;
  img: string;
  user_name: string;
  last_msg: string;
  date: string;
  new_msgs?: number;
}

class Chat extends Block {
  constructor(props: IChatProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
export default Chat;
