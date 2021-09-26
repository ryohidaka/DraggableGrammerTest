<template>
  <div class="test">
    <p>Q</p>
    <p>{{ test.question }}</p>

    <p>A</p>
    <draggable v-model="items">
      <span v-for="word in items" :key="word">{{ word }}</span>
    </draggable>

    <button @click="submit">回答</button>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import store from "../store";

export default {
  name: "Test",
  components: { draggable },
  data: () => ({
    items: [],
  }),
  mounted() {
    this.items = this.test.answer;
  },
  computed: {
    id() {
      return this.$route.params["id"];
    },
    test() {
      return store.getters["test"](this.id);
    },
  },
  methods: {
    submit() {
      if (this.test.answer === this.items) {
        alert("正解");
      } else {
        alert("不正解");
      }
    },
  },
};
</script>
