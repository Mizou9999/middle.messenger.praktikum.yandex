export default `
<div class="chat-card">
<div class="avatar">
	<img src="{{img}}" alt="Avatar">
</div>
<div class="chat-info">
	<div class="user-name">{{user_name}}</div>
	<div class="last-msg">{{last_msg}}</div>
</div>
<div class="chat-details">
	<div class="time">{{date}}</div>
	{{#if new_msgs}}
		<div class="unread-msgs">{{new_msgs}}</div>
	{{/if}}
</div>
</div>

`;
