class BasketButton {

    constructor() {
      this.place = '.user-panel__basket-count-wrapper';

      this.render = this.render.bind(this);
      this.getProductsFromLocalStorage = this.getProductsFromLocalStorage.bind(this);

      this.render()
    }

    render() {
      const place = document.querySelector(this.place)
      let count = Object.keys(this.getProductsFromLocalStorage()).length
  
      let html = `<p class="user-panel__basket-count">${count}</p>`
  
      if (count > 0) {
        place.innerHTML = html;
      }
      else {
        place.innerHTML = ``;
      }  
    }

    getProductsFromLocalStorage() {
      const productsLocalStorage = localStorage.getItem('products')

      if (productsLocalStorage !== null) {
          return JSON.parse(productsLocalStorage)
      }
      else {
          return {};
      }
    }
  }
  
