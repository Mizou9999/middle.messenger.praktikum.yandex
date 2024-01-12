import Block from "../../../../utils/Block";
import template from "./CreateRoom";
import "./CreateRoom.scss";
import Button from "../../../../components/Button";
import ChatsController from "../../../../controllers/ChatsController";
interface CreateRoomProps {
  [key: string]: unknown;
  class?: string;
}
class CreateRoom extends Block {
  constructor(props: CreateRoomProps) {
    super("div", props);
  }
  render() {
    const createButton = new Button({
      title: "Создать ",
      class: "chat-create-button",
      type: "submit",
      events: {
        click: (e) => {
          e.preventDefault();
          const input = document.querySelector('input[name="createRoomInput"]') as HTMLInputElement;
          if (!input?.value) {
            console.error("Input cannot be empty");
            return;
          }
          ChatsController.create(input.value);
        },
      },
    });
    this.children = {
      createButton,
    };
    return this.compile(template, this.props);
  }
}
export default CreateRoom;
