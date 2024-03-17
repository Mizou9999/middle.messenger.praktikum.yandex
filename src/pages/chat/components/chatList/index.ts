import Block from "../../../../utils/Block";
import template from "./Chatlist";
import ChatCard, { IChatProps } from "../../../../components/chat/chatCard";
import store, { withStore } from "../../../../utils/Store";
import "./Chatlist.scss";

interface IChatListProps {
  [key: string]: unknown;
}

class ChatList extends Block {
  constructor(tagname: string, props: IChatListProps) {
    super((tagname = "div"), props);
  }

  render() {
    this.children.chatList = store.getState().chats.map((chat: IChatProps) => {
      const lastMessageContent = chat.last_message ? chat.last_message.content : "";
      return new ChatCard({
        avatar: chat.avatar || "https://source.unsplash.com/128x128/?random",
        created_by: chat.created_by,
        id: chat.id,
        lastMessage: lastMessageContent,
        title: chat.title,
        unread_count: chat.unread_count,
        events: {
          click: () => {
            store.set("selectedChat", chat.id);
          },
        },
      });
    });
    return this.compile(template, this.props, "list-container");
  }
}
export default withStore((state) => ({
  chats: [...(state.chats || [])],
  selectedChat: state.selectedChat,
}))(ChatList);
// test99@gmail.com
// Login: Test99
// Password: Test99Test99Test99
