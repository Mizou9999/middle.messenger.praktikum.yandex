export default `

<div class="messages-container">
{{#each activeChatMessages}}
    <div class="conversation">
    <div class="conversation__message">{{this.content}}</div>
    <div class="conversation__date">{{ this.time}}</div>
    </div>
  {{/each}}
</div>
`;
