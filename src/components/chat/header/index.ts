import Block from "../../../utils/Block";
import template from "./Header";
import "./Header.scss";
import Button from "../../Button";
import store from "../../../utils/Store";
import ChatsController from "../../../controllers/ChatsController";

interface IChatHeaderProps {
  [key: string]: unknown;
  img: string;
  chat_room_title: string;
}
class Header extends Block {
  constructor(props: IChatHeaderProps) {
    super("div", props);
  }
  // 221344
  handleAddRemoveUser(isAdding: boolean): void {
    const input = document.querySelector(".chat-options__input") as HTMLInputElement;
    const userID = parseInt(input.value.trim());
    if (userID) {
      const chatRoomId = store.getState().selectedChat;
      if (isAdding) {
        ChatsController.addUserToChat(chatRoomId, userID);
      } else {
        ChatsController.deleteChatUsers(chatRoomId, userID);
      }
    }
  }
  render() {
    const addUser = new Button({
      title: "добавить",
      class: "add-user",
      type: "submit",
      events: {
        click: (e) => {
          e.preventDefault();
          this.handleAddRemoveUser(true);
        },
      },
    });
    const deleteUser = new Button({
      title: "удалить",
      class: "delete-user",
      type: "submit",
      events: {
        click: (e) => {
          e.preventDefault();
          this.handleAddRemoveUser(false);
        },
      },
    });
    this.children = {
      addUser,
      deleteUser,
    };
    return this.compile(template, this.props, "chat-header");
  }
}
export default Header;
