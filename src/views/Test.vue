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

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h3 text-center" color="error">
          {{ isCorrect ? "正解" : "不正解" }}
        </v-card-title>
        <v-img v-if="isCorrect" src="@/assets/correct.png" contain />
        <v-img v-else src="@/assets/false.png" contain />

        <v-divider></v-divider>

        <v-card-actions v-if="!isCorrect">
          <v-btn block @click="dialog = false">
            もう一度挑戦する
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn block to="/">
            問題一覧に戻る
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    dialog: false,
    isCorrect: false,
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
      if (this.test.answer.join(" ") == this.items.join(" ")) {
        this.isCorrect = true;
      }
      this.dialog = true;
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
