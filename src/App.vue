<template>
  <div id="app">
    <nav>
      <div class="container">
        <h5>Voice Memos</h5>
      </div>
    </nav>
    <div class="container content">
      <div class="memos">
        <Memos v-bind:memos="memos" v-on:delete="deleteMemo" v-on:openDetails="openDetails" />
      </div>
      <div class="footer">
        <a class="btn-floating btn-center center-items round-btn" v-on:click="openModal">
          <div class="circle">
            <i class="material-icons">add</i>
          </div>
          <span>Create new project</span>
        </a>
      </div>
      <transition name="slide-fade">
        <MemoCard
          class="memoCard"
          v-if="openedMemo"
          v-on:close="closeDetails"
          v-on:save="saveMemo"
          v-on:delete="deleteMemo"
          v-bind:memo="openedMemo"
        />
      </transition>
    </div>
    <div class="modal-background center-items" ref="bg">
      <div id="modal1" class="modal" ref="modal">
        <button class="close-btn" v-on:click="closeModal">
          <i class="material-icons">close</i>
        </button>
        <div class="modal-content center-items">
          <div class="modal-header">Record a new memo</div>
          <div class="circle center-items">
            <div class="micro-img center-items">
              <svg class="record-view__volume-readout">
                <circle
                  v-for="(color, idx) in volumeFill"
                  r="2"
                  cx="2"
                  v-bind:cy="2+8*idx"
                  v-bind:key="idx"
                  v-bind:fill="color"
                />
              </svg>
            </div>
          </div>
          <span class="timer">{{formatDuration()}}</span>
          <button class="btn btn-large play-btn" v-on:click="startRecording" ref="recordBtn"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Memos from "./components/Memos";
import MemoCard from "./components/MemoDetails";
import MediaRecording from "./components/Recorder.js";
import Vue from "vue";
import DbService from "./server/mongo.js";
import MinioService from "./server/minio.js";
import axios from "axios";

