<template>
    <div id="app">
        <nav>
            <div class="nav-wrapper">
                <div class="container">
                    <h2>Voice Memos</h2>
                </div>
            </div>
        </nav>
        <div class="content">
            <div class="container">
                <Memos v-bind:memos="memos" v-on:openDetails="openDetails"/>
                <a class="btn-floating btn-large waves-effect waves-light pink" v-on:click="openModal"><i
                        class="material-icons">add</i></a>
                <transition name="slide-fade">
                    <MemoCard class="memoCard"
                              v-if="openedMemo"
                              v-on:close="closeDetails"
                              v-on:save="saveMemo"
                              v-on:delete="deleteMemo"
                              v-bind:memo="openedMemo"/>
                </transition>
            </div>
        </div>
        <div id="modal1" class="modal mx-auto vertical-center" ref="modal">
            <div class="modal-header pt-3">
                Record a new memo
            </div>
            <div class="modal-content">
                <div class="micro-img">
                    <canvas ref="canvas" class="record-view__volume-readout js-volume-readout"></canvas>
                </div>
                <button class="btn btn-large mt-5" v-on:click="startRecording" ref="recordBtn">
                </button>
                <div class="modal-footer mt-5">
                    <a href="#" class="ml-auto" v-on:click="closeModal">Close</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Memos from './components/Memos'
    import MemoCard from './components/MemoDetails'
    import M from "materialize-css/dist/js/materialize"
    import MediaRecording from "./components/Recorder.js"

    export default {
        name: 'app',
        components: {
            Memos,
            MemoCard
        },
        data() {
            return {
                modalRef: {},
                recording: false,
                openedMemo: null,
                memos: [],
                updating: false,
                volumeReadoutCtx: {},
                mediaRecording: {}
            }
        },
        methods: {
            openModal() {
                this.modalRef.open();
            },
            closeModal() {
                if (this.mediaRecording) {
                    this.mediaRecording.stop(true);
                }
                this.modalRef.close();
            },
            openDetails(idx) {
                this.updating = true;
                this.openedMemo = this.memos[idx];
            },
            closeDetails() {
                this.openedMemo = null;
            },
            saveMemo() {
                this.openedMemo.updatedAt = new Date();

                if (!this.updating) {
                    this.memos.push(this.openedMemo);
                    this.openedMemo = null;
                }
            },
            deleteMemo(memo) {
                const idx = this.memos.indexOf(memo);
                this.memos.splice(idx, 1)
            },

            drawVolumeReadout(volume = 0) {
                this.volumeReadoutCtx.save();
                this.volumeReadoutCtx.clearRect(0, 0, 4, 67);
                this.volumeReadoutCtx.translate(0, 63);

                let fillStyle;
                for (let v = 0; v < 10; v++) {

                    fillStyle = '#D8D8D8';
                    if (v < volume)
                        fillStyle = '#673AB7';

                    this.volumeReadoutCtx.fillStyle = fillStyle;
                    this.volumeReadoutCtx.beginPath();
                    this.volumeReadoutCtx.arc(2, 2, 2, 0, Math.PI * 2);
                    this.volumeReadoutCtx.closePath();
                    this.volumeReadoutCtx.fill();
                    this.volumeReadoutCtx.translate(0, -7);
                }

                this.volumeReadoutCtx.restore();
            },

            startRecording() {
                if (this.recording) {
                    this.mediaRecording.stop();
                    return;
                }

                let volumeData = [];
                let volumeMax = 1;
                let volumeSum = 0;

                this.recording = true;
                this.$refs.recordBtn.classList.add("record");

                this.mediaRecording = new MediaRecording();

                this.mediaRecording.complete.then(audioData => {
                    if (audioData === null)
                        return;

                    this.closeModal();
                    // Normalize volume data
                    for (let d = 0; d < volumeData.length; d++) {
                        volumeData[d] /= volumeMax;
                    }
                    console.log(audioData, volumeData);
                    this.openedMemo = {
                        title: "Untitled Memo",
                        description: "",
                        url: new Blob([audioData], {type: 'audio/wav'}),
                        volumeData: volumeData
                    };

                    this.mediaRecording.analyser.then(analyser => {
                        this.$refs.recordBtn.classList.remove("record");
                        let analyserDataSize = 256;
                        let analyserStart = 32;
                        let analyserEnd = analyserDataSize;
                        let analyserDataRange = analyserEnd - analyserStart;
                        let analyserData = new Uint8Array(analyserDataSize);

                        analyser.fftSize = analyserDataSize;
                        analyser.smoothingTimeConstant = 0.3;

                        let trackAudioVolume = () => {
                            volumeSum = 0;
                            analyser.getByteFrequencyData(analyserData);

                            for (let i = analyserStart; i < analyserEnd; i++) {
                                volumeSum += analyserData[i];
                            }

                            let volume = volumeSum / analyserDataRange;
                            if (volume > volumeMax)
                                volumeMax = volume;

                            volumeData.push(volume);
                            this.drawVolumeReadout(volume / 10);

                            if (!this.recording) {
                                this.drawVolumeReadout();
                                return;
                            }

                            requestAnimationFrame(trackAudioVolume);
                        };

                        requestAnimationFrame(trackAudioVolume);
                    });

                })
            },

            toggleRecording() {
                const recordBtn = this.$refs.recordBtn;

                if (!this.recording) {
                    recordBtn.classList.add("record");
                    this.rec = new Recorder({
                        encoderPath: "./waveWorker.min.js"
                    });
                    this.stream = new MediaStream();
                    const audioCtx = new AudioContext();
                    const listener = audioCtx.createAnalyser();
                    this.sourceNode.connect(listener);

                    this.rec.start();
                } else {
                    this.rec.stop();
                    this.creating = true;
                }


                this.rec.ondataavailable = (typedArray) => {
                    recordBtn.classList.remove("record");
                    if (this.creating) {
                        const dataBlob = new Blob([typedArray], {type: 'audio/wav'});
                        const url = URL.createObjectURL(dataBlob);

                        this.closeModal();
                        this.updating = false;

                        this.openedMemo = {
                            title: "Untitled Memo",
                            description: "",
                            url
                        }
                    }
                };

                this.recording = !this.recording;
            }
        },
        mounted() {
            this.modalRef = M.Modal.init(this.$refs.modal, {});
            this.volumeReadoutCtx = this.$refs.canvas.getContext('2d');
        }
    }
