<template>
  <div class="home">
    <div v-if="isContentVisible">
      <header class="header">
        <search></search>
        <button v-on:click="showCart" class="cart-button" type="button">Корзина</button>
      </header>
      <main>
        <cart v-if="isCartVisible" :cart_goods="cart" v-on:cart-close="showCart"></cart>
        <showcase></showcase>
      </main>
    </div> 
    <serverError v-else></serverError>
    
  </div>
</template>

<script>

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
      isCartVisible: false,
    }
  },
  computed:{
    isContentVisible(){
      return this.$store.getters.getContentVisibility
      }
  },
  methods:{
    showCart(){
      this.isCartVisible = !this.isCartVisible
    },
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
