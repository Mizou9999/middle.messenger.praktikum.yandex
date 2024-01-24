import API, { AuthAPI } from "../api/authAPI";
import router from "../router/router";
import store from "../utils/Store";
import ChatsController from "./ChatsController";
import MessagesController from "./MessagesController";
import { SigninData, SignupData } from "../types/types";

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);
      await this.fetchUser();
      await ChatsController.fetchChats();
      router.go("/messenger");
    } catch (e: any) {
      console.error(e);
      if (e.reason && e.reason === "User already in system") {
        console.log("already logged");
        router.go("/messenger");
      }
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);
      await this.fetchUser();
      router.go("/messenger");
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    const user = await this.api.read();
    store.set("user", user);
  }

  async logout() {
    try {
      MessagesController.closeAll();
      await this.api.logout();
      router.go("/");
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
