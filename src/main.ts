import "./style.scss";

import ChatItem from "./components/ChatItem";
import Button from "./components/Button/Button";

Button();
const appElement = document.getElementById("app");
if (appElement) {
  appElement.innerHTML = `
    <nav class="nav">
    <ul>
        
        <li><a href="/pages/login/login.html">Вход</a></li>
        <li><a href="/pages/registration/registration.html"> Регистрация</a></li>
        <li><a href="/pages/chat/chat.html"> Список чатов</a></li>
        <li><a href="/pages/profile/settings.html"> Настройки пользователя</a></li>
        <li><a href="/pages/not_found/400.html"> 400</a></li>
        <li><a href="/pages/not_found/500.html"> 500</a></li>
    </ul>
        
    </nav>
    
    <div class="home">
        <div class="home__svg-container">
            
        </div>
        <h1 class='home__title'>Yandex.Practicum Messenger</h1>
        <nav class='home__nav'>
        <ul>
        <li><a href="/pages/login/login.html">Вход</a></li>
        <li><a href="/pages/registration/registration.html"> Регистрация</a></li>
        <li><a href="/pages/chat/chat.html"> Список чатов</a></li>
        <li><a href="/pages/profile/settings.html"> Настройки пользователя</a></li>
        <li><a href="/pages/not_found/400.html"> 400</a></li>
        <li><a href="/pages/not_found/500.html"> 500</a></li>
        </ul>
        </nav>
    </div>
`;
} else {
  console.log("error appElement");
}
