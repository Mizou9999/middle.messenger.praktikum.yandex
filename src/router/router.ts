import Block from "../utils/Block";
import Route from "./route";

class Router {
  static __instance: Router;
  routes: Route[] = [];
  history: History = window.history;
  _currentRoute: Route | null = null;
  _rootQuery?: string;
  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }
  static getInstance() {
    return this.__instance;
  }
  use(pathname: string, blockFactory: () => Block) {
    const route = new Route(pathname, blockFactory, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }
  start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      if (target) {
        this._onRoute(target.location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }
  _onRoute(pathname: string) {
    console.log(`Navigating to ${pathname}`);
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route.render();
  }
  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }
  back() {
    this.history.back();
  }
  forward() {
    this.history.forward();
  }
  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router("#app");
