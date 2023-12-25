import Block from "../../../utils/Block";
import template from "./Header";
import "./Header.scss";

type Props = { [key: string]: unknown };
interface ChatHeaderProps extends Props {
  img: string;
  user_name: string;
}
class Header extends Block {
  constructor(props: ChatHeaderProps) {
    super("div", props);
  }
  render() {
    return this.compile(template, this.props, "chat-header");
  }
}
export default Header;
