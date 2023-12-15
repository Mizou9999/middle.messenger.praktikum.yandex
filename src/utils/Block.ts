import EventBus from "./EventBus";
import Handlebars from "handlebars";

interface BlockProps {
  [key: string]: any;
  [key: symbol]: any;
}

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: BlockProps } = { tagName: "", props: {} };
  private eventBus: () => EventBus;
  protected props: BlockProps;

  constructor(tagName: string = "div", props: BlockProps = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  public init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected componentDidMount() {
    console.log("mounted to the DOM");
  }

  private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    return true;
  }

  public setProps = (nextProps: BlockProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public get element() {
    return this._element;
  }

  private _render() {
    const content = this.render();

    if (this._element) {
      if (typeof content === "string") {
        this._element.textContent = content;
      } else {
        this._element.textContent = "";
        this._element.appendChild(content);
      }
    }
  }

  protected render(): HTMLElement {
    throw new Error("The render method must be implemented in the derived class.");
  }

  public getContent() {
    return this.element;
  }

  private _makePropsProxy(props: BlockProps) {
    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        target[prop] = value;

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error("Access denied");
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  public show() {
    const content = this.getContent();
    if (content) {
      content.style.display = "block";
    }
  }

  public hide() {
    const content = this.getContent();
    if (content) {
      content.style.display = "none";
    }
  }
}

export default Block;
