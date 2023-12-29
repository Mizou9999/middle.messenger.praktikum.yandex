import Block from "../utils/Block";
import render from "../utils/RenderDOM";

const isEqual = (lhs: string, rhs: string) => {
  return lhs === rhs;
};

class Route {
  _blockFactory: () => Block;
  _pathname: string;
  _block: Block | null;
  _props: Record<string, any>;
  constructor(pathname: string, blockFactory: () => Block, props: Record<string, any>) {
    this._pathname = pathname;
    this._block = null;
    this._props = props;
    this._blockFactory = blockFactory;
  }
  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }
  leave() {
    if (this._block) {
      this._block.hide();
    }
  }
  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }
  render() {
    if (!this._block) {
      this._block = this._blockFactory();
    }
    render(this._props.rootQuery, this._block);
  }
}

export default Route;
