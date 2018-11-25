<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
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