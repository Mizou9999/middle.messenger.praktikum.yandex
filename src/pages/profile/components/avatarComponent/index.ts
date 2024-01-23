import Block from "../../../../utils/Block";
import template from "./Avatar";
import "./Avatar.scss";
import UserController from "../../../../controllers/UserController";
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
        change: (event: Event) => {
          const inputElement = event.target as HTMLInputElement;
          if (inputElement.files) {
            const file = inputElement.files[0];
            const formData = new FormData();
            formData.append("avatar", file);
            UserController.changeAvatar(formData);
            this.setProps({ avatarUrl: BaseUrl + "/resources/" + store.getState().user?.avatar });
          }
        },
      },
    });
  }

  render() {
    const avatarUrl = store.getState().user?.avatar;
    return this.compile(template, { avatarUrl: BaseUrl + "/resources/" + avatarUrl });
  }
}

export default AvatarChangeComponent;
