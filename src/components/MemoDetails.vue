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
            <div v-if="!redo">
                <canvas ref="waveform" class="waveform"></canvas>
            </div>
            <div class="header">
                <div v-if="redo" class="input-field">
                    <label for="memoTitle">Title</label>
                    <input type="text" class="active" v-model="memo.title" id="memoTitle">
                </div>
                <div v-else>
                    <h2 class="title">{{memo.title}}</h2>
                </div>
            </div>
            <a class="btn-floating btn-large halfway-fab waves-effect waves-light pink" v-if="!redo"
               v-on:click="playMemo">
                <i class="material-icons" ref="playBtn">play_arrow</i>
            </a>
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
                redo: false,
                canvas: {},
                context: {}
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
            },
            fillProgress() {
                const percent = this.audio.currentTime / this.audio.duration;
                this.drawWave(percent, 0.8);

            },
            clearProgress(){
                this.drawWave(1, 0.2);
            },
            drawWave(percent, alpha) {
                if (this.context && this.canvas) {
                    this.context.clearRect(0, 0, this.canvas.width * percent, this.canvas.height);
                    this.context.save();

                    this.context.translate(0, this.canvas.height * 0.5);
                    this.context.beginPath();
                    this.context.globalAlpha = alpha;

                    let x, h = 0;

                    const memo = this.$props.memo;

                    for (let d = 0; d < Math.floor(memo.volumeData.length * percent); d++) {
                        x = (d / memo.volumeData.length) * this.canvas.width;

                        h = memo.volumeData[d] * this.canvas.maxHeight * 0.5;
                        h = Math.max(1, h);

                        this.context.lineTo(x, -h);
                    }

                    for (let d = Math.floor((memo.volumeData.length - 1) * percent); d >= 0; d--) {
                        x = (d / memo.volumeData.length) * this.canvas.width;
                        h = memo.volumeData[d] * this.canvas.maxHeight * 0.5;
                        h = Math.max(1, h);
                        this.context.lineTo(x, h);
                    }

                    this.context.closePath();
                    this.context.fill();
                    this.context.restore();
                }

            },
            initCanvas() {
                const canvas = this.$refs.waveform;
                const dPR = window.devicePixelRatio || 1;

                this.canvas.width = canvas.parentElement.offsetWidth * dPR;
                this.canvas.height = canvas.parentElement.offsetHeight * dPR;

                canvas.style.width = this.canvas.width + 'px';
                canvas.style.height = this.canvas.height + 'px';

                this.context = canvas.getContext("2d");
                this.context.scale(dPR, dPR);

                const padding = 50;
                this.canvas.maxHeight = this.canvas.height - (2 * padding);

                this.drawWave(1, 0.2);
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
                const playBtn = this.$refs.playBtn;

                this.audio.addEventListener('ended', () => {
                    playBtn.innerHTML = "play_arrow";
                    requestAnimationFrame(this.clearProgress);

                });
                this.audio.addEventListener('timeupdate', () => {
                    requestAnimationFrame(this.fillProgress);
                });

                link.href = memo.url;
                link.download = memo.title + ".wav";
                this.$refs.details.appendChild(this.audio);
                this.initCanvas();
            }
        }
    }
</script>

<style scoped>
    .waveform {
        width: 100%;
        height: 150px;
    }

    .card-image {
        font-size: 18px;
        color: var(--color) !important;
        background: var(--dark-color);
        padding: 20px;
        height: 288px;
        position: relative;
    }

    .card .title {
        font-weight: bold;
        font-size: 30px;
        /*line-height: 60px;*/
    }

    /*.btn-floating{*/
    /*right: 0!important;*/
    /*}*/

    .card {
        margin-bottom: 0 !important;
        min-width: 450px;
        max-width: 800px;
        margin-left: 8px;
    }

    .header {
        position: absolute;
        left: 20px;
        bottom: 2px;

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

    .icon-group i:not(:last-child) {
        margin-right: 25px;
    }

    .icons i:hover {
        color: white;
    }

    .icons .icon {
        width: fit-content;
    }

</style>
