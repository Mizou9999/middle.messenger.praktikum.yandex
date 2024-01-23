import Block from "../../../utils/Block";
import template from "./Header";
import "./Header.scss";

interface IChatHeaderProps {
  [key: string]: unknown;
  img: string;
  user_name: string;
}
class Header extends Block {
  constructor(props: IChatHeaderProps) {
    super("div", props);
  }
  render() {
    return this.compile(template, this.props, "chat-header");
  }
}
export default Header;
