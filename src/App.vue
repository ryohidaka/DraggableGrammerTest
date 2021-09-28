<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn v-if="isSubPage" icon to="/">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <div class="d-flex align-center">
        ランダム英文法テスト(beta) v{{ version }}
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    version: require("../package.json").version,
  }),
  computed: {
    isSubPage() {
      return !(this.$route.path === "/");
    },
  },
};
</script>
