class IndexPage {
    constructor(simpleInstance) {
        this.placeToRender = document.querySelector('main');
        this.simpleBar = simpleInstance
        this.__anim = this.__anim.bind(this)
        this.__offset = this.__offset.bind(this)
    }

    getSimpleBarInstance() {
        return this.simpleBar;
    }

    _carousel() {

        


        let getCarouselSlides = function() {

            let itemList = document.querySelector('.collage__carousel');
            let carouselSlides = Array.from(itemList.children)
                                    .filter(item =>  item.className.includes('collage__carousel-slide'));

            return carouselSlides;
        }();
        let getInfoSlides = function () {
            let itemList = document.querySelector('.collage__info');
            let infoSlides = Array.from(itemList.children);

            return infoSlides;
        }();

        let userChangeSlide = function () {
            
            let clickSlideArea = document.querySelector('.collage__carousel');
            
            clickSlideArea.addEventListener('click', function (event) {
                if (event.target.parentNode.classList.contains('collage__carousel-slide')) {
                    getActiveSlide().classList.remove('collage__carousel-slide--active');
                    event.target.parentNode.classList.add('collage__carousel-slide--active');
                    mainSlideWindowInserter();
                    mainSlideInfoInserter();
                }
                
            })

        }();

        let slideChanger = function (slides = getCarouselSlides) {
        

            for (let i = 0; i < slides.length; i++) {

                if (slides[i].className.includes('collage__carousel-slide--active')) {



                    slides[i].classList.remove('collage__carousel-slide--active');

                    if (i+1 <= slides.length-1) {
                        return slides[i+1].classList.add('collage__carousel-slide--active');
                    
                    }
                    else {
                        return slides[0].classList.add('collage__carousel-slide--active');

                    }

                }

            }
        
        }
 

        let mainSlideWindowInserter = function (slides = getCarouselSlides) {
            
            let mainSliderWindow = document.querySelector('.collage__carousel-window');
            
            
                    
                    let activeSlideImg = getActiveSlide().querySelector('img').cloneNode()

                    mainSliderWindow.innerHTML = "";
                    mainSliderWindow.appendChild(activeSlideImg);




        }

        let getActiveSlide = function (slides = getCarouselSlides) {
            for (let i = 0; i < slides.length; i++) {
                if (slides[i].className.includes('collage__carousel-slide--active')) {
                    return slides[i];
                }
            }
        }


        let mainSlideInfoInserter = function () {

                    
            let numberSlideActive  = getActiveSlide()
                                        .classList
                                        .item(1)
                                        .slice(-1);
                                        
            for (let i of getInfoSlides) {
                if (i.classList.contains('collage__info-slide--active')) {
                    i.classList.remove('collage__info-slide--active');
                    return getInfoSlides[numberSlideActive - 1].classList.add('collage__info-slide--active');

                }
                    
            }


                    

        }

        mainSlideWindowInserter(); // init first img in window-carousel

        let sliderMove = function () {
            slideChanger();
            mainSlideWindowInserter();
            mainSlideInfoInserter();
        }
        
        return setInterval(sliderMove, 7000);
        
        
    };

