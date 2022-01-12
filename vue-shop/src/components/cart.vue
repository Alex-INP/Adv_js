<template>
    <table class="cart-table">
        <button v-on:click="onClick">Закрыть</button>
        <tr class="table-header">
            <td>Название</td>
            <td>Количество</td>
            <td>Цена</td>
        </tr>
        <tr v-for="good of cart_goods" v-bind:key="good.id">
            <td>{{ good.title }}</td>
            <td>{{ good.count }}</td>
            <td>{{ good.price }}</td>
            <button v-on:click="$emit('delete-good', good.id)" :data-id="good.id">Удалить</button>
        </tr>
    </table>
</template>

<script>
export default {
    name:"cart",
    props: ["cart_goods"],
    methods:{
        onClick(){
            this.$emit("cart-close")
        },
    }
}
</script>

<style scoped>
    .cart-table {
        border: black 3px solid;
        border-collapse: collapse;
        background-color: white;
        position: absolute;
        right: 10px;
        z-index: 1;
    }
    .cart-table td {
        padding: 5px;
        text-align: center;
        width: 100px;
        border-top: black 1px solid;
        border-bottom: black 1px solid;
    }

    .table-header > td {
        border: black 3px solid;
    }
</style>
