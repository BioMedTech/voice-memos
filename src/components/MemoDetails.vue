<template>
  <div class="card-wrapper center-items">
    <div class="card" ref="details">
      <div class="icons">
        <div class="icon">
          <div class="icon-group" v-if="!edit">
            <i class="material-icons" v-on:click="deleteMemo">delete</i>
            <i class="material-icons" v-on:click="editMode">mode_edit</i>
            <a href="#" ref="downloadLink">
              <i class="material-icons">file_download</i>
            </a>
          </div>
        </div>

        <div class="icon">
          <i class="material-icons close-icon" v-on:click="closeDetails">close</i>
        </div>
      </div>

      <div class="edit-group" v-if="edit">
        <div class="input-group">
          <div class="input-field">
            <label for="memoTitle">Title</label>
            <input type="text" v-model="title" id="memoTitle" placeholder="Memo title" />
          </div>
          <div class="input-field">
            <label for="memoDescr">Description</label>
            <input type="text" v-model="description" id="memoDescr" placeholder="Memo description" />
          </div>
        </div>
        <div class="footer center-items">
          <button class="round-btn" v-on:click="saveMemo">Save memo</button>
        </div>
      </div>

      <div class="center-items edit-group" v-else>
        <div class="info">
          <h2 class="title">{{memo.title}}</h2>
          <div class="canvas-wrapper">
            <canvas class="waveform" ref="waveform"></canvas>
          </div>
          <div>
            <p class="helper-text">Description:</p>
            <p>{{memo.description?memo.description:"No description"}}</p>
          </div>
        </div>

        <div class="footer center-items">
          <button class="round-btn" v-on:click="playMemo" ref="playBtn">Play memo</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MinioService from "../server/minio.js";

export default {
  name: "MemoDetails",
  props: ["memo"],
  data() {
    return {
      audio: {},
      edit: false,
      canvas: {},
      context: {},
      title: "Untitled Memo",
      description: ""
    };
  },
  methods: {
    closeDetails() {
      this.$emit("close");
    },
    saveMemo() {
      if (this.title.trim().length < 1) {
        this.title = "Untitled Memo";
      }
      this.$props.memo.title = this.title;
      this.$props.memo.description = this.description;
      this.$emit("save");
    },
    editMode() {
      this.edit = !this.edit;
      if (!this.edit) {
        this.audio.currentTime === this.audio.duration
          ? this.clearProgress()
          : this.fillProgress();
        if (this.$props.memo.title.trim().length < 1)
          this.$props.memo.title = "Untitled Memo";
      } else if (this.audio && !this.audio.paused) {
        this.playMemo();
      }
    },
    deleteMemo(e) {
      this.$emit("close");
      this.$emit("delete", this.$props.memo);
    },
    playMemo() {
      const playBtn = this.$refs.playBtn;
      if (this.audio.paused) {
        this.audio.play();

        playBtn.innerHTML = "Pause";
      } else {
        this.audio.pause();
        playBtn.innerHTML = "Play";
      }
    },
    fillProgress() {
      const percent = this.audio.currentTime / this.audio.duration;
      this.drawWave(percent, 0.8);
    },
    clearProgress() {
      this.drawWave(1, 0.2);
    },
    drawWave(percent, alpha) {
      if (this.context && this.canvas) {
        this.context.clearRect(
          0,
          0,
          Math.floor(this.canvas.width * percent - 2),
          this.canvas.height
        );
        this.context.save();

        this.context.translate(0, this.canvas.height * 0.5);
        this.context.beginPath();
        this.context.globalAlpha = alpha;

        let x,
          h = 0;

        const memo = this.$props.memo;

        for (let d = 0; d < Math.floor(memo.volumeData.length * percent); d++) {
          x = (d / memo.volumeData.length) * this.canvas.width;

          h = memo.volumeData[d] * this.canvas.maxHeight * 0.5;
          h = Math.max(1, h);

          this.context.lineTo(x, -h);
        }

        for (
          let d = Math.floor((memo.volumeData.length - 1) * percent);
          d >= 0;
          d--
        ) {
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

      canvas.style.width = this.canvas.width + "px";
      canvas.style.height = this.canvas.height + "px";

      this.context = canvas.getContext("2d");
      this.context.scale(dPR, dPR);

      const padding = 50;
      this.canvas.maxHeight = this.canvas.height - 2 * padding;

      this.drawWave(1, 0.2);
    }
  },
  mounted() {
    this.edit = !this.$props.memo.updatedAt;
    this.description = this.$props.memo.description;
    this.title = this.$props.memo.title;

    if (!this.edit) {
      const link = this.$refs.downloadLink;
      const memo = this.$props.memo;

      const audio = document.createElement("audio");

      audio.addEventListener("ended", () => {
        this.$refs.playBtn.innerHTML = "Play memo";
        requestAnimationFrame(this.clearProgress);
      });
      audio.addEventListener("timeupdate", () => {
        requestAnimationFrame(this.fillProgress);
      });

      if (memo.url) {
        link.href = memo.url;
        audio.src = memo.url;
      } else if (memo.key) {
        MinioService.minioService
          .getObject(memo.key)
          .then(res => {
            const url = res.array[0];
            link.href = url;
            audio.src = url;
          })
          .catch(err => {
            console.log(err);
          });
      }

      link.download = memo.title + ".wav";
      this.$refs.details.appendChild(audio);
      this.audio = audio;
      this.initCanvas();
    }
  }
};
</script>

<style scoped>
.card-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.edit-group {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  height: 90%;
}

.edit-group .input-group,
.info {
  flex: 1 1;
}

.footer {
  flex: 0 0;
}

.card {
  width: 45vh;
  height: 50vh;
  -webkit-box-shadow: 0px 0px 11px -6px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 11px -6px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 11px -6px rgba(0, 0, 0, 0.75);
  border-radius: 15px;
  background: white;
  padding: 20px 40px;
}
.canvas-wrapper {
  width: 100%;
  height: 150px;
}

.d-none {
  display: none !important;
}

.waveform {
  width: 100%;
  height: 150px;
  display: block;
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
  font-weight: 100;
  font-size: 30px;
  color: #4f4f4f;
}

.header {
  position: absolute;
  left: 20px;
  bottom: 2px;
  right: 20px;
}

.icons {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.helper-text {
  color: #999999;
  margin-bottom: 20px !important;
  font-size: 14px;
  font-weight: bold;
}

.close-icon {
  color: lightgray;
}

.icon-group i {
  color: var(--secondary-color);
}

.icon-group i:not(:last-child) {
  margin-right: 25px;
}

.icons .icon {
  width: fit-content;
}
.input-field input {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #b2b2b2;
  font-size: 20px;
  padding: 6px 0;
  margin: 3px 0;
  color: black;
}

.input-field {
  display: flex;
  margin: 40px 0;
  flex-direction: column;
}

.input-field label {
  font-size: 16px;
  color: #b2b2b2;
}
.round-btn {
  width: 300px;
  height: 50px !important;
  font-size: 20px;
}
</style>
