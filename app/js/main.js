$(function () {

    const simpleBar = new SimpleBar(document.querySelector('body'));

    new Header(simpleBar)
    new BasketButton();
    new Basket();
    new IndexPage(simpleBar).init();


    // indexPage;

    // const footer = new Footer()

});
