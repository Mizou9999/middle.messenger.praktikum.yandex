import Block from "../../../../utils/Block";
import template from "./Avatar";
import "./Avatar.scss";
import UserController from "../../../../controllers/UserController";
import AuthController from "../../../../controllers/AuthController";
import store from "../../../../utils/Store";
import BaseUrl from "../../../../api/BaseURL";
interface IAvatarChangeProps {
  avatarUrl?: string;
}

class AvatarChangeComponent extends Block {
  constructor(props: IAvatarChangeProps) {
    super("div", {
      props,
      events: {
        change: async (event: Event) => {
          const inputElement = event.target as HTMLInputElement;
          if (inputElement.files) {
            const file = inputElement.files[0];
            const formData = new FormData();
            formData.append("avatar", file);

            try {
              await UserController.changeAvatar(formData);
              const updatedAvatarUrl = store.getState().user?.avatar;

              this.setProps({ avatarUrl: BaseUrl + "/resources/" + updatedAvatarUrl });
            } catch (error) {
              console.error("Avatar change failed:", error);
            }
          }
        },
      },
    });
  }
  async init() {
    try {
      await AuthController.fetchUser();
      const initialAvatarUrl = store.getState().user?.avatar;
      this.setProps({ avatarUrl: BaseUrl + "/resources/" + initialAvatarUrl });
    } catch (error) {
      console.error("init failed:", error);
    }
  }
  render() {
    const avatarUrl = store.getState().user?.avatar;
    return this.compile(template, { avatarUrl: BaseUrl + "/resources/" + avatarUrl });
  }
}

export default AvatarChangeComponent;
