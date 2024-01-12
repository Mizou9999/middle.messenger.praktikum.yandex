import { isEqual, set } from "./helpers";
import EventBus from "./EventBus";
import Block from "./Block";

enum StoreEvents {
  Updated = "updated",
}
interface State {
  selectedChat?: number;
  chats?: any[];
}
export class Store extends EventBus {
  private state: any = {};
  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);
    this.emit(StoreEvents.Updated, this.getState());
  }
  public getState() {
    return this.state;
  }
}
const store = new Store();

export function withStore(mapStateToProps: (state: State) => any) {
  return function wrap(Component: typeof Block) {
    return class WithStore extends Component {
      constructor(props: any) {
        let previousState = mapStateToProps(store.getState());
        super("", { ...props, ...mapStateToProps(store.getState()) });
        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());
          if (isEqual(stateProps, previousState)) {
            return;
          }
          previousState = stateProps;
          this.setProps({ ...stateProps });
        });
      }
    };
  };
}
export default store;
