export default `
<div class="chat-container">
<div class="chat-list">
<span class='title'>Профиль ></span>
{{{createButton}}}
{{{createRoom}}}

<div class='chat-separator'></div>
{{{chatList}}}
</div>
<div class="chat-content">
{{{chatHeader}}}
{{{chatContent}}}
<div class="message-container">{{{answerContent}}}</div>
</div>
</div>
</div>`;
