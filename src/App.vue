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
                <a class="btn-floating btn-large pink" v-on:click="openModal"><i
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
                    <svg class="record-view__volume-readout">
                        <circle v-for="(color, idx) in volumeFill"
                                r="2" cx="2"
                                v-bind:cy="2+7*idx"
                                v-bind:key="idx"
                                v-bind:fill="color">
                        </circle>
                    </svg>
                </div>
                <button class="btn btn-large play-btn mt-5" v-on:click="startRecording" ref="recordBtn">
                </button>
                <button class="btn btn-flat close-btn" v-on:click="closeModal">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Memos from './components/Memos'
    import MemoCard from './components/MemoDetails'
    import M from "materialize-css/dist/js/materialize"
    import MediaRecording from "./components/Recorder.js"
    import Vue from "vue"

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
                mediaRecording: {},
                volumeFill: ['#D8D8D8', '#D8D8D8', '#D8D8D8', '#D8D8D8',
                    '#D8D8D8', '#D8D8D8', '#D8D8D8', '#D8D8D8',
                    '#D8D8D8', '#D8D8D8']
            }
        },
        methods: {
            openModal() {
                this.modalRef.open();
            },

            closeModal() {
                if (this.recording) {
                    this.mediaRecording.stop(true);
                }
                this.$refs.recordBtn.classList.remove("record");
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

                this.updating = false;
            },
            deleteMemo(memo) {
                const idx = this.memos.indexOf(memo);
                this.memos.splice(idx, 1)
            },

            drawVolumeReadout(volume = 0) {
                for (let v = 0; v < 10; v++) {
                    if (v < volume) {
                        Vue.set(this.volumeFill, 9 - v, '#673AB7');
                    } else {
                        Vue.set(this.volumeFill, 9 - v, '#D8D8D8');
                    }
                }
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

                this.mediaRecording.analyser.then(analyser => {
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
                        // trackAudioVolume();
                    };

                    requestAnimationFrame(trackAudioVolume);
                    // trackAudioVolume();
                });

                this.mediaRecording.complete.then(audioData => {
                    if (audioData === null)
                        return;

                    this.closeModal();
                    // Normalize volume data
                    for (let d = 0; d < volumeData.length; d++) {
                        volumeData[d] /= volumeMax;
                    }

                    const url = URL.createObjectURL(new Blob([audioData], {type: 'audio/wav'}));


                    this.openedMemo = {
                        title: "Untitled Memo",
                        description: "",
                        url,
                        volumeData
                    };
                    this.recording = false;
                    this.mediaRecording.killStream();

                })
            }
        },
        mounted() {
            this.modalRef = M.Modal.init(this.$refs.modal, {});
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
        bottom: -5px;
        right: 20px;
        z-index: 2;
        max-height: 120%;
        max-width: 100%;
        height: 900px;
        transition: all 233ms cubic-bezier(0, 0, .21, 1) 40ms, opacity 233ms cubic-bezier(0, 0, .21, 1) 123ms;
    }

    nav {
        height: 140px;
        padding-top: 10px;
        background: var(--background-color);
        color: var(--color);
        font-weight: bold;
        vertical-align: bottom;
    }


    nav h2 {
        font-size: 35px;
        line-height: 110px;
        margin-left: 20px;
    }

    .content {
        height: calc(100vh - 140px);
        position: relative;
    }

    .container {
        position: relative;
        height: 100%;
        margin: 0 auto;
        max-width: 800px !important;
    }

    .btn-floating {
        position: absolute;
        bottom: 30px;
        right: 0;
    }

    .modal-header {
        background: var(--dark-color);
        height: 30px;
        color: var(--color);
    }

    .modal {
        background: var(--background-color);
        max-width: 280px;
        max-height: 392px;
        width: 80%;
        height: 90%;
        text-align: center;
        overflow: hidden;
    }

    .material-icons.mic {
        font-size: 150px;
    }


    .modal-content .material-icons {
        color: white;
    }

    .modal-content button.play-btn {
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

    .modal-content button.play-btn:after {
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

    .modal-content button.play-btn.record:after {
        left: 13px;
        top: 13px;
        width: 30px;
        height: 30px;
        border-radius: 5px !important;
        background: var(--light-color) !important;
    }

    .modal-content button.play-btn .material-icons {
        position: absolute;
        z-index: 1000;
    }


    .close-btn {
        height: 36px;
        text-transform: uppercase;
        color: #FFF;
        font-size: 15px;
        font-weight: 500;
        opacity: .57;
        will-change: opacity;
        position: absolute;
        bottom: 8px;
        right: 16px;
        background: 0 0;
        border: none;
        padding: 0 8px;
        line-height: 1;

    }

    .record-view__volume-readout {
        width: 4px;
        height: 67px;
        position: absolute;
        left: 50%;
        top: 100px;
        margin-left: -2px;
    }

    .micro-img {
        margin: 30px 0;
        height: 140px;
        background: url("./icon-sessions.svg") center top no-repeat;
    }
</style>
