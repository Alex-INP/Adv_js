Vue.component("card",
{
    template: 
    `<div class="goods-item">
        <h3>{{ good.title }}</h3>
        <p>{{ good.price }} $</p>
        <button v-on:click="addToCart(good.id, good.title, good.price)" :data-id="good.id">Купить</button>
    </div>`,
    props: ["good"],
    methods:{
        addToCart(id, title, price){
            this.$emit("cart-add", {id:id, title:title, price:price, count:1})

        }
    }
})