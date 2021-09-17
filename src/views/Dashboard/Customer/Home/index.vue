<template lang="pug">
  div
    div
      p Wellcome to DeBio
    div
      DataTable(
        :headers="headers"
        :items="dummyItems"
        :sortBy="['timestamp']"
        :sort-by="[true]"
        :loading="isLoading"
      )
        template(v-slot:[`item.dna_sample_tracking_id`]="{item}") {{item.dna_sample_tracking_id}}
        template(v-slot:[`item.timestamp`]="{item}") {{item.orderDate}}
        template(v-slot:[`item.state`]="{item}") {{item.status}}
        //- template(v-slot:[`item.actions`]="{item}")
        //-   v-container
        //-     Button(
        //-       class="btn-eye"

        //-     ) button

    div
      p harusnya di bawah table


</template>

<script>
import { mapState } from "vuex";
import Button from "@/common/components/Button"
import DataTable from "@/common/components/DataTable"

export default {
  name: 'CustomerHome',
  components: {
    Button,
    DataTable
  },
  computed: {
    ...mapState({
      walletBalance: (state) => state.substrate.walletBalance,
      api: (state) => state.substrate.api,
      wallet: (state) => state.substrate.wallet,
      lastEventData: (state) => state.substrate.lastEventData,
    }),
  },
  data: () => ({
    headers: [
      { text: "Service Name", value: "title" },
      { text: "Lab Name", value: "labName" },
      { text: "Date", value: "timestamp" },
      { text: "Status", value: "status" },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "center",
        width: "5%",
      },
    ],
    dummyItems: [
      {
        dna_sample_tracking_id: "5MYFZOW0YFV6DIK7Q2CQ5",
        icon: "mdi-dna",
        labName: "Laboratorium DNA Favourite",
        number: "0x3943c10e33521319e4222843c33a939492978da07070c15815cc32703712604a",
        orderDate: "Fri, September 17, 2021, 10:39 AM",
        status: "Unpaid",
        timestamp: "1631849952000",
        title: "Whole Genome Sequencing",

      },
      {
        dna_sample_tracking_id: "5MYFZOW0YFV6DIK7Q2CQ5",
        icon: "mdi-dna",
        labName: "Laboratorium DNA Favourite",
        number: "0x3943c10e33521319e4222843c33a939492978da07070c15815cc32703712604a",
        orderDate: "Fri, September 17, 2021, 10:39 AM",
        status: "Unpaid",
        timestamp: "1631849952000",
        title: "Whole Genome Sequencing",

      },
      {
        dna_sample_tracking_id: "5MYFZOW0YFV6DIK7Q2CQ5",
        icon: "mdi-dna",
        labName: "Laboratorium DNA Favourite",
        number: "0x3943c10e33521319e4222843c33a939492978da07070c15815cc32703712604a",
        orderDate: "Fri, September 17, 2021, 10:39 AM",
        status: "Unpaid",
        timestamp: "1631849952000",
        title: "Whole Genome Sequencing",

      },
      {
        dna_sample_tracking_id: "5MYFZOW0YFV6DIK7Q2CQ5",
        icon: "mdi-dna",
        labName: "Laboratorium DNA Favourite",
        number: "0x3943c10e33521319e4222843c33a939492978da07070c15815cc32703712604a",
        orderDate: "Fri, September 17, 2021, 10:39 AM",
        status: "Unpaid",
        timestamp: "1631849952000",
        title: "Whole Genome Sequencing",

      }
    ],
    isLoading: false,
  })
}
</script>

<style>

</style>