import Block from "../../../utils/Block";
import template from "./Chat";
import "./Chat.scss";
interface IChatMessage {
  content?: string;
  id: string;
  time: string;
}
export interface IChatProps {
  [key: string]: unknown;
  avatar: string;
  created_by: string;
  id: string;
  last_message?: IChatMessage;
  title: string;
  unread_count: number | 0;
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
