export default `
<div class="chat-card">
<div class="avatar">
	<img src="{{{avatar}}}" alt="Avatar">
</div>
<div class="chat-info">
	<div class="user-name">{{{title}}}</div>
	<p class="last-msg ww">{{lastMessage}}</p>
</div>
<div class="chat-details">
	<div class="time">{{date}}</div>
	<div class="unread-msgs">{{unread_count}}</div>
</div>
</div>

`;
