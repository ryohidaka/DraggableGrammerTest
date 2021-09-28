<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="tests || []"
    :single-select="singleSelect"
    item-key="id"
    show-select
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

    <!-- テスト実行ボタン -->
    <template v-slot:[`item.test`]="{ item }">
      <v-btn color="primary" @click.stop="doTest(item.id)">
        <v-icon left> mdi-chat-question-outline </v-icon>
        テスト
      </v-btn>
    </template>

    <!-- 編集ボタン -->
    <template v-slot:[`item.edit`]="{ item }">
      <v-btn color="success" @click.stop="editItem(item.id)">
        <v-icon left> mdi-pencil </v-icon>
        編集
      </v-btn>
    </template>

    <!-- 削除ボタン -->
    <template v-slot:[`item.delete`]="{ item }">
      <v-btn color="error" @click.stop="deleteItem(item.id)">
        <v-icon left> mdi-delete </v-icon>
        削除
      </v-btn>
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
        width: "30%",
      },
      {
        text: "Answer",
        value: "answer",
        width: "30%",
      },
      {
        text: "Category",
        value: "category",
        width: "30%",
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
    doTest(id) {
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
