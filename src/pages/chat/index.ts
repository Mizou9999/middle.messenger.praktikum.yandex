import Block from "../../utils/Block";
import template from "./Chat";
import "./chat.scss";
import ChatListComponent from "./components/chatList";
import ChatHeaderComponent from "../../components/chat/header";
import ChatContentComponent from "../../components/chat/chatContent";
import AnswerComponent from "../../components/chat/answerComponent";

interface IChatProps {
  [key: string]: unknown;
  title: string;
}

class ChatPage extends Block {
  constructor(props: IChatProps) {
    super("div", props);
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
    this.children = {
      chatList: chatList,
      chatHeader: chatHeader,
      chatContent1: chatContent1,
      chatContent2: chatContent2,
      answerContent: answerContent,
    };

    return this.compile(template, this.props, "page-container");
  }
}

export default ChatPage;
