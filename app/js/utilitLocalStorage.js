class LocalStorageUtil {

    constructor() {
      this.key = 'products';
    }
  
    getProducts() {
      const productsLocalStorage = localStorage.getItem(this.key)
  
      if (productsLocalStorage !== null) {
        return JSON.parse(productsLocalStorage)
      }
      else {
        return {};
      }
    }
  
    putProducts(id, {type, price, name, weight, imgUrl, classInstanceName}) {

      let listProductsFromLocalStorage = this.getProducts();
      let ordered = false;
      let availableInLocalStorage = id in listProductsFromLocalStorage;
  
      if (availableInLocalStorage === true) {
          
        delete listProductsFromLocalStorage[id]
  
      } else if (availableInLocalStorage === false) {
          
        listProductsFromLocalStorage[id] = {type, price, name, weight, imgUrl, classInstanceName, count: 1}
        ordered = true;
      }
    
      localStorage.setItem(this.key, JSON.stringify(listProductsFromLocalStorage))
  
      return {ordered, listProductsFromLocalStorage}
    }
  }
  
  const localStorageUtil = new LocalStorageUtil();