<template>
  <div class="home">
    <div v-if="isContentVisible">
      <header class="header">
        <search></search>
        <button v-on:click="showCart" class="cart-button" type="button">Корзина</button>
      </header>
      <main>
        <cart v-if="isCartVisible" :cart_goods="cart" v-on:cart-close="showCart" v-on:delete-good="deleteFromCart"></cart>
        <showcase :card_list="showcase" v-on:cart-add="addToCart"></showcase>
      </main>
    </div> 
    <serverError v-else></serverError>
    
  </div>
</template>

<script>
const API_URL = 'http://localhost:3000/api/v1';

import cart from "../components/cart.vue"
import showcase from "../components/showcase.vue"
import search from "../components/search.vue"
import serverError from '../components/serverError.vue';

export default {
  name: 'Home',
  components: {
    cart,
    showcase,
    search,
    serverError
  },
  data() {
    return {
      showcase: [],
      cart: [],
      isCartVisible: false,
      isContentVisible: true  
    }
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
    .catch(() => this.isContentVisible = false)

    fetch(`${API_URL}/cart`)
    .then((res) => res.json())
    .then((data) => this.cart = data)
    .catch(() => this.isContentVisible = false)
  },
}
</script>

<style scoped>
  .html, body {
      margin: 0;
      padding: 0;
  }

  .header {
      background-color: rgb(171, 175, 228);
      height: 50px;
      display: flex;
      justify-content: flex-end;
  }

  .cart-button{
      background-color: rgb(205, 231, 231);
      height: 30px;
      width: 150px;
      margin-top: auto;
      margin-bottom: auto;
      margin-right: 50px; 
      border-radius: 20px;
  }
</style>
