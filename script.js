function getCounter() {
    let last = 0;
  
    return () => ++last;
  }
  
  const stackIDGenrator = getCounter()
  
  
  class Good {
    constructor({id, title, price}) {
      this.id = id;
      this.title = title;
      this.price = price;
    }
  
    getId() {
      return this.id;
    }
  
    getPrice() {
      return this.price;
    }
  
    getTitle() {
      return this.title;
    }
  }
  
  class GoodStack {
    constructor(good) {
      this.id = stackIDGenrator();
      this.good = good;
      this.count = 1;
    }
  
    getGoodId() {
      return this.good.id
    }
  
    getGood(){
      return this.good;
    }
  
    getCount() {
      return this.count;
    }
  
    add() {
      this.count++;
      return this.count;
    }
  
    remove() {
      this.count--;
      return this.count;
    }
  }
  
  class Cart {
    constructor(){
      this.list = []
    }
  
    add(good) {
      const idx = this.list.findIndex((stack) => stack.getGoodId() == good.id)
  
      if(idx >= 0) {
        this.list[idx].add()
      } else {
        this.list.push(new GoodStack(good))
      }
  
    }
  
    remove(id) {
      const idx = this.list.findIndex((stack) => stack.getGoodId() == id)
  
      if(idx >= 0) {
        this.list[idx].remove()
  
        if(this.list[idx].getCount() <= 0) {
          this.list.splice(idx, 1)
        }
      } 
  
    }
  }
  
  class Showcase {
    constructor(cart){
      this.list = [];
      this.cart = cart;
    }
  
    fetchGoods() {
      this.list = [
        new Good({id: 1, title: 'Футболка', price: 140}),
        new Good({id: 2, title: 'Брюки', price: 320}),
        new Good({id: 3, title: 'Галстук', price: 24})
      ]
    }
  
    addToCart(id) {
      const idx = this.list.findIndex((good) => id == good.id)
  
      if(idx >= 0) {
        this.cart.add(this.list[idx])
      }
    }
  }
  
  
  const cart = new Cart()
  const showcase = new Showcase(cart)
  
  showcase.fetchGoods();
  
  showcase.addToCart(1)
  showcase.addToCart(1)
  showcase.addToCart(1)
  showcase.addToCart(3)
  
  cart.remove(1)
  
  
  console.log(showcase, cart)

// ------------------------------------------------------------------------------------

class ShowcaseRender {
    constructor(allGoods){
        this.allGoods = allGoods;
        this.el_goodList = document.querySelector(".goods-list");
    }

    renderGoods(){
        let renderedGoods = this.allGoods.map((good) => {
            return `<div class="goods-item"><h3>${good.title}</h3><p>${good.price} $</p></div>`;
        }).join("")

        this.el_goodList.insertAdjacentHTML("beforeend", renderedGoods)
    }
}

const goodsRenderer = new ShowcaseRender(showcase.list);
goodsRenderer.renderGoods();


class CartRender {
    constructor(cartGoodList) {
        this.cartGoodList = cartGoodList;
        this.tableHtml
    }

    createTableHtml(){
        let tableContentHtml = this.cartGoodList.map((good_stack) => {
            return `<tr><td>${good_stack.good.title}</td><td>${good_stack.count}</td><td>${good_stack.good.price}</td></tr>`;
        }).join("");
        this.tableHtml = `<table class="cart-table"><tr class="table-heder"><td>Название</td><td>Количество</td><td>Цена</td></tr>${tableContentHtml}</table>`
    }

    renderCart(){
        document.querySelector("main").insertAdjacentHTML("afterbegin", this.tableHtml)
        console.log("TRIG")
    }
} 

const cartRenderer = new CartRender(cart.list)
cartRenderer.createTableHtml()
document.querySelector(".cart-button").addEventListener("click", () => cartRenderer.renderCart())
