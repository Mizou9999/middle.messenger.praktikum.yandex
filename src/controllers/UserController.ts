import API, { UserAPI, User } from "../api/UserAPI";
import store from "../utils/Store";
import Router from "../router/router";
import AuthController from "./AuthController";

class UserController {
  private readonly api: UserAPI;
  constructor() {
    this.api = API;
  }

  async changeAvatar(avatar: FormData) {
    try {
      await this.api.changeUserAvatar(avatar);
      await AuthController.fetchUser();
      console.log("avatar changed", store.getState().user);

      Router.go("/settings");
    } catch (e: any) {
      console.error(e);
    }
  }
  async changeUserData(data: User) {
    try {
      await this.api.changeUserData(data);
      await AuthController.fetchUser();
    } catch (e: any) {
      console.error(e);
    }
  }
}
export default new UserController();
