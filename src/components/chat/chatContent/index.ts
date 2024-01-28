import Block from "../../../utils/Block";
import template from "./ChatContent";
import "./ChatContent.scss";
import store, { withStore } from "../../../utils/Store";

interface IChatContentProps {
  [key: string]: unknown;
  time: string;
  msg_content: string;
  msg_author?: string;
}

class ChatContent extends Block {
  constructor(tagname: string, props: IChatContentProps) {
    super("div", props);
  }
  private getStateData() {
    const myID = store.getState().user.id;
    const activeChatID = store.getState().selectedChat;
    const messages = store.getState().messages || [];
    const activeChatMessages = Array.isArray(messages[activeChatID]) ? messages[activeChatID] : [];

    return { myID, activeChatID, activeChatMessages };
  }
  componentDidMount() {
    store.on("updated", () => {
      const { activeChatMessages } = this.getStateData();
      this.setProps({ activeChatMessages: [...activeChatMessages] });
    });
  }
  render() {
    const { myID, activeChatMessages } = this.getStateData();
    this.props.activeChatMessages = activeChatMessages.map((message: IChatContentProps) => {
      message.isMe = message.user_id === myID;
      return message;
    });

    return this.compile(template, this.props, "chatContent");
  }
}
export default withStore((state) => ({
  user: state.user,
  selectedChat: state.selectedChat,
  messages: state.messages,
}))(ChatContent);
