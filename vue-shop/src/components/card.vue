<template>
    <div class="goods-item">
        <h3>{{ good.title }}</h3>
        <p>{{ good.price }} $</p>
        <button v-on:click="addToCart(good.id, good.title, good.price)" :data-id="good.id">Купить</button>
    </div>
</template>

<script>
export default {
    name: "card",
    props: ["good"],
    methods:{
        addToCart(id, title, price){
            this.$store.dispatch("addToCart", {id:id, title:title, price:price, count:1})
            /* this.$emit("cart-add", {id:id, title:title, price:price, count:1}) */

        }
    }
}
</script>

<style scoped>
    .goods-item {
        margin-top: 20px;
        margin-bottom: 20px;
        height: 400px;
        width: 250px;
        border: black 3px solid;
        background-color: rgb(205, 231, 231);
    }
</style>