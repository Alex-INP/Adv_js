Vue.component("showcase",
{
    template: 
    `<div class="goods-list">
        <card v-on:cart-add="passEmit" v-for="card of card_list" :good=card></card>
    </div>`,
    props: ["card_list"],
    methods:{
        passEmit(good){
            this.$emit("cart-add", good)
        }
    }
    
})