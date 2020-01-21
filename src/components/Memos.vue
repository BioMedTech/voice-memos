<template>
  <div v-if="memos && memos.length>0">
    <div class="nav row">
      <form class="filterForm" v-on:submit.prevent="filterMemos">
        <input class="search-input" v-model="filterStr" placeholder="Search" />
      </form>
      <div v-if="!smallScreen">
        <label class="switch">
          <input type="checkbox" v-on:click="changeGrid" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>
    <ul class="collection row">
      <li
        v-for="(m, idx) in memos"
        v-bind:key="idx"
        v-bind:class="[smallGrid ? 'col-md-3 col-sm-6' : 'col-6', 'p-2 with-transition']"
        v-on:click="openDetails($event, idx)"
      >
        <div class="collection-item">
          <Memo v-bind:memo="m" v-on:delete="deleteMemo" v-bind:smallGrid="smallGrid" />
        </div>
      </li>
    </ul>
  </div>
  <div class="placeholder" v-else>
    <img src="../assets/record.jpg" class="bg" />
    <span class="helper-txt">Click on the button to start recording new voice memo</span>
  </div>
</template>

<script>
import Memo from "./Memo";

export default {
  name: "HelloWorld",
  components: {
    Memo
  },
  data() {
    return {
      smallGrid: false,
      filterStr: "",
      smallScreen: false
    };
  },
  props: ["memos"],
  methods: {
    openDetails(e, idx) {
      this.$emit("openDetails", idx);
    },
    deleteMemo(memo) {
      this.$emit("delete", memo);
    },
    changeGrid(event) {
      if (window.innerWidth > 768) this.smallGrid = event.target.checked;
    },
    filterMemos() {}
  },
  mounted() {
    if (window.innerWidth <= 768) {
      this.smallScreen = true;
      this.smallGrid = true;
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) {
        this.smallScreen = true;
        this.smallGrid = true;
      } else {
        this.smallScreen = false;
        this.smallGrid = false;
      }
    });
  }
};
</script>

<style scoped>
.placeholder {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.bg {
  width: 400px;
  align-self: center;
}

.helper-txt {
  /* display: block; */
  color: var(--light-color);
  margin-top: 30px;
  font-size: 20px;
}
.with-transition {
  transition: all ease-in-out 0.2s;
}

.collection {
  height: 80%;
  list-style: none;
  margin: 0 !important;
  justify-content: flex-start;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
}
.collection-item {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
  border-radius: 10px;
  padding: 20px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.collection-item.col-3 {
  height: 180px;
}

.collection-item:hover {
  background: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.nav {
  margin: 10px 5px;
  justify-content: space-between;
}

.search-input {
  border: none;
  border-radius: 20px;
  background: #f9f9f9;
  width: 100%;
  font-size: 20px;
  padding: 10px 10px;
}

.filterForm {
  width: 50%;
}

</style>
