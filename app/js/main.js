$(function () {

    const simpleBar = new SimpleBar(document.querySelector('body'));

    new Header(simpleBar)
    new Footer();
    new BasketButton();
    new Basket();
    new IndexPage(simpleBar);

});
