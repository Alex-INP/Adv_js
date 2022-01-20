<template>
    <div>
        <input v-model="searchString"/>
        <button v-on:click="searchGoods">Поиск</button>
    </div>
</template>

<script>
export default {
    name: "search",
    computed: {
        searchString: {
            get() {return this.$store.getSearchString},
            set(value) { this.$store.commit("setSearchString", value) }
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