export default {
  name: "app",
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
      duration: 0,
      recordingInterval: {},
      updating: false,
      mediaRecording: {},
      volumeFill: [
        "rgba(256,256,256, 0.4)",
        "rgba(256,256,256, 0.4)",
        "rgba(256,256,256, 0.4)",
        "rgba(256,256,256, 0.4)"
      ]
    };
  },
  methods: {
    openModal() {
      this.$refs.modal.classList.add("active");
      this.$refs.bg.style.display = "flex";
    },

    closeModal() {
      if (this.recording) {
        this.mediaRecording.stop(true);
        clearInterval(this.recordingInterval);
        this.duration = 0;
        this.recording = false;
      }
      this.$refs.recordBtn.classList.remove("record");
      this.$refs.modal.classList.remove("active");
      this.$refs.bg.style.display = "none";
    },
    openDetails(idx) {
      this.updating = true;
      this.openedMemo = this.memos[idx];
    },
    closeDetails() {
      this.updating = false;
      this.openedMemo = null;
    },
    saveMemoInDb() {
      const memo = this.openedMemo;
      const data = memo.data;
      let id = 0;

      MinioService.minioService
        .create(this.openedMemo.title.split(" ").join("") + ".wav")
        .then(res => {
          let url = res.array[0];
          let key = res.array[1];
          console.log(url, key);

          axios
            .put(url, data)
            .then(res => {
              DbService.createMemo({
                title: memo.title,
                description: memo.description,
                key: key,
                duration: memo.duration,
                updatedAt: memo.updatedAt,
                volumeData: memo.volumeData
              })
                .then(res => {
                  id = res.array[1];
                  memo._id = id;
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveMemo() {
      this.openedMemo.updatedAt = new Date();

      if (!this.updating) {
        this.memos.push(this.openedMemo);
        this.saveMemoInDb();
      } else {
        console.log(this.openedMemo);
        DbService.updateMemo(this.openedMemo)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });

        const idx = this.memos.findIndex(m => {
          m._id == this.openedMemo;
        });
        this.memos.splice(idx, 1, this.openedMemo);
      }
      this.closeDetails();
    },
    deleteMemo(memo) {
      DbService.deleteMemo(memo._id);
      const idx = this.memos.indexOf(memo);
      this.memos.splice(idx, 1);
    },
    formatDuration() {
      const minutes = Math.floor(this.duration / 60);
      return this.f(minutes) + ":" + this.f(this.duration % 60);
    },
    drawVolumeReadout(volume = 0) {
      volume = volume / this.volumeFill.length;

      for (let v = 0; v < this.volumeFill.length; v++) {
        if (v + 1 < volume) {
          Vue.set(this.volumeFill, this.volumeFill.length - 1 - v, "#FFF");
        } else {
          Vue.set(
            this.volumeFill,
            this.volumeFill.length - 1 - v,
            "rgba(256,256,256, 0.4)"
          );
        }
      }
    },
    f(t) {
      return t > 9 ? t : `0${t}`;
    },
    startRecording() {
      if (this.recording) {
        this.mediaRecording.stop();
        clearInterval(this.recordingInterval);
        this.recording = false;
        return;
      }

      let volumeData = [];
      let volumeMax = 1;
      let volumeSum = 0;

      this.recording = true;
      this.$refs.recordBtn.classList.add("record");

      this.recordingInterval = setInterval(() => {
        this.duration++;
      }, 1000);

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

          if (volume > volumeMax) volumeMax = volume;

          volumeData.push(volume);
          this.drawVolumeReadout(volume);

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
        if (audioData === null) return;

        this.closeModal();
        // Normalize volume data
        for (let d = 0; d < volumeData.length; d++) {
          volumeData[d] /= volumeMax;
        }

        const url = URL.createObjectURL(
          new Blob([audioData], { type: "audio/wav" })
        );

        this.openedMemo = {
          title: "Untitled Memo",
          description: "",
          duration: this.duration,
          type: "audio/wav",
          data: audioData,
          url,
          volumeData
        };

        this.duration = 0;
        this.recording = false;
        this.mediaRecording.killStream();
      });
    }
  },
  mounted() {
    this.memos = DbService.listMemos();
  }
};
</script>

<style scoped>
#app {
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}

.modal-background {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  z-index: 3;
  display: none;
}

.memos {
  flex: 1 1;
}

.memoCard {
  position: absolute;
  bottom: -5px;
  right: 20px;
  z-index: 4;
  max-height: 120%;
  max-width: 100%;
  height: 900px;
  transition: all 233ms cubic-bezier(0, 0, 0.21, 1) 40ms,
    opacity 233ms cubic-bezier(0, 0, 0.21, 1) 123ms;
}

nav {
  top: 0;
  height: 100px;
  background: var(--secondary-color);
  color: var(--color);
  font-weight: bold;
}

nav h5 {
  font-size: 30px;
  line-height: 110px;
  font-weight: bold;
  margin: 0;
}

.content {
  height: calc(100vh - 150px);
  /* padding-bottom: 60px; */
  display: flex;
  flex-direction: column;
}

.container {
  margin: 0 40px !important;
}

.footer {
  flex: 0 0;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-center {
  position: relative;
  width: 400px;
}

.btn-center .circle {
  top: calc(50% - 20px);
  left: 15px;
  position: absolute;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 2px solid var(--color);
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-center span {
  font-size: 20px;
}

.modal-header {
  background: var(--dark-color);
  height: 30px;
  color: var(--color);
}

.modal {
  z-index: 4;
  position: relative;
  border-radius: 20px;
  background: var(--background-color);
  width: 60vw;
  height: 55vh;
  text-align: center;
  overflow: hidden;
  /* display: none;  */
  opacity: 0;
  transition: all ease-in-out 0.3s;
}

.modal.active {
  /* display: block !important; */
  opacity: 1 !important;
}

.modal .modal-content {
  flex-direction: column;
  padding: 40px 10px;
}

.material-icons.mic {
  font-size: 150px;
}
.modal-content button.play-btn {
  width: 56px;
  height: 56px;
  transform: translateY(100%);
  /* margin-top: 40px; */
  position: relative;
  background: var(--secondary-color);
  border: none;
  border-radius: 50%;
  overflow: hidden;
  outline: 0;
  display: block;
}

.close-btn {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  color: #acacac;
}

.modal-header {
  font-size: 30px;
  color: #4f4f4f;
  font-weight: 100;
  margin-bottom: 40px;
}
.modal-content button.play-btn:after {
  content: "";
  display: block;
  width: 44px;
  height: 44px;
  background: url("/ic_mic_24px.svg") center center no-repeat
    var(--secondary-color);
  border-radius: 50%;
  position: absolute;
  left: 6px;
  top: 6px;
  box-sizing: border-box;
  transition: all 0.2s cubic-bezier(0, 0, 0.21, 1);
  transform-origin: 0 0;
}

.modal-content button.play-btn.record {
  color: red !important;
}

.modal-content button.play-btn.record:after {
  left: 13px;
  top: 13px;
  width: 30px;
  height: 30px;
  background: white !important;
}

.modal-content button.play-btn .material-icons {
  position: absolute;
  z-index: 1000;
}

.record-view__volume-readout {
  width: 4px;
  height: 67px;
  /* margin-bottom: 10px; */
}

.micro-img {
  margin: 30px 0;
  height: 140px;
  width: 100px;
  background: url("./icon-sessions.svg") center top no-repeat;
}
.timer {
  font-size: 30px;
  color: #4f4f4f;
  margin-top: 20px;
}
.modal-content .circle {
  width: 200px;
  height: 200px;
  margin: 0;
  background: transparent;
  border: 5px solid var(--secondary-color);
  border-radius: 50%;
}
</style>
