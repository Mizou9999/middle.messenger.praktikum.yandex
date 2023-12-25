export default `
<div class="content">
  <form action="" method="post" class="content__login-form">
    <h1 class="content__login-form__title">{{{title}}}</h1>
    <div class="content__login-form__input"> {{{inputEmail}}} </div>
    <div class="content__login-form__input"> {{{inputLogin}}} </div>
    <div class="content__login-form__input"> {{{inputFirstName}}}    </div>
    <div class="content__login-form__input"> {{{inputSecondName}}}   </div>
    <div class="content__login-form__input">   {{{inputPhone}}}    </div>
    <div class="content__login-form__input">{{{inputPassword}}} </div>
    <div class="content__login-form__input">{{{inputRepeatPassword}}} </div>

    <div class="content__login-form__buttons-container">
      {{{button}}} 
      <p><a href="/login">Войти</a></p>
    </div>
  </form>
</div>
`;
