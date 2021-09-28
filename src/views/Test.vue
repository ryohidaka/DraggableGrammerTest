<template>
  <v-row class="test" justify="center" align-content="center">
    <v-col cols="12" md="6">
      <v-col>
        <h2>
          <v-icon>mdi-chat-question-outline</v-icon>
          {{ test.question }}
        </h2>
      </v-col>

      <v-col>
        <v-icon>mdi-alpha-a-circle-outline</v-icon>
      </v-col>

      <v-col>
        <v-row justify="center">
          <draggable
            v-model="items"
            class="draggable"
            :options="{ animation: 300 }"
          >
            <v-col v-for="word in items" :key="word">
              <v-card height="100" width="100" dark class="primary">
                <v-row
                  class="fill-height text-h4"
                  align="center"
                  justify="center"
                  v-text="word"
                />
              </v-card>
            </v-col>
          </draggable>
        </v-row>
      </v-col>

      <v-col align="center">
        <v-btn x-large color="success" @click="submit"> 回答 </v-btn>
      </v-col>
    </v-col>
  </v-row>
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
    this.items = Array.from(this.test.answer).sort(() => Math.random() - 0.5);
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

<style scoped>
.test {
  height: 100%;
}
.draggable {
  display: flex;
}
</style>
