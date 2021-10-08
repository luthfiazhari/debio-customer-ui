<template lang="pug">
  .customer-myTest
    Banner(
      title="My Test"
      subtitle="Here, you can request at-home medical testing so that you do not need to visit a physical facility. This includes Covid-19 testing and other diseases. All tests are anonymous-first."
    )
      template(slot="illustration")
        ui-debio-icon(:icon="mytestIllustration" :size="cardBlock ? 250 : 180" view-box="0 0 182 130" fill)
    
    div.body
    ui-debio-card.table(
      width="100%"
    )
      div.bodyHeader
        v-row
          v-col(cols="9")
            v-row
              span.topHead Recen Orders
            v-row
              span.botomHead Quick Actions to view your recent orders
          v-col(cols="3")
            Button.btnHead(
              :width="'75px'"
              :height="'25px'"
              outlined
              :color="'#5640A5'"
              @click="goToOrderHistory"
            ) View All
      div.bodyContent
        DataTable.content(
          :headers="headers"
          :items="dummyItems"
          :sortBy="['timestamp']"
          :sort-by="[true]"
          :disableSort="true"
        )
          template(class="status" v-slot:[`item.title`]="{item}")
            div(class="detailLab d-flex align-center")
              v-img(
                alt="dbio Logo"
                class="shrink mr-2"
                contain
                src="@/assets/debio-logo.png"
                transition="scale-transition"
                width="42px"
                height="42px"
              )
              div(class="fluid")
                div.textBox
                  span {{ item.title }}
                div.subTextBox
                  span {{ item.dna_sample_tracking_id}}

          template(class="status" v-slot:[`item.status`]="{item}") {{ item.status }}

          template(v-slot:[`item.actions`]="{item}")
            div
              v-row
                v-col
                  div
                    Button.btnDetail(
                      :color="'#C400A5'"

                      dark
                      :width="'80px'"
                      :height="'25'"
                    ) Details
                v-col
                  div
                    Button.btnInstruction(
                      :color="'#C400A5'"

                      dark
                      :width="'80px'"
                      :height="'25'"
                    ) Instruction

</template>

<script>
import { mytestIllustration } from "@/common/icons"

import Banner from "@/common/components/Banner.vue"
import DataTable from "@/common/components/DataTable"
import Button from "@/common/components/Button"

export default {
  name: "CustomerMyTest",

  components: {
    Banner,
    DataTable,
    Button
  },

  data: () => ({
    mytestIllustration,
    cardBlock: false,
    headers: [
      { text: "Service Name", value: "title" },
      { text: "Lab Name", value: "labName" },
      { text: "Order Date", value: "orderDate" },
      { text: "Last Update", value: "updated_at" },
      { text: "Test Status", value: "status" },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "center",
        width: "5%"
      }
    ],
    dummyItems: [
      {
        dna_sample_tracking_id: "AYEY6073POOH",
        icon: "mdi-dna",
        labName: "GSI Lab",
        number: "0x3943c10e33521319e4222843c33a939492978da07070c15815cc32703712604a",
        orderDate: "20 Jan 2021",
        status: "Fulfilled",
        timestamp: "1631849952000",
        title: "Covid-19 Testing",
        updated_at: "20 Jan 2021"
      },
      {
        dna_sample_tracking_id: "073PAYEYH6OO",
        icon: "mdi-dna",
        labName: "Nebula Lab",
        number: "0x3943c10e33521319e4222843c33a939492978da07070c15815cc32703712604a",
        orderDate: "20 Jan 2021",
        status: "Paid",
        timestamp: "1631849952000",
        title: "Whole Genome Sequencing",
        updated_at: "20 Jan 2021"
      },
      {
        dna_sample_tracking_id: "073PY6OHOAYE",
        icon: "mdi-dna",
        labName: "Prodia",
        number: "0x3943c10e33521319e4222843c33a939492978da07070c15815cc32703712604a",
        orderDate: "20 Jan 2021",
        status: "Unpaid",
        timestamp: "1631849952000",
        title: "Whole Exome Sequencing",
        updated_at: "20 Jan 2021"
      },
      {
        dna_sample_tracking_id: "6073POAHYEYO",
        icon: "mdi-dna",
        labName: "Speed Lab",
        number: "0x3943c10e33521319e4222843c33a939492978da07070c15815cc32703712604a",
        orderDate: "20 Jan 2021",
        status: "Refunded",
        timestamp: "1631849952000",
        title: "Targeted Gene Panel Sequencing",
        updated_at: "20 Jan 2021"
      },
      {
        dna_sample_tracking_id: "EYO6073POHAY",
        icon: "mdi-dna",
        labName: "32andme",
        number: "0x3943c10e33521319e4222843c33a939492978da07070c15815cc32703712604a",
        orderDate: "20 Jan 2021",
        status: "Canceled",
        timestamp: "1631849952000",
        title: "SNP Microarray",
        updated_at: "20 Jan 2021"
      },
      {
        dna_sample_tracking_id: "EYO6073POHAY",
        icon: "mdi-dna",
        labName: "32andme",
        number: "0x3943c10e33521319e4222843c33a939492978da07070c15815cc32703712604a",
        orderDate: "20 Jan 2021",
        status: "Canceled",
        timestamp: "1631849952000",
        title: "SNP Microarray",
        updated_at: "20 Jan 2021"
      },
      {
        dna_sample_tracking_id: "EYO6073POHAY",
        icon: "mdi-dna",
        labName: "32andme",
        number: "0x3943c10e33521319e4222843c33a939492978da07070c15815cc32703712604a",
        orderDate: "20 Jan 2021",
        status: "Canceled",
        timestamp: "1631849952000",
        title: "SNP Microarray",
        updated_at: "20 Jan 2021"
      }
    ]
  }),

  mounted() {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 959) this.cardBlock = true
      else this.cardBlock = false
    })
  }

}
</script>

<style lang="sass" scoped>
  .customer-myTest
    &::v-deep
      .banner__subtitle
        max-width: 36.188rem !important

      .body
        margin-top: 25px
        display: grid
        width: 100%
        grid-template-columns: 1fr 1fr
        gap: 20px
      .content
        margin: 15px 5px 5px -5px
      .bodyHeader
        margin-left: 15px
      .topHead
        font-size: 15px
      .botomHead
        font-size: 10px
      .btnHead
        font-size: 10px
        margin-left: 25px
        margin-top: -15px
      .iconTable
        margin-left: 8px
        margin-top: -2px
      .status
        color: #48A868 !important
      .textBox
        margin-top: 14px
      .subTextBox
        margin-top: -40px

      .btnDetail
        margin: 15px 0 0 0
      .btnInstruction
       margin: 0 0 0 15px

      .detailLab
        margin: -5px 0 0 0
</style>