    __anim() {
        let animItems = document.querySelectorAll('.animated-item');

        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = this.__offset(animItem).top;
            const animStart = 7;


            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if(animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('animated-item--active');
            }
            else {
                if (!animItem.classList.contains('animated-no-hide')) {

                    animItem.classList.remove('animated-item--active');
                }
            }
        }
    }

    __offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    _animationAllItemAfterScroll() {
        let animItems = document.querySelectorAll('.animated-item');

        if (animItems.length > 0) {
          this.simpleBar.getScrollElement().addEventListener('scroll', this.__anim);
        }
        setTimeout(this.__anim, 500);

    };

    render() {
        this.placeToRender.innerHTML = `<div class="container"> 
                                           <section class="collage">
                                            <div class="collage__inner">
                                              <div class="collage__carousel animated-item animated-no-hide">
                                                <div class="collage__carousel-window">
                                                </div>
                                                <div class="collage__carousel-slide collage__carousel-slide-1 collage__carousel-slide--active">
                                                  <img class="collage__carousel-img" src="./images/content/soup-7.png" alt="">
                                                  <p class="carousel-item-text">Картофельный суп с креветками и икрой палтуса</p>
                                                </div>
                                                <div class="collage__carousel-slide collage__carousel-slide-2">
                                                  <img class="collage__carousel-img" src="./images/content/soup-7.png" alt="">
                                                  <p class="carousel-item-text">Картофельный суп с креветками и икрой палтуса</p>
                                                </div>
                                                <div class="collage__carousel-slide collage__carousel-slide-3">
                                                  <img class="collage__carousel-img" src="./images/content/soup-7.png" alt="">
                                                  <p class="carousel-item-text">Картофельный суп с креветками и икрой палтуса</p>
                                                </div>
                                                <div class="collage__carousel-slide collage__carousel-slide-4">
                                                  <img class="collage__carousel-img" src="./images/content/soup-7.png" alt="">
                                                  <p class="carousel-item-text">Картофельный суп с креветками и икрой палтуса</p>
                                                </div>
                                                <div class="collage__carousel-slide collage__carousel-slide-5">
                                                  <img class="collage__carousel-img" src="./images/content/soup-7.png" alt="">
                                                  <p class="carousel-item-text">Картофельный суп с креветками и икрой палтуса</p>
                                                </div>
                                              </div>
                                              <aside class="collage__info animated-item animated-no-hide">
                                                <div class="collage__info-slide collage__info-slide-1 collage__info-slide--active">
                                                  <p class="collage__info-title subtitle">Картофельный суп с креветками и икрой палтуса
                                                  </p>
                                                  <p class="collage__info-text">Крем-супы являются основой современной кулинарии. Они предоставляют
                                                    поварам огромные возможности по проявлению творчества и демонстрации мастерства. Картофельный суп с
                                                    креветками и икрой палтуса является одним из наиболее ярких порождений кулинарных фантазий на тему
                                                    крем-супов.</p>
                                                </div>
                                                <div class="collage__info-slide collage__info-slide-2">
                                                  <p class="collage__info-title subtitle">Холодный суп
                                                  </p>
                                                  <p class="collage__info-text">Холодные супы — общее название первых блюд, приготовляемых обычно на
                                                    основе молочных и кисломолочных продуктов и овощей, как с добавлением мясных продуктов, так и без, и
                                                    перед подачей не разогреваемых, а наоборот — охлаждаемых. Температура подачи 6—12 градусов Цельсия.
                                                  </p>
                                                </div>
                                                <div class="collage__info-slide collage__info-slide-3">
                                                  <p class="collage__info-title subtitle">Молочный суп
                                                  </p>
                                                  <p class="collage__info-text">Молочный суп — разновидность супа, в котором наряду с водой в качестве
                                                    жидкой основы используется молоко. Такие супы, как правило, содержат крупы, хлеб или макаронные
                                                    изделия. Молочный суп готовят с различными клёцками, галушками, например, это польский суп зачерка
                                                    или русская затируха с молоком.</p>
                                                </div>
                                                <div class="collage__info-slide collage__info-slide-4">
                                                  <p class="collage__info-title subtitle">Сладкий суп
                                                  </p>
                                                  <p class="collage__info-text">Приготовление сладких супов основано на использовании молока, сливок,
                                                    фруктового отвара или сока. Сладкий молочный суп многие помнят с детских лет, но это не единственно
                                                    возможный сладкий суп. Рецепт этого блюда может содержать пряности, крупы, вермишель. В таком случае
                                                    его подают на первое. А вот сладкий суп холодный из фруктов или ягод - отличный десерт.</p>
                                                </div>
                                                <div class="collage__info-slide collage__info-slide-5">
                                                  <p class="collage__info-title subtitle">Картофельный суп с креветками и икрой палтуса
                                                  </p>
                                                  <p class="collage__info-text">Крем-супы являются основой современной кулинарии. Они предоставляют
                                                    поварам огромные возможности по проявлению творчества и демонстрации мастерства. Картофельный суп с
                                                    креветками и икрой палтуса является одним из наиболее ярких порождений кулинарных фантазий на тему
                                                    крем-супов.</p>
                                                </div>

                                              </aside>
                                            </div>
                                          </section>
                                          <section class="benefits">
                                            <div class="benefits__inner">
                                              <div class="benefits__item-wrapper benefits__item-wrapper-1 animated-item animated-no-hide">
                                                <div class="benefits__item">
                                                  <div class="benefits__item-icon">
                                                    <svg width="100" height="100" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                                      xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                                                      style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                                      <g>
                                                        <g>
                                                          <path d="M456.354,334.396c-0.495-0.828-1.016-1.621-1.536-2.321c-5.171-7.228-12.86-12.006-21.632-13.449
                                                          c-8.73-1.442-17.579,0.614-24.781,5.786l-95.403,68.122h-99.669c-4.702,0-8.533-3.823-8.533-8.533s3.831-8.533,8.533-8.533H268.8
                                                          c16.469,0,29.867-13.397,29.867-29.867c0-0.094-0.009-0.879-0.017-0.964c-0.529-16.461-14.413-29.295-30.532-28.902h-111.01
                                                          c-9.839,0.085-19.422,3.61-26.974,9.907l-41.728,34.731c-1.946,1.63-3.072,4.028-3.072,6.562v102.4
                                                          c0,4.719,3.823,8.533,8.533,8.533h211.721c13.858-0.017,27.358-4.898,38.025-13.73l103.45-85.478
                                                          C461.116,368.648,465.195,349.21,456.354,334.396z M436.685,365.133L332.74,450.987c-7.629,6.315-17.28,9.796-27.162,9.813H102.4
                                                          v-89.865l38.664-32.188c4.54-3.78,10.283-5.897,16.12-5.948l111.206-0.008c7.074-0.009,12.979,5.342,13.21,12.809
                                                          c0,7.057-5.743,12.8-12.8,12.8h-55.467c-14.114,0-25.6,11.486-25.6,25.6s11.486,25.6,25.6,25.6h102.4
                                                          c1.775,0,3.507-0.555,4.975-1.587l97.638-69.726c3.516-2.526,7.791-3.507,12.075-2.825c4.275,0.708,8.013,3.029,10.581,6.613
                                                          c0.256,0.35,0.486,0.708,0.708,1.075C446.029,350.379,444.023,359.876,436.685,365.133z" />
                                                        </g>
                                                      </g>
                                                      <g>
                                                        <g>
                                                          <path d="M93.611,349.867H0v17.067h85.077v128H0V512h93.611c4.71,0,8.533-3.814,8.533-8.533V358.4
                                                          C102.144,353.681,98.321,349.867,93.611,349.867z" />
                                                        </g>
                                                      </g>
                                                      <g>
                                                        <g>
                                                          <path d="M42.667,426.667c-14.114,0-25.6,11.486-25.6,25.6c0,14.114,11.486,25.6,25.6,25.6s25.6-11.486,25.6-25.6
                                                          C68.267,438.153,56.781,426.667,42.667,426.667z M42.667,460.8c-4.702,0-8.533-3.823-8.533-8.533c0-4.71,3.831-8.533,8.533-8.533
                                                          c4.702,0,8.533,3.823,8.533,8.533C51.2,456.977,47.369,460.8,42.667,460.8z" />
                                                        </g>
                                                      </g>
                                                      <g>
                                                        <g>
                                                          <path
                                                            d="M503.467,264.533H8.533c-4.71,0-8.533,3.814-8.533,8.533c0,32.93,26.795,59.733,59.733,59.733h392.533
                                                          c32.93,0,59.733-26.803,59.733-59.733C512,268.348,508.186,264.533,503.467,264.533z M452.267,315.733H59.733
                                                          c-20.608,0-37.845-14.686-41.805-34.133h476.143C490.112,301.047,472.875,315.733,452.267,315.733z" />
                                                        </g>
                                                      </g>
                                                      <g>
                                                        <g>
                                                          <path d="M256,42.667c-122.334,0-221.867,99.533-221.867,221.867v8.533c0,4.719,3.823,8.533,8.533,8.533h426.667
                                                          c4.719,0,8.533-3.814,8.533-8.533v-8.533C477.867,142.199,378.342,42.667,256,42.667z M51.2,264.533
                                                          c0-112.922,91.878-204.8,204.8-204.8s204.8,91.878,204.8,204.8H51.2z" />
                                                        </g>
                                                      </g>
                                                      <g>
                                                        <g>
                                                          <path d="M115.644,140.006c-5.965,6.707-11.494,13.884-16.435,21.342l14.225,9.429c4.506-6.793,9.54-13.338,14.967-19.439
                                                          L115.644,140.006z" />
                                                        </g>
                                                      </g>
                                                      <g>
                                                        <g>
                                                          <path d="M256,76.8c-47.923,0.026-93.551,18.133-128.469,50.961l11.691,12.433c31.744-29.85,73.224-46.302,116.787-46.327L256,76.8
                                                          z" />
                                                        </g>
                                                      </g>
                                                      <g>
                                                        <g>
                                                          <rect x="230.4" width="51.2" height="17.067" />
                                                        </g>
                                                      </g>
                                                      <g>
                                                        <g>
                                                          <rect x="247.467" y="8.533" width="17.067" height="42.667" />
                                                        </g>
                                                      </g>
                                                    </svg>
                                                  </div>
                                                  <p class="benefits__item-title">Качество блюд</p>
                                                  <p class="benefits__item-text">Наши шеф-повара обладатели 3 звезд мишлен</p>
                                                </div>
                                              </div>
                                              <div class="benefits__item-wrapper benefits__item-wrapper-2 animated-item animated-no-hide">
                                                <div class="benefits__item">
                                                  <div class="benefits__item-icon">
                                                    <svg height="100" width="100" id="Capa_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512"
                                                      xmlns="http://www.w3.org/2000/svg">
                                                      <g>
                                                        <path
                                                          d="m256 121.957c4.142 0 7.5-3.358 7.5-7.5v-11.008c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v11.008c0 4.142 3.358 7.5 7.5 7.5z" />
                                                        <path
                                                          d="m368.767 142.996c-2.929-2.929-7.678-2.93-10.606 0l-7.784 7.783c-2.93 2.929-2.93 7.678-.001 10.607 1.465 1.464 3.384 2.197 5.304 2.197 1.919 0 3.839-.732 5.303-2.196l7.784-7.784c2.928-2.929 2.928-7.678 0-10.607z" />
                                                        <path
                                                          d="m396.728 248.501c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h11.008c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5z" />
                                                        <path
                                                          d="m360.405 350.376c-2.93-2.928-7.678-2.928-10.607 0-2.929 2.93-2.929 7.678 0 10.607l7.783 7.783c1.465 1.464 3.385 2.196 5.304 2.196s3.839-.732 5.304-2.196c2.929-2.93 2.929-7.678 0-10.607z" />
                                                        <path
                                                          d="m247.683 396.729v11.008c0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-11.008c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5z" />
                                                        <path
                                                          d="m150.201 349.798-7.784 7.783c-2.929 2.929-2.929 7.678 0 10.606 1.464 1.465 3.384 2.197 5.303 2.197s3.839-.732 5.303-2.196l7.784-7.783c2.929-2.929 2.929-7.678 0-10.606-2.928-2.929-7.677-2.928-10.606-.001z" />
                                                        <path
                                                          d="m103.448 247.684c-4.142 0-7.5 3.358-7.5 7.5 0 4.143 3.358 7.5 7.5 7.5h11.008c4.142 0 7.5-3.357 7.5-7.5 0-4.142-3.358-7.5-7.5-7.5z" />
                                                        <path
                                                          d="m161.386 150.202-7.784-7.784c-2.93-2.929-7.677-2.928-10.607 0-2.929 2.929-2.928 7.678 0 10.607l7.784 7.783c1.465 1.465 3.384 2.197 5.303 2.197s3.839-.732 5.304-2.197c2.929-2.929 2.928-7.677 0-10.606z" />
                                                        <path
                                                          d="m276.098 274.768 53.422 27.47c3.706 1.906 8.216.422 10.1-3.24 1.895-3.684.443-8.205-3.24-10.1l-53.404-27.461c.354-1.759.542-3.577.542-5.438 0-12.573-8.479-23.196-20.017-26.47v-76.447c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v76.447c-9.152 2.597-16.373 9.818-18.97 18.97h-37.227c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5h37.227c3.274 11.538 13.897 20.018 26.47 20.018 7.924.001 15.072-3.37 20.097-8.749zm-20.098-6.25c-6.902 0-12.518-5.615-12.518-12.518 0-6.902 5.615-12.518 12.518-12.518 6.902 0 12.517 5.615 12.517 12.518.001 6.903-5.615 12.518-12.517 12.518z" />
                                                        <path
                                                          d="m449.643 248.486c4.13-.316 7.222-3.92 6.906-8.051-3.859-50.393-26.432-97.172-63.562-131.721-37.324-34.73-85.973-53.857-136.987-53.857-110.91 0-201.143 90.232-201.143 201.143s90.233 201.143 201.143 201.143c104.896 0 192.524-80.806 200.548-185.576.315-4.13-2.775-7.734-6.906-8.051-4.113-.309-7.734 2.775-8.051 6.906-7.407 96.738-88.318 171.721-185.591 171.721-102.64 0-186.143-83.503-186.143-186.143s83.503-186.143 186.143-186.143c47.208 0 92.229 17.7 126.769 49.839 34.362 31.974 55.253 75.26 58.822 121.885.317 4.128 3.907 7.228 8.052 6.905z" />
                                                        <path
                                                          d="m437.02 74.981c-48.352-48.353-112.639-74.981-181.02-74.981-49.143 0-96.883 13.964-138.061 40.384-3.486 2.237-4.499 6.876-2.262 10.363 2.237 3.485 6.875 4.498 10.363 2.262 38.755-24.866 83.695-38.009 129.96-38.009 64.374 0 124.894 25.068 170.413 70.587s70.587 106.039 70.587 170.413c0 133.193-107.788 241-241 241-23.803 0-47.345-3.476-69.972-10.329-3.965-1.202-8.152 1.038-9.352 5.004-1.201 3.964 1.039 8.15 5.003 9.352 24.039 7.281 49.044 10.973 74.321 10.973 141.484 0 256-114.497 256-256 0-68.38-26.629-132.667-74.98-181.019z" />
                                                        <path
                                                          d="m158.756 476.559c-87.328-38.561-143.756-125.136-143.756-220.559 0-72.108 31.911-139.843 87.55-185.839 3.192-2.639 3.641-7.366 1.001-10.559-2.638-3.191-7.365-3.64-10.559-1.002-59.097 48.855-92.992 120.804-92.992 197.4 0 101.36 59.937 193.321 152.696 234.282.985.435 2.014.641 3.026.641 2.88 0 5.626-1.668 6.865-4.473 1.673-3.789-.042-8.217-3.831-9.891z" />
                                                      </g>
                                                    </svg>
                                                  </div>
                                                  <p class="benefits__item-title">Скорость доставки</p>
                                                  <p class="benefits__item-text">Наши курьеры призёры пробега 24 часа Ле-Мана</p>
                                                </div>
                                              </div>
                                              <div class="benefits__item-wrapper benefits__item-wrapper-3 animated-item animated-no-hide">
                                                <div class="benefits__item">
                                                  <div class="benefits__item-icon">
                                                    <svg width="100" height="100" viewBox="0 -1 429.69021 429" xmlns="http://www.w3.org/2000/svg">
                                                      <path
                                                        d="m127.273438 185.078125-.015626.273437c-1.058593 18.542969 9.328126 35.914063 26.46875 44.242188l.175782.085938c6.042968 2.890624 10.996094 7.65625 14.121094 13.582031l.070312.128906c8.636719 16.445313 26.5 26.414063 45.542969 25.414063l.289062-.015626c6.90625-.386718 13.761719 1.394532 19.605469 5.097657 16.125 10.085937 36.59375 10.085937 52.71875 0 5.84375-3.703125 12.699219-5.484375 19.605469-5.097657l.289062.015626c19.011719 1.007812 36.898438-8.96875 45.554688-25.441407l.042969-.089843c3.136718-5.941407 8.101562-10.714844 14.164062-13.609376l.140625-.070312c17.140625-8.332031 27.53125-25.699219 26.46875-44.246094l-.015625-.257812c-.351562-6.53125 1.460938-12.996094 5.164062-18.390625 10.660157-15.546875 10.660157-36.046875.003907-51.597657-3.699219-5.390624-5.519531-11.851562-5.167969-18.382812l.015625-.273438c1.0625-18.546874-9.328125-35.914062-26.484375-44.25l-.15625-.078124c-6.03125-2.882813-10.972656-7.625-14.101562-13.535157l-.089844-.175781c-8.640625-16.445312-26.527344-26.410156-45.539063-25.414062l-.292969.015624c-6.902343.386719-13.757812-1.394531-19.597656-5.097656h-.007812c-16.125-10.085937-36.59375-10.085937-52.71875 0-5.84375 3.699219-12.699219 5.480469-19.605469 5.09375l-.289063-.015625c-19.015624-1.007812-36.898437 8.96875-45.535156 25.410157l-.066406.121093c-3.128906 5.9375-8.085938 10.707031-14.136719 13.601563l-.164062.078125c-17.140625 8.328125-27.53125 25.699219-26.46875 44.246093l.015625.257813c.351562 6.53125-1.460938 12.996094-5.164063 18.386719-10.660156 15.550781-10.660156 36.054687 0 51.601562 3.699219 5.390625 5.515625 11.855469 5.160157 18.386719zm8.007812-60.902344c5.714844-8.320312 8.515625-18.296875 7.96875-28.375l-.015625-.273437c-.5625-12.289063 6.335937-23.703125 17.472656-28.925782l.136719-.066406c9.136719-4.375 16.617188-11.578125 21.335938-20.539062l.078124-.148438c5.738282-10.929687 17.757813-17.554687 30.523438-16.875l.28125.011719c10.214844.574219 20.351562-2.058594 28.992188-7.535156 10.910156-6.824219 24.753906-6.824219 35.664062 0 8.640625 5.46875 18.777344 8.105469 28.988281 7.539062l.28125-.015625c12.828125-.671875 24.789063 5.945313 30.511719 16.84375l.105469.199219c4.71875 8.949219 12.191406 16.140625 21.316406 20.511719l.132813.066406c11.3125 5.5 18.179687 16.855469 17.488281 28.9375l-.015625.285156c-.546875 10.078125 2.257812 20.050782 7.972656 28.371094 6.90625 10.074219 6.902344 23.355469-.007812 33.425781-5.710938 8.324219-8.511719 18.300781-7.964844 28.378907l.015625.269531c.691406 12.082031-6.175781 23.441406-17.492188 28.945312l-.117187.054688c-9.144532 4.382812-16.632813 11.59375-21.355469 20.570312l-.058594.117188c-5.742187 10.929687-17.742187 17.558593-30.527343 16.875l-.277344-.015625c-10.214844-.570313-20.355469 2.066406-29 7.539062-10.90625 6.820313-24.75 6.820313-35.65625 0-7.859375-4.980468-16.976563-7.621094-26.28125-7.613281-.902344 0-1.808594.023437-2.714844.074219l-.28125.011718c-12.597656.800782-24.515625-5.792968-30.535156-16.890624l-.082032-.152344c-4.710937-8.945313-12.179687-16.132813-21.300781-20.503906l-.148437-.074219c-11.316406-5.5-18.183594-16.859375-17.488282-28.9375l.015626-.285157c.542968-10.078124-2.261719-20.054687-7.972657-28.371093-6.902343-10.074219-6.898437-23.355469.011719-33.421875zm0 0" />
                                                      <path
                                                        d="m208.269531 223.601562c3.746094 2.339844 8.679688 1.195313 11.019531-2.550781l94.769532-151.820312c1.546875-2.425781 1.675781-5.496094.332031-8.039063-1.34375-2.546875-3.953125-4.171875-6.828125-4.261718-2.875-.089844-5.578125 1.371093-7.078125 3.828124l-94.765625 151.820313c-2.339844 3.75-1.199219 8.683594 2.550781 11.023437zm0 0" />
                                                      <path
                                                        d="m216.761719 141.292969c19.480469 0 35.332031-18.074219 35.332031-40.289063s-15.851562-40.285156-35.332031-40.285156-35.328125 18.070312-35.328125 40.285156 15.847656 40.289063 35.328125 40.289063zm0-64.574219c10.660156 0 19.332031 10.894531 19.332031 24.285156s-8.671875 24.289063-19.332031 24.289063c-10.65625 0-19.328125-10.902344-19.328125-24.289063 0-13.386718 8.671875-24.285156 19.328125-24.285156zm0 0" />
                                                      <path
                                                        d="m267.683594 180.800781c0 22.214844 15.847656 40.285157 35.328125 40.285157s35.332031-18.074219 35.332031-40.285157c0-22.207031-15.847656-40.285156-35.328125-40.285156-19.484375 0-35.332031 18.066406-35.332031 40.285156zm54.660156 0c0 13.390625-8.671875 24.285157-19.332031 24.285157-10.65625 0-19.328125-10.894532-19.328125-24.285157s8.671875-24.285156 19.328125-24.285156c10.660156 0 19.332031 10.886719 19.332031 24.285156zm0 0" />
                                                      <path
                                                        d="m428.652344 313.644531c-10.59375-18.800781-34.085938-25.960937-53.363282-16.265625l-62.667968 29.609375c-8.652344-16.089843-25.25-26.332031-43.515625-26.847656l-57.851563-1.59375c-9.160156-.261719-18.148437-2.585937-26.292968-6.789063l-5.886719-3.050781c-30.140625-15.710937-66.066407-15.671875-96.175781.101563l.367187-13.335938c.121094-4.417968-3.359375-8.097656-7.777344-8.21875l-63.4375-1.746094c-4.417969-.121093-8.09375 3.359376-8.214843 7.777344l-3.83203175 139.214844c-.12109425 4.417969 3.35937475 8.097656 7.77734375 8.21875l63.4375 1.746094h.222656c4.332032-.003906 7.875-3.453125 7.996094-7.78125l.179688-6.660156 16.480468-8.824219c6.46875-3.480469 14.035156-4.308594 21.101563-2.308594l98.410156 27.621094c.171875.050781.34375.089843.519531.128906 7.113282 1.488281 14.363282 2.234375 21.632813 2.230469 15.390625.007812 30.601562-3.308594 44.589843-9.730469.34375-.15625.675782-.335937.992188-.539063l142.6875-92.300781c3.558594-2.296875 4.707031-6.972656 2.621094-10.65625zm-412.433594 91.296875 3.390625-123.214844 47.445313 1.304688-3.394532 123.21875zm258.921875-2.097656c-17.378906 7.84375-36.789063 10.007812-55.46875 6.1875l-98.148437-27.542969c-11.042969-3.125-22.871094-1.828125-32.976563 3.605469l-8.421875 4.507812 2.257812-81.925781c26.683594-17.75 60.910157-19.574219 89.332032-4.765625l5.886718 3.050782c10.289063 5.3125 21.640626 8.246093 33.214844 8.578124l57.851563 1.59375c16.25.464844 30.050781 12.035157 33.347656 27.957032l-86.171875-2.371094c-4.417969-.121094-8.09375 3.359375-8.214844 7.777344-.121094 4.417968 3.359375 8.097656 7.777344 8.21875l95.097656 2.617187h.226563c4.328125-.003906 7.871093-3.453125 7.992187-7.78125.097656-3.476562-.164062-6.957031-.773437-10.378906l64.265625-30.371094.1875-.089843c9.117187-4.617188 20.144531-3.074219 27.640625 3.867187zm0 0" />
                                                    </svg>
                                                  </div>
                                                  <p class="benefits__item-title">Гибкая система скидок</p>
                                                  <p class="benefits__item-text">Почти бесплатно, скидки в шабат и хануку</p>
                                                </div>
                                              </div>
                                            </div>
                                          </section>
                                          <section class="quote">
                                            <blockquote class="quote__text">
                                              <span class="quote__text-quote animated-item animated-no-hide">«Нет любви более искренней, чем любовь к
                                                еде»</span>
                                              <span class="quote__text-author animated-item animated-no-hide">Оскар Уайлд</span>
                                            </blockquote>
                                          </section>
                                          <section class="geo">
                                            <p class="geo__title">Где мы находимся ?</p>
                                            <p class="geo__address animated-item">г. Челябинск ул. Братьев Кашириных, д. 119</p>
                                            <div class="maps">
                                              <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2278.3311596482263!2d61.32577831607243!3d55.17747704368281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43c5931ecbc45479%3A0xf663f4906f596d4b!2z0YPQuy4g0JHRgNCw0YLRjNC10LIg0JrQsNGI0LjRgNC40L3Ri9GFLCAxMTcsINCn0LXQu9GP0LHQuNC90YHQuiwg0KfQtdC70Y_QsdC40L3RgdC60LDRjyDQvtCx0LsuLCA0NTQxMzY!5e0!3m2!1sru!2sru!4v1620237353676!5m2!1sru!2sru"
                                                width="100%" height="600" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                                            </div>
                                          </section>
                                        </div>`
        this._animationAllItemAfterScroll();
        // this.carousel();
    }
}

