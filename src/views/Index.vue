<template>
  <v-container>
    <Table />
  </v-container>
</template>

<script>
import Table from "../components/Table.vue";

export default {
  name: "Index",
  components: { Table },
  data: () => ({
    singleSelect: false,
    selected: [],
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.word {
  padding-right: 0.5rem;
}
</style>
