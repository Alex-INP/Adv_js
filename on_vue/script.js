const API_URL = 'http://localhost:3000/api/v1';


new Vue({
  el: "#app",
  data:{
    showcase: [],
    cart: [],
    isCartVisible: false   
  },
  methods:{
    showCart(){
      this.isCartVisible = !this.isCartVisible
    },
    addToCart(good){
      let idx = this.cart.findIndex((element) => element.id == good.id)
      if(idx >= 0) {
        ++this.cart[idx].count
      } else {
        this.cart.push(good)
      }
      fetch(`${API_URL}/cart`, {
        method:"post",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(this.cart)
      })
    },
    deleteFromCart(id){
      let idx = this.cart.findIndex((element) => element.id == id)
      if(this.cart[idx].count > 1){
        --this.cart[idx].count
      } else {
        this.cart.splice(idx, 1)
      }
      fetch(`${API_URL}/cart`, {
        method:"delete",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(this.cart)
      })
    },
  },
  mounted(){
    fetch(`${API_URL}/showcase`)
    .then((res) => res.json())
    .then((data) => this.showcase = data)

    fetch(`${API_URL}/cart`)
    .then((res) => res.json())
    .then((data) => this.cart = data)
  }
})