<template>
    <div class="goods-list">
        <card v-on:cart-add="passEmit" v-for="card of card_list" :good=card v-bind:key="card.id"></card>
    </div>
</template>

<script>
import card from "./card.vue"

export default {
    name: "showcase",
    components: {
        card
    },
    props: ["card_list"],
    methods:{
        passEmit(good){
            this.$emit("cart-add", good)
        }
    }
}
</script>

<style scoped>
    .goods-list{
        display: flex;
        justify-content: space-around;
        background-color: rgb(221, 221, 221);
    }
</style>