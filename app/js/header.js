class Header {
  constructor(simpleInstance) {
    this.place = `body`;
    this.simpleBar = simpleInstance;
    
    this.render();
    this.autorization = new Autorization();

    this.setEvents();
    this.checkTheme();
  }



  setEvents() {
    const HeaderWrapperTop = this.header.querySelector('.header__inner-top')
    const HeaderWrapperBottom = this.header.querySelector('.header__inner-bottom')

    this.logoLink.addEventListener('click', () => {
      new IndexPage(this.simpleBar);
    })

    this.extra.addEventListener('click', (event) => {

      if (event.target.classList.contains('extra__link')) {
        switch (event.target.dataset.extraHref) {
          case ('about-us'):
            new AboutUsPage().render();
            break;
          case ('vacancies'):
            new VacanciesPage().render();
            break;
          case ('reviews'):
            new ReviewsPage(this.simpleBar).render();
        }
      }
    })

    this.extraBtn.addEventListener('click', (event) => {
      event.preventDefault;

      if (this.extraContent.classList.contains('extra__content--active')) {
        this.extraBtn.classList.remove('extra__btn--active');
        this.extraContent.classList.remove('extra__content--active');

      }
      else {
        this.extraBtn.classList.add('extra__btn--active');
        this.extraContent.classList.add('extra__content--active');
      }
    })

    this.menu.addEventListener('click', (event) => {
      event.preventDefault()
      if (event.target.classList.contains('menu__link')) {

        new CatalogPage(event.target.dataset.typeFood, new BasketButton);
        if (window.innerWidth < 800) {
          this.menu.classList.remove('open')
        }

        this.simpleBar.getScrollElement().scrollTop = 0;

      }

    })

    this.toggleThemeBtn.addEventListener('click', () => {
      this.toggleThemeBtn.classList.toggle('active');
      document.querySelector('html').classList.toggle('dark-theme')

      const Theme = localStorage.getItem('theme');
      if (Theme === 'dark-theme') {
        localStorage.setItem('theme', 'light-theme');
      }
      else {
        localStorage.setItem('theme', 'dark-theme');
      }
      
    })
    
    this.dropDownIcon.onclick = () => {
        $('.drop-down__list').slideToggle();
        $('.drop-down__icon').toggleClass('icon-bar__icon--active');

        if (window.innerWidth < 1024 &&
            window.innerWidth > 800 && 
            document.querySelector('.drop-down__icon').classList.contains('icon-bar__icon--active')) 
        {
            $('.drop-down__list').css('display', 'flex')
        }
    }

    this.dropDownList.onclick = (event) => {
      
      if (event.target.classList.contains('login')) {
        this.simpleBar.getScrollElement().scrollTop = 0;
        $(this.autorization.loginForm).slideDown()
        $(this.autorization.signinForm).slideUp();
      }
      if (event.target.classList.contains('signin')) {
        this.simpleBar.getScrollElement().scrollTop = 0;
        $(this.autorization.loginForm).slideUp()
        $(this.autorization.signinForm).slideDown();
      }
    }
    
    this.menuBtn.addEventListener('click', () => {
      document.querySelector('.menu').classList.toggle('open')
    })

    this.menuCloseBtn.addEventListener('click', () => {
      document.querySelector('.menu').classList.toggle('open')
    })
    
    this.simpleBar.getScrollElement().addEventListener('scroll', function () {

      if (HeaderWrapperTop.getBoundingClientRect().top + HeaderWrapperTop.offsetHeight <= 0) {

        HeaderWrapperBottom.classList.add('header__inner-bottom--animation-fix-to-top')
        HeaderWrapperTop.style.marginBottom = `${HeaderWrapperTop.offsetHeight}px`
      }
      else {
        HeaderWrapperBottom.classList.remove('header__inner-bottom--animation-fix-to-top')
        HeaderWrapperTop.style.marginBottom = `0`
      }
    });
  }

  checkTheme() {
    const nowTheme = localStorage.getItem('theme')

    if (nowTheme === "dark-theme") {
      document.querySelector('html').classList.add('dark-theme')
    }
    else {
      localStorage.setItem('theme', 'light-theme');
    }
  }

  createHeader() {
    const Place = document.querySelector('.simplebar-content');
    this.header = document.createElement('header');
    this.header.className = 'header';

    Place.prepend(this.header);
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.className = `container`;

    this.header.append(this.container);
  }

  createTopInner() {
    this.topInner = document.createElement('div');
    this.topInner.className = `header__inner-top`;

    this.container.append(this.topInner);
  }

  createBottomInner() {
    this.bottomInner = document.createElement('div');
    this.bottomInner.className = `header__inner-bottom`;

    this.container.append(this.bottomInner);
  }

  createLogo() {
    this.logoLink = document.createElement('a');
    this.logoLink.classList.add('logo')
    this.logoLink.insertAdjacentHTML('afterbegin', `<div class="logo__icon">
                                                        <svg width="30" height="25" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                              d="M31.6667 3.33337H8.33337C5.57671 3.33337 3.33337 5.57671 3.33337 8.33337V13.0517C3.33337 14.8067 3.97004 16.4017 5.00004 17.6284V33.3334C5.00004 33.7754 5.17564 34.1993 5.4882 34.5119C5.80076 34.8244 6.22468 35 6.66671 35H20C20.4421 35 20.866 34.8244 21.1786 34.5119C21.4911 34.1993 21.6667 33.7754 21.6667 33.3334V25H28.3334V33.3334C28.3334 33.7754 28.509 34.1993 28.8215 34.5119C29.1341 34.8244 29.558 35 30 35H33.3334C33.7754 35 34.1993 34.8244 34.5119 34.5119C34.8244 34.1993 35 33.7754 35 33.3334V17.6267C36.03 16.4017 36.6667 14.8067 36.6667 13.05V8.33337C36.6667 5.57671 34.4234 3.33337 31.6667 3.33337ZM33.3334 8.33337V13.0517C33.3334 14.9517 31.9184 16.5717 30.1817 16.6634L30 16.6667C28.1617 16.6667 26.6667 15.1717 26.6667 13.3334V6.66671H31.6667C32.5867 6.66671 33.3334 7.41504 33.3334 8.33337ZM16.6667 13.3334V6.66671H23.3334V13.3334C23.3334 15.1717 21.8384 16.6667 20 16.6667C18.1617 16.6667 16.6667 15.1717 16.6667 13.3334ZM6.66671 8.33337C6.66671 7.41504 7.41337 6.66671 8.33337 6.66671H13.3334V13.3334C13.3334 15.1717 11.8384 16.6667 10 16.6667L9.81837 16.6617C8.08171 16.5717 6.66671 14.9517 6.66671 13.0517V8.33337ZM16.6667 26.6667H10V21.6667H16.6667V26.6667Z"
                                                              fill="url(#paint0_linear)" />
                                                            <defs>
                                                              <linearGradient id="paint0_linear" x1="20" y1="3.33337" x2="20" y2="35" gradientUnits="userSpaceOnUse">
                                                                <stop stop-color="#EA9769" />
                                                                <stop offset="1" stop-color="#EA6969" />
                                                              </linearGradient>
                                                            </defs>
                                                          </svg>
                                                      </div>
                                                      <span class="logo__lable">Resto</span>`)
    this.topInner.append(this.logoLink)
  }

  createExtra() {
    this.extra = document.createElement(`div`);
    this.extra.className = `extra`;

    this.extraBtn = document.createElement('button');
    this.extraBtn.className = `extra__btn`;
    this.extraBtn.insertAdjacentHTML('afterbegin', `<div class="extra__btn-decorate-block"></div>
    <div class="extra__btn-decorate-block"></div>`)

    this.extraContent = document.createElement('div');
    this.extraContent.className = `extra__content`;

    this.extraList = document.createElement('ul');
    this.extraList.className = `extra__list`;
    this.extraList.insertAdjacentHTML('afterbegin', `<li class="extra__item">
                                                       <a class="extra__link" href="#" data-extra-href="about-us">О нас</a>
                                                       <div class="extra__decorate-block"></div>
                                                     </li>
                                                     <li class="extra__item">
                                                       <a class="extra__link" href="#" data-extra-href="reviews">Отзывы</a>
                                                       <div class="extra__decorate-block"></div>
                                                     </li>
                                                     <li class="extra__item">
                                                       <a class="extra__link" href="#" data-extra-href="vacancies">Вакансии</a>
                                                       <div class="extra__decorate-block"></div>
                                                     </li>`)

    this.extra.append(this.extraBtn);
    this.extra.append(this.extraContent)
    this.extraContent.append(this.extraList);



    this.topInner.append(this.extra);













    // for (let i = 0; i < 3; i++) {
    //   this.extraItem = document.createElement('li');


    // }

    //<li class="extra__item">
    //               <a class="extra__link" href="#" data-extra-href="about-us">О нас</a>
    //               <div class="extra__decorate-block"></div>
    //             </li>
  }

  createMenu() {
    this.menu = document.createElement('nav');
    this.menu.className = `menu`;

    this.menuCloseBtnWrapper = document.createElement('div');
    this.menuCloseBtnWrapper.className = `menu__close-btn-wrapper`;

    this.menuCloseBtn = document.createElement('button');
    this.menuCloseBtn.className = `close-btn close-btn--active`
    this.menuCloseBtn.insertAdjacentHTML('afterbegin', `<button class="close-btn close-btn--active">
                                                            <div class="close-btn__decorate-block"></div>
                                                            <div class="close-btn__decorate-block"></div>
                                                           </button>`);

    this.menuList = document.createElement('ul');
    this.menuList.className = `menu__list`;
    this.menuList.insertAdjacentHTML('afterbegin', `<li class="menu__item">
              <a class="menu__link" href="#" data-type-food="hot-dishes">
                Горячие блюда
              </a>
              <div class="menu__animation-block"></div>
            </li>
            <li class="menu__decorate-block"></li>
            <li class="menu__item">
              <a class="menu__link" href="#" data-type-food="cold-dishes">
                Холодные блюда
              </a>
              <div class="menu__animation-block"></div>
            </li>
            <li class="menu__decorate-block"></li>
            <li class="menu__item">
              <a class="menu__link" href="#" data-type-food="soups">
                Супы
              </a>
              <div class="menu__animation-block"></div>
            </li>
            <li class="menu__decorate-block"></li>
            <li class="menu__item">
              <a class="menu__link" href="#" data-type-food="grill">
                Гриль
              </a>
              <div class="menu__animation-block"></div>
            </li>
            <li class="menu__decorate-block"></li>
            <li class="menu__item">
              <a class="menu__link" href="#" data-type-food="salads">
                Салаты
              </a>
              <div class="menu__animation-block"></div>
            </li>
            <li class="menu__decorate-block"></li>
            <li class="menu__item">
              <a class="menu__link" href="#" data-type-food="desserts">
                Десерты
              </a>
              <div class="menu__animation-block"></div>
            </li>`)

    this.menuCloseBtnWrapper.append(this.menuCloseBtn);
    this.menu.append(this.menuCloseBtnWrapper);
    this.menu.append(this.menuList);

    this.bottomInner.append(this.menu)
  }

  createMenuBtn() {
    this.menuBtn = document.createElement('button');
    this.menuBtn.className = `menu__btn`;
    this.menuBtn.innerText = `Меню`;

    this.iconBar.append(this.menuBtn);
  }

  createBasketBtn() {
    this.basketBtn = document.createElement('button');
    this.basketBtn.className = `icon-bar__btn basket-btn`;
    this.basketBtn.insertAdjacentHTML('afterbegin', `<svg fill="black" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                                        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                                                        style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                                        <g>
                                                          <g>
                                                            <path
                                                              d="M473.043,164.174h-26.541c-0.203-0.226-0.393-0.459-0.61-0.675L301.197,18.803c-6.519-6.52-17.091-6.52-23.611,0
                                                                  s-6.52,17.091,0,23.611l121.759,121.759H112.654L234.414,42.414c6.52-6.52,6.52-17.091,0-23.611c-6.519-6.52-17.091-6.52-23.611,0
                                                                  L66.107,163.499c-0.217,0.217-0.407,0.45-0.61,0.675H38.957C17.476,164.174,0,181.65,0,203.13v22.261
                                                                  c0,20.461,15.855,37.287,35.924,38.84l32,192.003c4.043,24.251,24.82,41.853,49.406,41.853H399.56
                                                                  c24.765,0,46.081-18.488,49.584-43.004l27.268-190.88c19.91-1.714,35.587-18.467,35.587-38.812V203.13
                                                                  C512,181.65,494.524,164.174,473.043,164.174z M478.609,225.391c0,3.069-2.497,5.565-5.565,5.565c-5.126,0-159.642,0-166.956,0
                                                                  c-9.22,0-16.696,7.475-16.696,16.696c0,9.22,7.475,16.696,16.696,16.696h136.576L416.09,450.362
                                                                  c-1.168,8.172-8.273,14.334-16.529,14.334H117.33c-8.195,0-15.121-5.867-16.469-13.951L69.796,264.348h136.117
                                                                  c9.22,0,16.696-7.475,16.696-16.696c0-9.22-7.475-16.696-16.696-16.696c-7.325,0-161.852,0-166.956,0
                                                                  c-3.069,0-5.565-2.497-5.565-5.565V203.13c0-3.069,2.497-5.565,5.565-5.565h434.087c3.069,0,5.565,2.497,5.565,5.565V225.391z" />
                                                              </g>
                                                                 </g>
                                                                 <g>
                                                                   <g>
                                                                     <path d="M155.826,297.739c-9.22,0-16.696,7.475-16.696,16.696v100.174c0,9.22,7.475,16.696,16.696,16.696
                                                                           s16.696-7.475,16.696-16.696V314.434C172.522,305.214,165.047,297.739,155.826,297.739z" />
                                                                   </g>
                                                                 </g>
                                                                 <g>
                                                                   <g>
                                                                     <path d="M256,297.739c-9.22,0-16.696,7.475-16.696,16.696v100.174c0,9.22,7.475,16.696,16.696,16.696
                                                                           c9.22,0,16.696-7.475,16.696-16.696V314.434C272.696,305.214,265.22,297.739,256,297.739z" />
                                                                   </g>
                                                                 </g>
                                                                 <g>
                                                                   <g>
                                                                     <path d="M356.174,297.739c-9.22,0-16.696,7.475-16.696,16.696v100.174c0,9.22,7.475,16.696,16.696,16.696
                                                                           c9.22,0,16.696-7.475,16.696-16.696V314.434C372.87,305.214,365.394,297.739,356.174,297.739z" />
                                                                   </g>
                                                                 </g>
                                                               </svg>
                                                               <div class="basket-btn__counter">
                                                               </div>`)
    
    this.iconBar.append(this.basketBtn)                                                              
  }

  createIconBar() {
    this.iconBar = document.createElement('div');
    this.iconBar.className=  `icon-bar`;

    this.toggleThemeBtn = document.createElement('button');
    this.toggleThemeBtn.className = `icon-bar__btn dark-theme-btn`;
    this.toggleThemeBtn.insertAdjacentHTML('afterbegin', `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                viewBox="0 0 312.999 312.999" style="enable-background:new 0 0 312.999 312.999;" xml:space="preserve">
                                             <g>
                                                 <g>
                                                     <path d="M305.6,178.053c-3.2-0.8-6.4,0-9.2,2c-10.4,8.8-22.4,16-35.6,20.8c-12.4,4.8-26,7.2-40.4,7.2c-32.4,0-62-13.2-83.2-34.4
                                                         c-21.2-21.2-34.4-50.8-34.4-83.2c0-13.6,2.4-26.8,6.4-38.8c4.4-12.8,10.8-24.4,19.2-34.4c3.6-4.4,2.8-10.8-1.6-14.4
                                                         c-2.8-2-6-2.8-9.2-2c-34,9.2-63.6,29.6-84.8,56.8c-20.4,26.8-32.8,60-32.8,96.4c0,43.6,17.6,83.2,46.4,112s68.4,46.4,112,46.4
                                                         c36.8,0,70.8-12.8,98-34c27.6-21.6,47.6-52.4,56-87.6C314.4,184.853,311.2,179.253,305.6,178.053z M244.4,261.653
                                                         c-23.2,18.4-52.8,29.6-85.2,29.6c-38,0-72.4-15.6-97.2-40.4c-24.8-24.8-40.4-59.2-40.4-97.2c0-31.6,10.4-60.4,28.4-83.6
                                                         c12.4-16,28-29.2,46-38.4c-2,4.4-4,8.8-5.6,13.6c-5.2,14.4-7.6,29.6-7.6,45.6c0,38,15.6,72.8,40.4,97.6s59.6,40.4,97.6,40.4
                                                         c16.8,0,32.8-2.8,47.6-8.4c5.2-2,10.4-4,15.2-6.4C274,232.453,260.8,248.853,244.4,261.653z"/>
                                                 </g>
                                             </g>
                                            </svg>`)

    this.dropDown = document.createElement('div');
    this.dropDown.className = `icon-bar__btn drop-down`;

    this.dropDownIcon = document.createElement('div');
    this.dropDownIcon.className = `drop-down__icon`;
    this.dropDownIcon.insertAdjacentHTML('afterbegin', `<svg fill="black" width="20" height="20" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
    style="enable-background:new 0 0 512 512;" xml:space="preserve">
    <g>
      <g>
        <path d="M256,288.389c-153.837,0-238.56,72.776-238.56,204.925c0,10.321,8.365,18.686,18.686,18.686h439.747
    c10.321,0,18.686-8.365,18.686-18.686C494.56,361.172,409.837,288.389,256,288.389z M55.492,474.628
    c7.35-98.806,74.713-148.866,200.508-148.866s193.159,50.06,200.515,148.866H55.492z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M256,0c-70.665,0-123.951,54.358-123.951,126.437c0,74.19,55.604,134.54,123.951,134.54s123.951-60.35,123.951-134.534
    C379.951,54.358,326.665,0,256,0z M256,223.611c-47.743,0-86.579-43.589-86.579-97.168c0-51.611,36.413-89.071,86.579-89.071
    c49.363,0,86.579,38.288,86.579,89.071C342.579,180.022,303.743,223.611,256,223.611z" />
      </g>
    </g>
  </svg>`)

    this.dropDownList = document.createElement('ul');
    this.dropDownList.className = `drop-down__list`;
    this.dropDownList.insertAdjacentHTML('afterbegin', `<li class="drop-down__item">
        <a class="drop-down__link login" href="#">
          Войти
        </a>
      </li>
      <li class="drop-down__item">
        <a class="drop-down__link signin" href="#">
          Зарегистрироваться
        </a>
      </li>`)

    this.dropDown.append(this.dropDownIcon, this.dropDownList)
    this.iconBar.append(this.toggleThemeBtn, this.dropDown)  
                                     
    this.bottomInner.append(this.iconBar);


  }

  render() {
    this.createHeader();
    this.createContainer();
    this.createTopInner();
    this.createBottomInner();
    this.createLogo();
    this.createExtra();
    this.createMenu();
    this.createIconBar();
    this.createMenuBtn();
    this.createBasketBtn();
  }


//   if (event.target.classList.contains('personal-btn') &&
    //     HeaderWrapperBottom.getBoundingClientRect().top === 0) {

    //     $('.autorization').slideToggle()
    //     this.simpleBar.getScrollElement().scrollTop = distanceBetweenBegginingPageAndHeaderWrapperBottom;
    //   }
    // })

      

}