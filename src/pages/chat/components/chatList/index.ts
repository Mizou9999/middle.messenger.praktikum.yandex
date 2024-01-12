import Block from "../../../../utils/Block";
import template from "./Chatlist";
import ChatComponent, { IChatProps } from "../../../../components/chat/chatCard";
import store from "../../../../utils/Store";

interface IChatListProps {
  [key: string]: unknown;
}

class ChatList extends Block {
  constructor(props: IChatListProps) {
    super("div", props);
  }

  render() {
    const chatList = store.getState().chats;
    this.children.chatList = chatList.map((chat: IChatProps) => {
      return new ChatComponent({
        avatar: chat.avatar,
        created_by: chat.created_by,
        id: chat.id,
        last_message: chat.last_message,
        title: chat.title,
        unread_count: chat.unread_count,
      });
    });
    return this.compile(template, this.props, "list-container");
  }
}
export default ChatList;
// test99@gmail.com
// Login: Test99
// Password: Test99Test99
