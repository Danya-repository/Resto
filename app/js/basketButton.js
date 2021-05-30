class BasketButton {

    render() {
      const place = document.querySelector('.user-panel__basket-count-wrapper')
      let count = Object.keys(localStorageUtil.getProducts()).length
  
      let html = `<p class="user-panel__basket-count">${count}</p>`
  
      if (count > 0) {
        place.innerHTML = html;
      }
      else {
        place.innerHTML = ``;
      }
  
    }
  }
  
const basketButton = new BasketButton();
basketButton.render();