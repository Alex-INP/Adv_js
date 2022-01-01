Vue.component("cart",
{
    template: 
    `<table class="cart-table">
        <button v-on:click="onClick">Закрыть</button>
        <tr class="table-heder">
            <td>Название</td>
            <td>Количество</td>
            <td>Цена</td>
        </tr>
        <tr v-for="good of cart_goods">
            <td>{{ good.title }}</td>
            <td>{{ good.count }}</td>
            <td>{{ good.price }}</td>
            <button v-on:click="$emit('delete-good', good.id)" :data-id="good.id">Удалить</button>
        </tr>
    </table>`,
    props: ["cart_goods"],
    methods:{
        onClick(){
            this.$emit("cart-close")
        },
    }
})