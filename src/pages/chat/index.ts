import Block from "../../utils/Block";
import template from "./Chat";
import "./chat.scss";
import ChatListComponent from "./components/chatList";
import CreateRoom from "./components/createRoom";
import ChatHeaderComponent from "../../components/chat/header";
import ChatContentComponent from "../../components/chat/chatContent";
import AnswerComponent from "../../components/chat/answerComponent";
import Button from "../../components/Button";

interface IChatProps {
  [key: string]: unknown;
  title: string;
}

class ChatPage extends Block {
  private _createRoomVisible: boolean;
  constructor(props: IChatProps) {
    super("div", props);
    this._createRoomVisible = false;
  }
  createRoomVisible(visible: boolean) {
    this._createRoomVisible = visible;
    this.setProps({});
  }

  render() {
    const chatList = new ChatListComponent({ props: this.props });
    const chatHeader = new ChatHeaderComponent({ user_name: "Pavel", img: "https://source.unsplash.com/128x128/?car" });
    const chatContent1 = new ChatContentComponent({
      msg_start_date: "19 июня",
      msg_content: "Привет!!! Смотри, тут всплыл интересный кусок лунной космической истории, а я уже устал искать. Ну, пока что, спасибо, пожалуйста!, я уже устал искать. Ну, пока что, спасибо, пожалуйста!",
    });
    const chatContent2 = new ChatContentComponent({
      msg_start_date: "22 июня",
      msg_content: "Вот это кусок лунной космической истории. Очень круто! Ну, пока что, спасибо, пожалуйста!, если ты заинтересовался моим хобби, то тогда можешь посмотреть мою страничку в инстаграме - @meow_>cat ",
    });
    const answerContent = new AnswerComponent({
      class: "answer-component__upload",
      inputPlaceholder: "Напишите ваше сообщение...",
    });
    const createRoom = new CreateRoom({ class: "create-room", title: "Создать чат", inputPlaceholder: "Название чата" });

    const createButton = new Button({
      title: this._createRoomVisible ? "Скрыть Чат" : "Создать Чат",
      class: "chat-create-button",
      type: "submit",
      events: {
        click: (e) => {
          e.preventDefault();
          this.createRoomVisible(!this._createRoomVisible);
        },
      },
    });
    this._createRoomVisible ? createRoom.show() : createRoom.hide();
    this.children = {
      chatList: chatList,
      chatHeader: chatHeader,
      chatContent1: chatContent1,
      chatContent2: chatContent2,
      answerContent: answerContent,
      createButton: createButton,
      createRoom: createRoom,
    };

    return this.compile(template, this.props, "page-container");
  }
}

export default ChatPage;
