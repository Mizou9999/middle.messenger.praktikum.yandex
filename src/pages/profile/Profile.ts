export default `
<div class="content">
<form action="" method="post" class="content__settings-form">
  {{{avatarComponent}}}

  <div class="content__settings-form__input">{{{inputEmail}}}</div>
  <div class="content__settings-form__input">{{{inputLogin}}}</div>
  <div class="content__settings-form__input">{{{inputFirstName}}}</div>
  <div class="content__settings-form__input">{{{inputSecondName}}}</div>
  <div class="content__settings-form__input">{{{displayName}}}</div>
  <div class="content__settings-form__input">{{{inputPhone}}}</div>

  <div class="content__settings-form__buttons-container">
    {{{submitButton}}}
    {{{backBtn}}}
     {{{logout}}}
  </div>
</form>
</div>
`;
// <input type="file" name="avatar" id="avatar" accept="image/*" hidden />
