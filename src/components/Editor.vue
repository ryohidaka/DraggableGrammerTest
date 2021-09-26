<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          <!-- Use Google's location service? -->
        </v-card-title>

        <h2>入力</h2>
        <v-text-field v-model="textJA" label="日本語文" required></v-text-field>
        <h3>英文</h3>
        <input v-model="textEN" />

        <h2>自動分割</h2>
        <p>分割内容に問題ないことを確認してください</p>
        <p v-for="word in segments" :key="word">
          <span>{{ word }}</span>
        </p>

        <h2>確認</h2>

        <v-card-actions>
          <v-spacer></v-spacer>
          <button @click="submit" :disabled="segments.length === 0">
            保存
          </button>
          <v-btn color="green darken-1" text @click="dialog = false">
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import store from "../store";
export default {
  name: "Editor",
  data: () => ({
    dialog: false,
    textJA: "",
    textEN: "",
  }),
  computed: {
    segments() {
      return this.textEN ? this.textEN.split(" ") : [];
    },
  },
  watch: {
    textEN() {
      this.textEN = this.textEN.replaceAll(new String("\u3000"), " ");
      this.textEN = `${this.textEN.charAt(0).toUpperCase()}${this.textEN.slice(
        1
      )}`;
      this.textEN = this.textEN.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
      });
    },
  },
  methods: {
    submit() {
      const answer = {
        question: this.textJA,
        answer: this.segments,
      };
      store.commit("add", answer);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
