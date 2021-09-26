<template>
  <div class="edit">
    <h1>問題一覧</h1>
    <v-list two-line>
      <v-list-item v-for="test in tests" :key="test.question">
        <v-list-item-content>
          <v-list-item-subtitle v-text="test.question"></v-list-item-subtitle>
          <v-list-item-title>
            <span
              v-for="(word, index) in test.answer"
              :key="index"
              v-text="word"
            />
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-divider inset></v-divider>
      </v-list-item>
    </v-list>

    <editor />
  </div>
</template>

<script>
import editor from "../components/Editor.vue";
import store from "../store";
export default {
  name: "Edit",
  components: { editor },
  data: () => ({
    text: "",
  }),
  computed: {
    tests() {
      return store.getters.tests;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
