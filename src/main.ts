import "./styles/style.scss";
import * as pages from "./pages/index";
import renderDOM from "./utils/RenderDOM";

const render = () => {
  const { pathname } = window.location;

  const profilePage = new pages.ProfilePage({ name: "Profile Page" });
  const homePage = new pages.HomePage({ name: "homePage Page" });
  const loginPage = new pages.LoginPage({ title: "Вход" });
  const registrationPage = new pages.RegistrationPage({ title: "Регистрация" });
  const errorPage400 = new pages.ErrorPage400({ title: "400" });
  const errorPage500 = new pages.ErrorPage500({ title: "500" });
  const chatPage = new pages.ChatPage({ title: "Chat Page" });

  switch (pathname) {
    case "/settings":
      renderDOM("#app", profilePage);
  }
  switch (pathname) {
    case "/":
      renderDOM("#app", homePage);
  }
  switch (pathname) {
    case "/login":
      renderDOM("#app", loginPage);
  }
  switch (pathname) {
    case "/registration":
      renderDOM("#app", registrationPage);
  }
  switch (pathname) {
    case "/400":
      renderDOM("#app", errorPage400);
  }
  switch (pathname) {
    case "/500":
      renderDOM("#app", errorPage500);
  }
  switch (pathname) {
    case "/chat":
      renderDOM("#app", chatPage);
  }
};
document.addEventListener("DOMContentLoaded", function () {
  render();
});

// if (appElement) {
//   appElement.innerHTML = `
//     <nav class="nav">
//     <ul>

//         <li><a href="/pages/login/login.html">Вход</a></li>
//         <li><a href="/pages/registration/registration.html"> Регистрация</a></li>
//         <li><a href="/pages/chat/chat.html"> Список чатов</a></li>
//         <li><a href="/pages/profile/settings.html"> Настройки пользователя</a></li>
//         <li><a href="/pages/not_found/400.html"> 400</a></li>
//         <li><a href="/pages/not_found/500.html"> 500</a></li>
//     </ul>

//     </nav>

//     <div class="home">
//         <div class="home__svg-container">

//         </div>
//         <h1 class='home__title'>Yandex.Practicum Messenger</h1>
//         <nav class='home__nav'>
//         <ul>
//         <li><a href="/pages/login/login.html">Вход</a></li>
//         <li><a href="/pages/registration/registration.html"> Регистрация</a></li>
//         <li><a href="/pages/chat/chat.html"> Список чатов</a></li>
//         <li><a href="/pages/profile/settings.html"> Настройки пользователя</a></li>
//         <li><a href="/pages/not_found/400.html"> 400</a></li>
//         <li><a href="/pages/not_found/500.html"> 500</a></li>
//         </ul>
//         </nav>
//     </div>
// `;
// } else {
//   console.log("error appElement");
// }
