import Block from "../../utils/Block";
import template from "./Login";
import "./login.scss";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { validateLogin, validatePassword } from "../../utils/validationutils";
import AuthController from "../../controllers/AuthController";

interface ILoginPageProps {
  title: string;
  class?: string;
}

class LoginPage extends Block {
  constructor(props: ILoginPageProps) {
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
            const login = (document.querySelector("input[name='login']") as HTMLInputElement).value;
            const password = (document.querySelector("input[name='password']") as HTMLInputElement).value;
            // some how TS show error with this.state
            const signinData = {
              login: login,
              password: password,
            };
            AuthController.signin(signinData);
            console.log("final login data", this.state);
          } else {
            console.log("Error login", this.state);
          }
        },
      },
    });
    this.state = {
      login: "",
      password: "",
    };
  }
  validateField(fieldName: string, value: string, inputElement: HTMLInputElement): boolean {
    if (fieldName === "login") {
      const isValid = validateLogin(value);
      if (!isValid) {
        this.children.inputLogin?.setProps({
          errorMessage: "Invalid Login",
          class: "error",
        });
        inputElement.classList.add("error");
        return false;
      }
    } else if (fieldName === "password") {
      const isValid = validatePassword(value);
      if (!isValid) {
        this.children.inputPassword?.setProps({
          errorMessage: "Invalid Password",
          class: "error",
        });
        inputElement.classList.add("error");

        return false;
      }
    }
    inputElement.classList.remove("error");
    return true;
  }
  handleFocusOut = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const fieldName = target.name;
    const value = target.value;
    this.validateField(fieldName, value, target);
    this.state[fieldName] = target.value;
  };

  render() {
    const button = new Button({
      class: "button-submit",
      type: "submit",
      title: "Войти",
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

    const inputPassword = new Input({
      name: "password",
      placeholder: "••••••••••••",
      type: "password",
      modificator: "password",
      label: "Пароль",
      events: {
        focusout: (event) => {
          this.handleFocusOut(event);
        },
      },
    });

    this.children = {
      button: button,
      inputLogin: inputLogin,
      inputPassword: inputPassword,
    };
    return this.compile(template, this.props, "page-container");
  }
}

export default LoginPage;
