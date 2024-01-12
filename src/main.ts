import "./styles/style.scss";
import * as pages from "./pages/index";
import Router from "./router/router";
import AuthController from "./controllers/AuthController";
import ChatsController from "./controllers/ChatsController";

Router.use("/", () => new pages.HomePage({ name: "homePage Page" }))
  .use("/settings", () => new pages.ProfilePage({ name: "Profile Page" }))
  .use("/sign-in", () => new pages.LoginPage({ title: "Вход" }))
  .use("/registration", () => new pages.RegistrationPage({ title: "Регистрация" }))
  .use("/400", () => new pages.ErrorPage400({ title: "400" }))
  .use("/500", () => new pages.ErrorPage500({ title: "500" }))
  .use("/messenger", () => new pages.ChatPage({ title: "Chat Page" }));

await AuthController.fetchUser();
await ChatsController.fetchChats();
Router.start();
