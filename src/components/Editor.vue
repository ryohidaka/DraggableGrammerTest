<template>
  <v-dialog v-model="dialog" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on"> 追加 </v-btn>
    </template>
    <v-card pa="2">
      <v-card-title class="text-h5">入力 </v-card-title>

      <v-card-text>
        <v-text-field v-model="textJA" label="日本語文" required></v-text-field>
        <v-text-field v-model="textEN" label="英文" required></v-text-field>
      </v-card-text>

      <v-card-title class="text-h5">自動分割 </v-card-title>

      <v-card-text class="text-h5"
        >分割内容に問題ないことを確認してください</v-card-text
      >

      <v-card-text>
        <v-chip-group>
          <v-chip v-for="word in segments" :key="word">
            {{ word }}
          </v-chip>
        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="submit" :disabled="segments.length === 0"
          >保存</v-btn
        >
        <v-btn text @click="dialog = false"> キャンセル </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import store from "../store";
export default {
  name: "Editor",
  props: {
    editId: Number,
  },
  data: () => ({
    dialog: false,
    textJA: "",
    textEN: "",
  }),
  computed: {
    segments() {
      return this.textEN ? this.textEN.split(" ") : [];
    },
    newId() {
      return store.getters.newId;
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
    editId() {
      this.dialog = true;
      const test = store.getters["test"](this.editId);
      this.textJA = test.question;
      this.textEN = test.answer.join(" ");
    },
  },
  methods: {
    submit() {
      let answer = {
        id: this.newId,
        question: this.textJA,
        answer: this.segments,
      };
      if (this.editId) {
        answer.id = this.editId;
        store.commit("edit", answer);
      } else {
        store.commit("add", answer);
      }

      this.dialog = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
