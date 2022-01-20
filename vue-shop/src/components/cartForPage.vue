<template>
    <table class="cart-table">
        <tr class="table-header">
            <td>Название</td>
            <td>Количество</td>
            <td>Цена</td>
        </tr>
        <tr v-for="good of cart_goods" v-bind:key="good.id">
            <td>{{ good.title }}</td>
            <td>{{ good.count }}</td>
            <td>{{ good.price }}</td>
            <button v-on:click="onDelete(good.id, goodtitle, good.price)" :data-id="good.id">Удалить</button>
        </tr>
    </table>
</template>

<script>
export default {
    name:"cartForPage",
    methods:{
        onDelete(id, title, price){
            this.$store.dispatch("deleteFromCart", {id:id, title:title, price:price})
        }
    },
    computed:{
        cart_goods(){
            return this.$store.getters.getCart
        }
    }
}
</script>

<style scoped>
    .cart-table {
        border: black 3px solid;
        border-collapse: collapse;
        background-color: white;
    }
    .cart-table td {
        padding: 5px;
        text-align: center;
        width: 100%;
        border-top: black 1px solid;
        border-bottom: black 1px solid;
    }

    .table-header > td {
        border: black 3px solid;
    }
</style>
