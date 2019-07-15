<template>
    <div class="row">
        <div class="col s10">
            <span class="memo-title">{{memo.title}}</span>
        </div>
        <div class="col s2">
            <span class="memo-date">{{formatTime(memo.updatedAt)}}</span>
        </div>
    </div>
</template>

<script>
    import moment from "moment"

    export default {
        name: "Memo",
        props: ["memo"],
        methods: {
            formatTime(time) {
                return moment(time).fromNow()
            }
        }
    }
</script>

<style scoped>
    .memo-title {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(50%);
        font-size: 16px;
        color: gray;
    }

    .memo-date {
        vertical-align: top;
        color: gray;
        font-size: 12px;
    }

    .row{
        position: relative;
    }
    .col.s10{
        position: relative;
        height: 100%;
    }
    .col.s2{
        text-align: end;
    }
</style>
