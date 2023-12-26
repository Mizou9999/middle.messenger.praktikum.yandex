export default `
<div class="chat-container">
  <div class="chat-list">
    <span class='title'>Профиль ></span>
    <div class='search-container'>Search container</div>
    <div class='chat-separator'></div>
    {{{chatList}}}
  </div>
  <div class="chat-content">
    {{{chatHeader}}}
    {{{chatContent1}}}
    {{{chatContent2}}}
    
    
    <div class="message-container">{{{answerContent}}}</div>
    </div>
  </div>
</div>`;
