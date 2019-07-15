<template>

    <ul class="collection" v-if="memos && memos.length>0">
        <li v-for="(m, idx) in memos" v-bind:key="idx" class="collection-item"
            v-on:click="openDetails($event, idx)">
            <Memo v-bind:memo="m"/>
        </li>
    </ul>
</template>

<script>
    import Memo from "./Memo"

    export default {
        name: 'HelloWorld',
        components: {
            Memo
        },
        props: ["memos"],
        methods: {
            openDetails(e, idx) {
                this.$emit("openDetails", idx)
            }
        }
    }
</script>

<style scoped>
    .collection {
        box-shadow: 0 0 2px rgba(0, 0, 0, .12), 0 2px 4px rgba(0, 0, 0, .24);
    }


    .collection-item:hover {
        background: rgba(0, 0, 0, .1);
        cursor: pointer;
    }

</style>
