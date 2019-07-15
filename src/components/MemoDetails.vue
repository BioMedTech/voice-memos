<template>
    <div class="card" ref="details">
        <div class="card-image">
            <div class="icons">
                <div class="icon">
                    <i class="material-icons" v-if="memo.updatedAt && redo" v-on:click="redoMode">arrow_back</i>
                    <i class="material-icons" v-else v-on:click="closeDetails">close</i>
                </div>
                <div class="icon">
                    <i class="material-icons" v-if="redo && !memo.updatedAt" v-on:click="saveMemo">check</i>
                    <div class="icon-group" v-else-if="!redo">
                        <i class="material-icons" v-on:click="deleteMemo($event, memo)">delete</i>
                        <i class="material-icons" v-on:click="redoMode">mode_edit</i>
                        <a href="#" ref="downloadLink"><i class="material-icons">file_download</i></a>
                    </div>
                </div>
            </div>
            <div class="header">
                <div v-if="redo" class="input-field">
                    <label for="memoTitle">Title</label>
                    <input type="text" class="active" v-model="memo.title" id="memoTitle">
                </div>
                <div v-else>
                    <h2 class="title">{{memo.title}}</h2>
                    <a class="btn-floating btn-large halfway-fab waves-effect waves-light pink" v-on:click="playMemo"><i
                            class="material-icons" ref="playBtn">play_arrow</i></a>
                </div>
            </div>
        </div>

        <div class="card-content">
            <div v-if="redo" class="input-field">
                <label for="memoDescr">Description</label>
                <input type="text" class="active" v-model="memo.description" id="memoDescr">
            </div>
            <div v-else>
                <p class="helper-text">Description</p>
                <p>{{memo.description?memo.description:"No description"}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import M from "materialize-css/dist/js/materialize"

    export default {
        name: "MemoDetails",
        props: ["memo"],
        data() {
            return {
                audio: {},
                redo: false
            }
        },
        methods: {
            closeDetails() {
                this.$emit("close")
            },
            saveMemo() {
                this.$emit("save")
            },
            redoMode() {
                this.redo = !this.redo;
                M.updateTextFields();
            },
            deleteMemo(e, obj) {
                this.$emit("close");
                this.$emit("delete", obj)
            },
            playMemo(e) {
                e.preventDefault();
                const playBtn = this.$refs.playBtn;
                if (this.audio.paused) {
                    this.audio.play();
                    playBtn.innerHTML = "pause";
                } else {
                    this.audio.pause();
                    playBtn.innerHTML = "play_arrow";
                }

            }
        },
        mounted() {
            M.updateTextFields();
            this.redo = !this.$props.memo.updatedAt;
            if (!this.redo) {
                const link = this.$refs.downloadLink;
                const memo = this.$props.memo;

                this.audio = document.createElement('audio');
                this.audio.src = memo.url;

                link.href = memo.url;
                link.download = memo.title + ".wav";
                this.$refs.details.appendChild(this.audio);
            }
        }
    }
</script>

<style scoped>
    .card-image {
        font-size: 18px;
        color: var(--color) !important;
        background: var(--dark-color);
        padding: 20px;
        height: 220px;
    }

    .card .title {
        font-weight: bold;
        font-size: 30px;
        line-height: 60px;
    }

    .card {
        margin-bottom: 0 !important;
        min-width: 500px;
        margin-left: 8px
    }

    .header {
        margin-top: 100px;
    }

    .icons {
        display: flex;
        justify-content: space-between;
    }

    label {
        font-size: 25px !important;
    }

    input#memoTitle {
        color: white !important;
        font-size: 30px !important;
    }

    .helper-text {
        color: gray;
        margin-bottom: 20px !important;
        font-size: 14px;
        font-weight: bold;
    }

    .icons i {
        cursor: pointer;
        color: lightgray;
    }

    .icon-group i {
        margin: 0 20px;
    }

    .icons i:hover {
        color: white;
    }

    .icons .icon {
        width: fit-content;
    }

</style>
