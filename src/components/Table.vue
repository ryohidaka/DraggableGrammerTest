<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="tests || []"
    :single-select="singleSelect"
    item-key="id"
    show-select
    @click:row="handleClickRow"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>問題一覧</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer />
        <editor :edit-id="editId" />
        <v-btn
          v-if="selected.length > 0"
          color="error"
          class="ma-2"
          @click="deleteAll"
        >
          一括削除
        </v-btn>
      </v-toolbar>
    </template>

    <!-- 回答は配列から文字列に変換して表示 -->
    <template v-slot:[`item.answer`]="{ item }">
      {{ item.answer.join(" ") }}
    </template>

    <!-- テストボタン -->
    <template v-slot:[`item.test`]="{ item }">
      <v-icon small @click.stop="handleClick(item.id)">
        mdi-chat-question-outline
      </v-icon>
    </template>

    <!-- 編集ボタン -->
    <template v-slot:[`item.edit`]="{ item }">
      <v-icon small @click.stop="editItem(item.id)"> mdi-pencil </v-icon>
    </template>

    <!-- 削除ボタン -->
    <template v-slot:[`item.delete`]="{ item }">
      <v-icon small @click.stop="deleteItem(item.id)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import store from "../store";
import editor from "./Editor.vue";

export default {
  components: { editor },
  data: () => ({
    singleSelect: false,
    selected: [],
    editId: "",
    headers: [
      {
        text: "Question",
        value: "question",
        width: "45%",
      },
      {
        text: "Answer",
        value: "answer",
        width: "45%",
      },
      {
        text: "",
        value: "test",
        width: "4%",
      },
      {
        text: "",
        value: "edit",
        width: "3%",
      },
      {
        text: "",
        value: "delete",
        width: "3%",
      },
    ],
  }),
  computed: {
    tests() {
      return store.getters.tests;
    },
  },
  methods: {
    handleClickRow(e) {
      this.$router.push({ path: `/test/${e.id}` });
    },
    handleClick(id) {
      this.$router.push({ path: `/test/${id}` });
    },
    editItem(id) {
      this.editId = id;
    },
    deleteItem(id) {
      if (window.confirm("削除しますか？")) {
        store.commit("deleteById", id);
      }
    },
    deleteAll() {
      if (window.confirm("削除しますか？")) {
        this.selected.forEach((v) => {
          store.commit("deleteById", v.id);
        });
      }
    },
  },
};
</script>
