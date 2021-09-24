<template lang="pug">
  div
    div
      p Welcome to DeBio

    div
      DataTable(
        :headers="headers"
        :items="dummyItems"
        :loading="isLoading"
        :custom-filter="false"
        :disable-sort="true"
      )
        template(v-slot:[`item.title`]="{ item }")
          div(class="d-flex align-center")
            v-img(
            alt="dbio Logo"
            class="shrink mr-2"
            contain
            src="@/assets/debio-logo.png"
            transition="scale-transition"
            width="45px"
            height="45px"
          )
            div(class="pt-3 fluid")
              div(class="boxName")
                span {{item.title}}
              div(class="boxId")
                span {{item.dna_sample_tracking_id}}
        template(v-slot:[`item.dna_sample_tracking_id`]="{ item }") {{item.dna_sample_tracking_id}}
        template(v-slot:[`item.timestamp`]="{ item }") {{item.orderDate}}
        template(v-slot:[`item.status`]="{item}") {{item.status }}
        template(v-slot:[`item.actions`]="{item}")
          v-container
            v-btn(
              class="success"
              dark
              small
              width="200"
              @click="goToOrderDetail(item)"
            ) View Order
    div
      p harusnya di bawah table

</template>

<script>
import { mapState } from "vuex";
// import Button from "@/common/components/Button"
import DataTable from "@/common/components/DataTable"
// import Stepper from "@/common/components/Stepper/roundStepper"

export default {
  name: 'CustomerHome',
  components: {
    // Button,
    DataTable,
    // Stepper
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
      
    ],
    isLoading: false,
    items: [
        { number: 1, title: 'Registered', active: true},
        { number: 2, title: 'Received', active: true},
        { number: 3, title: 'Quality Control', active: false},
        { number: 4, title: 'Wetwork', active: false},
        { number: 5, title: 'Results Ready', active: false},
    ],
  }),
  methods: {
    goToOrderDetail(item) {
      console.log(item)
    }
  },
}
</script>

<style lang="scss">
  .stepperBox {
    width: 700px;
    margin-top: 20px;
  }
  .boxName {
    max-height: 10px !important;
    margin-top: 4px;
  }
  .boxId {
    margin-top: 5px;
  }
</style>