import Block from "../../utils/Block";
import template from "./Home";
import "./Home.scss";

interface IProfilePageProps {
  name: string;
}

class ProfilePage extends Block {
  constructor(props: IProfilePageProps) {
    super("div", { ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ProfilePage;
