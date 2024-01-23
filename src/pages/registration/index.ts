import Block from "../../utils/Block";
import template from "./Registration";
import "../login/login.scss";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { validateLogin, validatePassword, validateEmail, validateName, validatePhone, doesPasswordMatch } from "../../utils/validationutils";

interface LoginPageProps {
  title: string;
  class?: string;
}

class RegistrationPage extends Block {
  constructor(props: LoginPageProps) {
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
            console.log("final login data", this.state);
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
      password: "",
    };
  }
  validateField(fieldName: string, value: string, inputElement: HTMLInputElement): boolean {
    if (fieldName === "email") {
      const isValid = validateEmail(value);
      if (!isValid) {
        this.children.inputEmail?.setProps({
          errorMessage: "Invalid email",
          class: "error",
        });
        console.error("Invalid email");
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
        this.children.inputFirstName?.setProps({
          errorMessage: "Invalid name",
          class: "error",
        });
        console.error("Invalid name");
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
    } else if (fieldName === "password") {
      const isValid = validatePassword(value);
      if (!isValid) {
        this.children.inputPassword?.setProps({
          errorMessage: "Invalid password",
          class: "error",
        });
        console.error("Invalid password");
        inputElement.classList.add("error");
        return false;
      }
    } else if (fieldName === "phone") {
      const isValid = validatePhone(value);
      if (!isValid) {
        this.children.inputPhone?.setProps({
          errorMessage: "Invalid phone",
          class: "error",
        });
        console.error("Invalid phone");
        inputElement.classList.add("error");
        return false;
      }
    } else if (fieldName === "repeat_password") {
      const isValid = doesPasswordMatch(value, this.state.password as string);
      if (!isValid) {
        this.children.inputRepeatPassword?.setProps({
          errorMessage: "Invalid password-repeat",
          class: "error",
        });
        console.error("Invalid password-repeat");
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
      title: "Зарегистрироваться",
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
    const inputRepeatPassword = new Input({
      name: "repeat_password",
      placeholder: "••••••••••••",
      type: "password",
      modificator: "password",
      label: "Пароль (ещё раз)",
      events: {
        focusout: (event) => {
          this.handleFocusOut(event);
        },
      },
    });

    this.children = {
      button: button,
      inputEmail: inputEmail,
      inputPassword: inputPassword,
      inputLogin: inputLogin,
      inputFirstName: inputFirstName,
      inputSecondName: inputSecondName,
      inputPhone: inputPhone,
      inputRepeatPassword: inputRepeatPassword,
    };
    return this.compile(template, this.props, "page-container");
  }
}

export default RegistrationPage;
