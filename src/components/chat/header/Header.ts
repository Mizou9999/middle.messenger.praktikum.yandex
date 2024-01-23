export default `

  <div class="chat-header__info">
    <img alt="Avatar" src="{{{img}}}" class="chat-header__avatar"></img>
    <p class="chat-header__name">{{{chat_room_title}}}</p>
  </div>
  <div class='chat-options'>
  <input type="text" class="chat-options__input" placeholder="Добавить пользователя"></input ">
    {{{addUser}}}
    {{{deleteUser}}}
  
</div>
`;
