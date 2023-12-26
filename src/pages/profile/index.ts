import Block from "../../utils/Block";
import template from "./Profile";
import "./settings.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { validateLogin, validateEmail, validateName, validatePhone } from "../../utils/validationutils";

interface IProfilePageProps {
  name: string;
  class?: string;
}

class ProfilePage extends Block {
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
    };
  }
  validateField(fieldName: string, value: string, inputElement: HTMLInputElement): boolean {
    console.log("childs:", this.children);
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
  handleFocusOut = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const fieldName = target.name;
    const value = target.value;
    this.validateField(fieldName, value, target);
    this.state[fieldName] = target.value;
  };
  render() {
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

    this.children = {
      inputEmail: inputEmail,
      inputLogin: inputLogin,
      inputFirstName: inputFirstName,
      inputSecondName: inputSecondName,
      inputPhone: inputPhone,
      submitButton: submitButton,
    };

    return this.compile(template, this.props, "page-container");
  }
}

export default ProfilePage;
