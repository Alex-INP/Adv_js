const API_URL = 'http://localhost:3000/api/v1/';

function send(onError, onSuccess, url, method = 'GET', data = '', args = {}, headers = {}, timeout = 60000) {
 
  let xhr;

  if (window.XMLHttpRequest) {
    // Chrome, Mozilla, Opera, Safari
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) { 
    // Internet Explorer
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  for([key, value] of Object.entries(headers)) {
    xhr.setRequestHeader(key, value)
  }

  xhr.timeout = timeout; 

  xhr.ontimeout = onError;

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if(xhr.status < 400) {
        onSuccess(xhr.responseText, args)
      } else if (xhr.status >= 400) {
        onError(xhr.status)
      }
    }
  }

  xhr.open(method, url, true);

  xhr.send(data);
}

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

  getPrice() {
    return this.good.price * this.count
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

  onSuccessCartRemove(response, args) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == args.id)

    if(idx >= 0) {
      this.list[idx].remove()

      if(this.list[idx].getCount() <= 0) {
        this.list.splice(idx, 1)
      }
    } 
  }

  _onError(err) {
    console.log(err);
  }

  remove(id) {
    let data = `{"id":"${id}}"}`
    let args = {"id": id}
    send(this._onError, this.onSuccessCartRemove.bind(this), `${API_URL}showcase`, "GET", data, args) 

  }
}

class Showcase {
  constructor(cart){
    this.list = [];
    this.cart = cart;
  }

  _onSuccess(response) {
    const data = JSON.parse(response)
    data.forEach(product => {
      this.list.push(
        new Good({id: product.id, title:product.title, price:product.price})
      )
    });
  }

  _onError(err) {
    console.log(err);
  }

  fetchGoods() {
    send(this._onError, this._onSuccess.bind(this), `${API_URL}showcase`)
  }

  onSuccessCartadd(response, args){
    const idx = this.list.findIndex((good) => args.id == good.id)

    if(idx >= 0) {
      this.cart.add(this.list[idx])
    }
  }

  addToCart(id) {
    let data = `{"id":"${id}}"}`
    let args = {"id": id}
    send(this._onError, this.onSuccessCartadd.bind(this), `${API_URL}cart`, "GET", data, args)
  }
}


const cart = new Cart()
const showcase = new Showcase(cart)

showcase.fetchGoods();

setTimeout(() => {
  showcase.addToCart(1)
  showcase.addToCart(1)
  showcase.addToCart(1)
  showcase.addToCart(3)

  cart.remove(1)


  console.log(showcase, cart)
}, 1000)

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

setTimeout(() => {
  const goodsRenderer = new ShowcaseRender(showcase.list);
  goodsRenderer.renderGoods();
}, 1500)



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
      send(this._onError, this.onSuccessCartRender.bind(this), `${API_URL}cart`)
    }

    onSuccessCartRender(){
      document.querySelector("main").insertAdjacentHTML("afterbegin", this.tableHtml)
    }

    _onError(err) {
      console.log(err);
    }
} 


setTimeout(() => {
  const cartRenderer = new CartRender(cart.list)
  cartRenderer.createTableHtml()
  document.querySelector(".cart-button").addEventListener("click", () => cartRenderer.renderCart())
}, 1600)


