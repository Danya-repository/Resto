class Autorization {
    constructor() {
        this.place = `.header .container`

        this.render();
        this.setEvents();

        console.log(this.autorizationCloseBtnWrapper);
        
    }

    setEvents() {
        this.autorizationCloseBtnWrapper.addEventListener('click', () => {
          $(this.loginForm).slideUp();
          $(this.signinForm).slideUp();
        })
    }

    render() {
        const Place = document.querySelector(this.place);

        this.autorization = document.createElement(`div`);
        this.autorization.className = `autorization`;

        this.autorizationCloseBtnWrapper = document.createElement('div');
        this.autorizationCloseBtnWrapper.className = `autorization__close-btn-wrapper`;
        this.autorizationCloseBtnWrapper.insertAdjacentHTML('afterbegin' , `<button class="close-btn close-btn--active">
        <div class="close-btn__decorate-block"></div>
        <div class="close-btn__decorate-block"></div>
      </button>`)

      
        this.loginForm = document.createElement(`form`);
        this.loginForm.className = `autorization__form-login`;
        this.loginForm.insertAdjacentHTML('afterbegin', `<span class="autorization__form-subtitle">Логин</span>
      <input class="autorization__input-login input-text" type="text" name="">
      <span class="autorization__form-subtitle">Пароль</span>
      <input class="autorization__input-password input-text" type="password">
      <button class="autorization__btn autorization__login-btn btn" type="button">Войти</button>`)
        
        this.signinForm = document.createElement('form');
        this.signinForm.className = `autorization__form-signin`;
        this.signinForm.insertAdjacentHTML('afterbegin', `<span class="autorization__form-subtitle">Логин:</span>
      <input class="autorization__input-login input-text" type="tel" name="">
      <span class="autorization__form-subtitle">Пароль</span>
      <input class="autorization__input-password input-text" type="password" name="">
      <span class="autorization__form-subtitle">Повторите пароль</span>
      <input class="autorization__input-password input-text" type="password">
      <button class="autorization__btn autorization__signin-btn btn" type="button">Зарегистрироваться</button>`)
        
        this.autorization.append(this.autorizationCloseBtnWrapper, this.loginForm, this.signinForm);
        Place.append(this.autorization);

    }
}

