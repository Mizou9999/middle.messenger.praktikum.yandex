import Block from "../../utils/Block";
import template from "./Profile";
import "./settings.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Avatar from "./components/avatarComponent";
import { validateLogin, validateEmail, validateName, validatePhone } from "../../utils/validationutils";
import store from "../../utils/Store";
import AuthController from "../../controllers/AuthController";
import UserController from "../../controllers/UserController";
import router from "../../router/router";

interface IProfilePageProps {
  name: string;
  class?: string;
}
interface IChatListProps {
  [key: string]: unknown;
}
class ProfilePage extends Block {
  state: IChatListProps;
  constructor(props: IProfilePageProps) {
    super("div", {
      ...props,
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          let isFormValid = true;
          const inputs = document.querySelectorAll("input[name]") as NodeListOf<HTMLInputElement>;
          inputs.forEach((input) => {
            const fieldName = input.name;
            const value = input.value;
            if (!this.validateField(fieldName, value, input)) {
              isFormValid = false;
            }
          });

          if (isFormValid) {
            UserController.changeUserData(this.state as any);
          } else {
            console.log("Error login", this.state);
          }
        },
      },
    });
    this.state = {
      email: "",
      login: "",
      first_name: "",
      second_name: "",
      phone: "",
    };
  }
  validateField(fieldName: string, value: string, inputElement: HTMLInputElement): boolean {
    if (fieldName === "email") {
      const isValid = validateEmail(value);
      if (!isValid) {
        console.error("Invalid email");
        this.children.inputEmail?.setProps({
          errorMessage: "Invalid email",
          class: "error",
        });
        inputElement.classList.add("error");
        return false;
      }
    } else if (fieldName === "login") {
      const isValid = validateLogin(value);
      if (!isValid) {
        this.children.inputLogin?.setProps({
          errorMessage: "Invalid Login",
          class: "error",
        });
        console.error("Invalid login");
        inputElement.classList.add("error");
        return false;
      }
    } else if (fieldName === "first_name") {
      const isValid = validateName(value);
      if (!isValid) {
        console.error("Invalid name");
        this.children.inputFirstName?.setProps({
          errorMessage: "Invalid name",
          class: "error",
        });
        inputElement.classList.add("error");
        return false;
      }
    } else if (fieldName === "second_name") {
      const isValid = validateName(value);
      if (!isValid) {
        this.children.inputSecondName?.setProps({
          errorMessage: "Invalid second name",
          class: "error",
        });
        console.error("Invalid second name");
        inputElement.classList.add("error");
        return false;
      }
    } else if (fieldName === "phone") {
      const isValid = validatePhone(value);
      if (!isValid) {
        console.error("Invalid phone");
        this.children.inputPhone?.setProps({
          errorMessage: "Invalid phone",
          class: "error",
        });
        inputElement.classList.add("error");
        return false;
      }
    }
    inputElement.classList.remove("error");
    return true;
  }
  componentDidMount() {
    let userData;
    if (store.getState().user) {
      userData = store.getState().user;
    } else {
      AuthController.fetchUser();
      userData = store.getState().user;
    }

    if (userData) {
      this.children.inputEmail.setProps({ value: userData.email });
      this.children.inputLogin.setProps({ value: userData.login });
      this.children.inputFirstName.setProps({ value: userData.first_name });
      this.children.inputSecondName.setProps({ value: userData.second_name });
      this.children.inputPhone.setProps({ value: userData.phone });
      this.state = userData;
    }
  }
  handleFocusOut = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const fieldName = target.name;
    const value = target.value;
    this.validateField(fieldName, value, target);
    this.state[fieldName] = value;
  };
  handleLogout() {
    AuthController.logout();
  }
  render() {
    console.log(this.props);

    const avatarComponent = new Avatar({
      avatarUrl: store.getState().user?.avatar,
    });
    const submitButton = new Button({
      class: "button-submit",
      type: "submit",
      title: "Изменить данные",
    });
    const inputEmail = new Input({
      name: "email",
      type: "email",
      events: {
        focusout: (event) => {
          this.handleFocusOut(event);
        },
      },
      placeholder: "pochta@yandex.ru",
      label: "Почта",
    });
    const inputLogin = new Input({
      name: "login",
      type: "text",
      events: {
        focusout: (event) => {
          this.handleFocusOut(event);
        },
      },
      placeholder: "ivanivanov",
      label: "Логин",
    });
    const inputFirstName = new Input({
      name: "first_name",
      type: "text",
      events: {
        focusout: (event) => {
          this.handleFocusOut(event);
        },
      },
      placeholder: "Иван",
      label: "Имя",
    });
    const inputSecondName = new Input({
      name: "second_name",
      type: "text",
      events: {
        focusout: (event) => {
          this.handleFocusOut(event);
        },
      },
      placeholder: "Иванов",
      label: "Фамилия",
    });
    const inputPhone = new Input({
      name: "phone",
      type: "text",
      events: {
        focusout: (event) => {
          this.handleFocusOut(event);
        },
      },
      placeholder: "+7 (909) 967 30 30",
      label: "Телефон",
    });
    const logout = new Button({
      title: "Выход",
      class: "logout",
      type: "submit",
      events: {
        click: () => {
          this.handleLogout();
        },
      },
    });
    const backBtn = new Button({
      title: "Назад",
      class: "back",
      type: "submit",
      events: {
        click: () => {
          router.go("/messenger");
        },
      },
    });
    this.children = {
      inputEmail: inputEmail,
      inputLogin: inputLogin,
      inputFirstName: inputFirstName,
      inputSecondName: inputSecondName,
      inputPhone: inputPhone,
      submitButton: submitButton,
      avatarComponent: avatarComponent,
      logout: logout,
      backBtn: backBtn,
    };

    return this.compile(template, this.props, "page-container");
  }
}

export default ProfilePage;