</script>

<style scoped>
    #app {
        color: #2c3e50;
        height: 100vh;
        overflow: hidden;
    }

    .memoCard {
        position: absolute;
        bottom: 0;
        right: 20px;
        z-index: 2;
        height: 93vh;
        transition: all 233ms cubic-bezier(0, 0, .21, 1) 40ms, opacity 233ms cubic-bezier(0, 0, .21, 1) 123ms;
    }

    nav {
        height: 15vh;
        padding-top: 10px;
        background: var(--background-color);
        color: var(--color);
        font-weight: bold;
        vertical-align: bottom;
    }

    nav h2 {
        font-size: 35px;
        line-height: 110px;
    }

    .content {
        height: 85vh;
        position: relative;
    }

    .container {
        position: relative;
        height: 100%;
    }

    .btn-floating {
        position: absolute;
        bottom: 20px;
        right: 0;
    }

    .modal-header {
        background: var(--dark-color);
        height: 30px;
        color: var(--color);
    }

    .modal {
        background: var(--background-color);
        max-width: 300px;
        height: 40%;
        text-align: center;
        overflow: hidden;
    }

    .material-icons.mic {
        font-size: 150px;
    }


    .modal-content .material-icons {
        color: white;
    }

    .modal-content button {
        width: 56px;
        height: 56px;
        margin-top: 24px;
        position: relative;
        left: 50%;
        transform: translateX(-28px);
        background: #FFF;
        border: none;
        border-radius: 50%;
        overflow: hidden;
        outline: 0;
        display: block;
    }

    .modal-content button:after {
        content: '';
        display: block;
        width: 44px;
        height: 44px;
        background: url("/ic_mic_24px.svg") center center no-repeat var(--light-color);
        border-radius: 50%;
        position: absolute;
        left: 6px;
        top: 6px;
        box-sizing: border-box;
        transition: all .2s cubic-bezier(0, 0, .21, 1);
        transform-origin: 0 0;
    }

    .modal-content button.record:after {
        left: 12px;
        top: 12px;
        width: 33px;
        height: 33px;
        border-radius: 5px !important;
        background: var(--light-color) !important;
    }

    .modal-content button .material-icons {
        position: absolute;
        z-index: 1000;
    }

    .modal-footer {
        background: transparent;
        margin-top: 20px;
        padding: 2px 0 !important;
        text-transform: uppercase;
    }

    .modal-footer a {
        color: var(--color) !important;

    }

    .record-view__volume-readout {
        width: 4px;
        height: 67px;
        position: absolute;
        left: 50%;
        top: 84px;
        margin-left: -2px;
    }

    .micro-img {
        margin: 30px 0;
        height: 140px;
        background: url("./icon-sessions.svg") center top no-repeat;
    }
</style>
