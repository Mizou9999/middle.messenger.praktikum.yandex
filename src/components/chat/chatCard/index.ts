import Block from "../../../utils/Block";
import template from "./Chat";
import "./Chat.scss";

class Chat extends Block {
  constructor(props: any) {
    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
export default Chat;
