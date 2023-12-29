import Block from "../../utils/Block";
import template from "./Home";
import "./Home.scss";

interface IHomePageProps {
  name: string;
}

class HomePage extends Block {
  constructor(props: IHomePageProps) {
    super("div", { ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default HomePage;
