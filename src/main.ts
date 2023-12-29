import "./styles/style.scss";
import * as pages from "./pages/index";
import Router from "./router/router";

const router = new Router("#app");

router
  .use("/", () => new pages.HomePage({ name: "homePage Page" }))
  .use("/settings", () => new pages.ProfilePage({ name: "Profile Page" }))
  .use("/login", () => new pages.LoginPage({ title: "Вход" }))
  .use("/registration", () => new pages.RegistrationPage({ title: "Регистрация" }))
  .use("/400", () => new pages.ErrorPage400({ title: "400" }))
  .use("/500", () => new pages.ErrorPage500({ title: "500" }))
  .use("/chat", () => new pages.ChatPage({ title: "Chat Page" }));

router.start();
