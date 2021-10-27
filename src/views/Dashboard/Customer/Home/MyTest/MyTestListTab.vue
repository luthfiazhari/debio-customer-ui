<template lang="pug">
  .customer-mytest
</template>

<script>
import DataTable from "@/common/components/DataTable"
import Button from "@/common/components/Button"

export default {
  name: "MyTestListTab",

  components: {
    DataTable,
    Button
  },

  data: () => ({
    headers: [
      { text: "Service Name", value: "title", sortable: true },
      { text: "Lab Name", value: "labName", sortable: true },
      { text: "Order Date", value: "orderDate", sortable: true },
      { text: "Last Update", value: "updated_at", sortable: true },
      { text: "Test Status", value: "status", sortable: true },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "center",
        width: "5%"
      }
    ]
  })
}
</script>

<style>

</style>
