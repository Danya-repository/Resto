$(function () {

    headerSearchToggle = function () {
        
        let headerSearchOpenBtn = document.querySelector('.header__search-open-btn');
        let headerSearchForm = document.querySelector('.header__search-form');

        return headerSearchOpenBtn.addEventListener('click', function (event) {
            event.preventDefault;

            if (headerSearchForm.classList.contains('header__search-form-disable')) {
                headerSearchOpenBtn.classList.add('header__search-open-btn--active');
                headerSearchForm.classList.remove('header__search-form-disable');

            }
            else {
                headerSearchOpenBtn.classList.remove('header__search-open-btn--active');
                headerSearchForm.classList.add('header__search-form-disable');
            }
        });
    }();
    

    headerBasketOrderToggle = function () {
        
        let basketBtn = document.querySelector('.user-panel__btn.user-panel__basket');
        let cancelBtn = document.querySelector('.order-panel__close-btn');
        let orderPanel = document.querySelector('.order-panel');
        

        return function () {
            
            basketBtn.addEventListener('click', function (event) {
                console.log('hello')
                event.preventDefault;
                orderPanel.classList.add('order-panel--active');
            });

            cancelBtn.addEventListener('click', function (event) {
                console.log('hello')
                event.preventDefault;
                orderPanel.classList.remove('order-panel--active');
            });


        }();
    }();
    
});