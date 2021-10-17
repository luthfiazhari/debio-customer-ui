<template lang="pug">
  .customer-myTest
    Banner(
      title="My Test"
      subtitle="Here, you can request at-home medical testing so that you do not need to visit a physical facility. This includes Covid-19 testing and other diseases. All tests are anonymous-first."
    )
      template(slot="illustration")
        ui-debio-icon(:icon="mytestIllustration" :size="cardBlock ? 275 : 265" view-box="10 0 256 190" fill)
    
    div.body
      
    ui-debio-card.table(
      width="1087px"
    )
      div.bodyContent
        DataTable.content(
          :headers="headers"
          :items="dummyItems"
          :sortBy="['timestamp']"
          :sort-by="[true]"
        )
          template(v-slot:top-left-slot)
            div top left slot

          template(v-slot:top-right-slot)
            div.rightSide top right slot

          template(class="titleSection" v-slot:[`item.title`]="{item}")
            div(class="detailLab d-flex align-center")
              v-img(
                alt="dbio Logo"
                class="shrink mr-2"
                contain
                src="@/assets/debio-logo.png"
                transition="scale-transition"
                width="42px"
              )
              div
                div.titleStatus
                  span {{ item.title }}
                div.statusDna
                  span {{ item.dna_sample_tracking_id}}
          
          //- template(v-slot: )

          template(v-slot:[`item.status`]="{item}")
            span.statusOrder {{ item.status }}

          template(v-slot:[`item.actions`]="{item}")
            

</template>

<script>
import { mytestIllustration } from "@/common/icons"

import Banner from "@/common/components/Banner.vue"
import DataTable from "@/common/components/DataTable"
import SearchBar from "@/common/components/DataTable/SearchBar"
import Button from "@/common/components/Button"


export default {
  name: "CustomerMyTest",

  components: {
    Banner,
    DataTable,
    Button,
    SearchBar
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
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap')

  .customer-myTest
    font-family: 'Open Sans', sans-serif !important
    &::v-deep
      .banner__subtitle
        max-width: 36.188rem !important

      .banner__content-description
        margin-left: 18rem !important

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

      .statusOrder
        color: #48A868 !important
        
      .titleStatus
        margin: 0 0 0 0

      .statusDna
        margin: 0 0 0 0 
        color: #8C8C8C !important

      .btnDetail
        margin: 15px 0 0 0

      .btnInstruction
       margin: 0 0 0 15px

      .detailLab
        margin: 10px 0 10px 0

      .banner__card
        background: linear-gradient(267.84deg, #D783FF 18.61%, #AF5EFF 55.16%, #A445D0 93.27%) !important

      .rightSide
        position: Absolute
        right: 0
</style>
