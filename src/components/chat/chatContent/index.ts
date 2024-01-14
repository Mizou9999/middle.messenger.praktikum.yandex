import Block from "../../../utils/Block";
import template from "./ChatContent";
import "./ChatContent.scss";
import store from "../../../utils/Store";

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
    const myID = store.getState().user.id;
    console.log(22, this.props);
    if (Array.isArray(this.props.activeChatMessages)) {
      this.props.activeChatMessages = this.props.activeChatMessages.map((message: IChatContentProps) => {
        if (message.user_id === myID) {
          message.isMe = true;
        } else {
          message.isMe = false;
        }
        return message;
      });
    }
    return this.compile(template, this.props, "chatContent");
  }
}
export default ChatContent;
