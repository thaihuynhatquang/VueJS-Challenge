<template>
  <v-container fluid >
    <v-layout align-center justify-space-around>
      <import-data></import-data>
    </v-layout>
    <v-layout align-center justify-space-around>
      <data-table></data-table>
    </v-layout>
  </v-container>
</template>

<script>
  import DataTable from './DataTable.vue'

  export default {
    components: {
      dataTable: DataTable
    }
  }
</script>

<style>

</style>