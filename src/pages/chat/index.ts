import Block from "../../utils/Block";
import template from "./Chat";
import "./chat.scss";
import ChatListComponent from "./components/chatList";
import CreateRoom from "./components/createRoom";
import ChatHeaderComponent from "../../components/chat/header";
import ChatContentComponent from "../../components/chat/chatContent";
import AnswerComponent from "../../components/chat/answerComponent";
import Button from "../../components/Button";
import store, { withStore } from "../../utils/Store";

import router from "../../router/router";

interface IChatProps {
  [key: string]: unknown;
  title: string;
  last_message: object;
}

class ChatPage extends Block {
  private _isCreateRoomVisible: boolean;
  constructor(tagname: string, props: IChatProps) {
    super("div", props);
    this._isCreateRoomVisible = false;
  }
  createRoomVisible(visible: boolean) {
    this._isCreateRoomVisible = visible;
    this.setProps({});
  }

  handleCreateRoom() {
    const createRoom = new CreateRoom({
      class: "create-room",
      title: "Создать чат",
      inputPlaceholder: "Название чата",
      onClose: () => {
        this.createRoomVisible(false);
      },
    });
    return createRoom;
  }

  render() {
    const chatList = new ChatListComponent({ props: this.props });

    const profileBtn = new Button({
      title: "Профиль",
      class: "profile",
      type: "submit",
      events: {
        click: () => {
          // go to profile page
          router.go("/settings");
          console.log("click profile");
        },
      },
    });
    const activeChatID = store.getState().selectedChat;
    const activeChat = store.getState().chats.find((chat: IChatProps) => chat.id === activeChatID);
    let chatHeader;
    let chatContentComponent;
    let messages = store.getState().messages || [];
    let activeChatMessages = messages[activeChatID] || [];
    // save current chat id in store
    store.set("selectedChat", activeChatID);
    // set default chatContent and headers ( если пусто)
    chatHeader = new ChatHeaderComponent({ chat_room_title: "Empty Room", img: "https://source.unsplash.com/128x128/?car" });
    chatContentComponent = new ChatContentComponent({
      time: "",
      msg_content: "Select or create a new chat",
      activeChatMessages: [],
    });
    if (activeChat) {
      chatHeader = new ChatHeaderComponent({ chat_room_title: activeChat.title, img: "https://source.unsplash.com/128x128/?car" });
      if (activeChat.last_message) {
        chatContentComponent = new ChatContentComponent({
          time: new Date(activeChat.last_message.time).toLocaleString(),
          msg_content: activeChat.title,
          activeChatMessages: activeChatMessages,
        });
      }
    }

    const answerContent = new AnswerComponent({
      class: "answer-component__upload",
      inputPlaceholder: "Напишите ваше сообщение...",
    });

    const createRoom = this.handleCreateRoom();
    const createButton = new Button({
      title: this._isCreateRoomVisible ? "Скрыть Чат" : "Создать Чат",
      class: "chat-create-button",
      type: "submit",
      events: {
        click: (e) => {
          e.preventDefault();
          this.createRoomVisible(!this._isCreateRoomVisible);
        },
      },
    });
    this._isCreateRoomVisible ? createRoom.show() : createRoom.hide();
    this.children = {
      chatList: chatList,
      chatHeader: chatHeader,
      chatContent: chatContentComponent,
      answerContent: answerContent,
      createButton: createButton,
      createRoom: createRoom,
      profileBtn: profileBtn,
    };

    return this.compile(template, this.props, "page-container");
  }
}

export default withStore((state) => ({
  chats: [...(state.chats || [])],
  selectedChat: state.selectedChat,
}))(ChatPage);
