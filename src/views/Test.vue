<template>
  <div class="test">
    <p>Q</p>
    <p>{{ test.question }}</p>

    <p>A</p>
    <p v-for="word in test.answer" :key="word">{{ word }}</p>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "Test",
  computed: {
    id() {
      return this.$route.params["id"];
    },
    test() {
      return store.getters["test"](this.id);
    },
  },
};
</script>
