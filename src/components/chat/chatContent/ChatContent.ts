export default `

<div class="messages-container">
{{#if activeChatMessages.length}}
{{#each activeChatMessages}}
    <div class="conversation {{#if this.isMe}}is_me{{/if}}">
    <div class="conversation__message">{{this.content}}</div>
    <div class="conversation__date">{{ this.time}}</div>
    </div>
  {{/each}}
{{else}}
    {{msg_content}}
{{/if}}

</div>
`;
