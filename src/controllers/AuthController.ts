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
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "reason" in error) {
        console.error(error);
        if (error.reason === "User already in system") {
          console.log("already logged");
          router.go("/messenger");
        }
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);
      await this.fetchUser();
      router.go("/messenger");
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.read();
      store.set("user", user);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async logout() {
    try {
      MessagesController.closeAll();
      await this.api.logout();
      router.go("/");
    } catch (e: unknown) {
      console.error(e);
    }
  }
}

export default new AuthController();
