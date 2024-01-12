export default `
<div class="{{class}}">
    <h3 class="create-room__title">{{title}}</h3>
    <div class="create-room__input">
    <input   type="text" name="createRoomInput" placeholder="{{inputPlaceholder}}">
    </div>
    <div class="create-room__button">
        {{{createButton}}}
    </div>
</div>
`;
