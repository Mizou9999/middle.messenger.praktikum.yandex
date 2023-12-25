import Block from "../../utils/Block";
import template from "./Home";
import "./Home.scss";

interface ProfilePageProps {
  name: string;
}

class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super("div", { ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ProfilePage;
