<template>
  
  <div v-bind:class="[smallGrid?'smallGrid':'bigGrid', 'row' ]">
    <div v-bind:class="[smallGrid?'smallGrid':'bigGrid col-4 start', 'row' ]">
      <img src="../assets/volume.svg" class="volume-icon" />
      <span v-bind:class="{'withMargins':smallGrid}">{{memo.title}}</span>
    </div>
    <div v-bind:class="[smallGrid?'smallGrid':'bigGrid col-8 around', 'row' ]">
      <span v-bind:class="{'withMargins':smallGrid}">{{formatDuration(memo.duration)}}</span>
      <span v-bind:class="{'withMargins':smallGrid}">{{formatTime(memo.updatedAt)}}</span>
      <div v-bind:class="[smallGrid?'bottom-icon':'', 'delete-icon' ]" v-on:click.stop="deleteMemo"></div>
    </div>
  </div>

</template>

<script>
import moment from "moment";

export default {
  name: "Memo",
  props: ["memo", "smallGrid"],
  methods: {
    formatTime(time) {
      return moment(time).format("D.MM.YYYY");
    },
    formatDuration(duration) {
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      return this.f(minutes) + ":" + this.f(seconds);
    },
    f(t) {
      return t > 9 ? t : `0${t}`;
    },
    deleteMemo() {
      this.$emit("delete", this.$props.memo);
    }
  }
};
</script>

<style scoped>
.row {
  align-items: center;
  width: 100%;
}

.row.smallGrid {
  justify-content: center;
  flex-direction: column;
}

.withMargins {
  margin-top: 10px;
}

.row.bigGrid {
  flex-wrap: nowrap !important;
  margin: 0 10px;
  flex-direction: row !important;
  justify-content: space-between;
}

.row.bigGrid.around {
  justify-content: space-around !important;
}

.row.bigGrid.start {
  justify-content: space-between!important;
}

.volume-icon {
  width: 40px;
  margin-right: 10px;
}
.delete-icon {
  cursor: pointer;
  background: url("../assets/icons8-trash-can-100.svg") no-repeat;
  background-size: contain;
  height: 25px;
  width: 30px;
}

.delete-icon.bottom-icon {
  position: absolute;
  right: 10px;
  bottom: 17px;
}
</style>
