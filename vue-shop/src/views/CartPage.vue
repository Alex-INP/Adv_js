<template>
  <div class="home">
      <header class="header">Корзина</header>
      <main>
        <cart :cart_goods="cart" v-on:cart-close="showCart"></cart>
      </main>
  </div>
</template>

<script>

import cart from "../components/cartForPage.vue"

export default {
  name: 'CartPage',
  components: {
    cart,
  },
  data() {  
  },
  computed:{
  },
  methods:{
    
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
      text-align: center;
      font-size: 40px;
  }
</style>
