<template>
  <v-container>
    <v-col cols="12" md="10">
      <v-row>
        <h2>
          <v-icon>mdi-chat-question-outline</v-icon>
          {{ test.question }}
        </h2>
      </v-row>

      <v-col>
        <v-icon>mdi-alpha-a-circle-outline</v-icon>
      </v-col>
      <v-col align="center" justify="center">
        <v-chip-group>
          <draggable v-model="items">
            <v-chip v-for="word in items" :key="word" x-large>
              {{ word }}
            </v-chip>
          </draggable>
        </v-chip-group>
      </v-col>
      <v-col align="center" justify="center">
        <v-btn x-large color="success" @click="submit"> 回答 </v-btn>
      </v-col>
    </v-col>
  </v-container>
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
    this.items = this.test.answer.sort(() => Math.random() - 0.5);
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
