import Block from "../../../../utils/Block";
import template from "./Chatlist";
import ChatComponent from "../../../../components/chat/chatCard";

interface IChatListProps {
  [key: string]: unknown;
  // Currently empty, can be expanded in the future if needed
}

class ChatList extends Block {
  constructor(props: IChatListProps) {
    super("div", props);
  }

  render() {
    const chat1 = new ChatComponent({
      img: "https://source.unsplash.com/128x128/?person",
      date: "12:09",
      is_active: false,
      new_msgs: 0,
      user_name: "John",
      last_msg: "Hello there!",
    });
    const chat2 = new ChatComponent({
      img: "https://source.unsplash.com/128x128/?portrait",
      date: " 10:09",
      is_active: true,
      new_msgs: 5,
      user_name: "Alice",
      last_msg: "How are you doing?",
    });
    const chat3 = new ChatComponent({
      img: "https://source.unsplash.com/128x128/?man",
      date: "Пт",
      is_active: false,
      new_msgs: 0,
      user_name: "Bob",
      last_msg: "Lorem ipsum dolor sit amet.",
    });

    this.children = {
      chat1: chat1,
      chat2: chat2,
      chat3: chat3,
    };
    return this.compile(template, this.props, "list-container");
  }
}
export default ChatList;
