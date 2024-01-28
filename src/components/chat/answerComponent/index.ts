import Block from "../../../utils/Block";
import template from "./AnswerComponent";
import "./AnswerComponent.scss";
import button from "../../Button";
import MessagesController from "../../../controllers/MessagesController";
import store, { withStore } from "../../../utils/Store";

interface IAnswerComponentProps {
  [key: string]: unknown;
  class: string;
  inputPlaceholder: string;
  errorMessage?: string;
}
class AnswerComponent extends Block {
  constructor(tagename: string, props: IAnswerComponentProps) {
    super("div", props);
  }
  render() {
    const sendButton = new button({
      class: "button-send",
      type: "button",
      title: "Отправить",
      events: {
        click: () => {
          const message = document.querySelector('input[name="message"]') as HTMLInputElement;
          const messageText = message?.value.trim();
          if (!messageText) {
            console.error("Message cannot be empty");
            this.setProps({ errorMessage: "Message cannot be empty" });
            message.classList.add("error-input");
            return;
          }
          this.setProps({ errorMessage: "" });
          message.classList.remove("error_message");
          const selectedChat = store.getState().selectedChat;
          MessagesController.sendMessage(selectedChat, messageText);
        },
      },
    });
    this.children = {
      sendButton: sendButton,
    };
    return this.compile(template, this.props, "answer-component");
  }
}
export default withStore((state) => ({
  user: state.user,
  selectedChat: state.selectedChat,
  messages: state.messages,
}))(AnswerComponent);
