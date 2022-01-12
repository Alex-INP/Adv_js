<template>
    <div>
        <input v-on:change="changeInputData"/>
        <button v-on:click="searchGoods">Поиск</button>
    </div>
</template>

<script>
export default {
    name: "search",
    props: [],
    methods: {
        searchGoods() {

        },
        changeInputData() {
            console.log(document.querySelector("input").value)
        }
    }
}
</script>

<style scoped>
    div {
        margin-top: 15px;
        margin-right: 5px;
    }
    button {
        margin-left: 5px;
        margin-right: 50px;
        background-color: rgb(205, 231, 231);
        border-radius: 20px;
    }
</style>