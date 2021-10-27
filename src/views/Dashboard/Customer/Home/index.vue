<template lang="pug">
.customer-home
  Banner(
    title="Welcome to Debio!"
    subtitle="The Privacy-First Platform for Personal Biomedical Testing"
  )
    template(slot="illustration")
      ui-debio-icon(:icon="labIllustration" :size="cardBlock ? 250 : 180" view-box="0 0 100 100" fill)

    template(slot="cta")
      ui-debio-card(
        :to="{ name: 'customer-request-test'}"
        title="Request a Test"
        sub-title="Get your biological sample tested"
        tiny-card
        with-icon
        width="250"
        :block="cardBlock"
      )
        ui-debio-icon(:icon="creditCardIcon" slot="icon" size="34" color="#C400A5" fill)
      ui-debio-card(
        :to="{ name: 'customer-emr-create' }"
        title="Upload your EMR"
        sub-title="Upload your Electronic Medical Record"
        tiny-card
        with-icon
        width="250"
        :block="cardBlock"
      )
        ui-debio-icon(:icon="layersIcon" slot="icon" size="34" color="#C400A5" stroke)
  .customer-home-__content
    div.body
      ui-debio-card.leftTable(
        width="545"
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
              div(class="d-flex align-center")
                v-img(
                  alt="dbio Logo"
                  class="shrink mr-2"
                  contain
                  src="@/assets/debio-logo.png"
                  transition="scale-transition"
                  width="35px"
                  height="35px"
                )
                div(class="fluid")
                  div.textBox
                    span {{ item.title }}
                  div.subTextBox
                    span {{ item.dna_sample_tracking_id}}

            template(class="status" v-slot:[`item.status`]="{item}") {{ item.status }}

            template(v-slot:[`item.actions`]="{item}")
                ui-debio-icon.iconTable(
                  :icon="eyeIcon"
                  slot="icon"
                  size="20"
                  color="#C400A5"
                  stroke
                  @click="goToDetail"
                  )


      ui-debio-card.rightTable(
        width="545"
      )
        div.bodyHeader
          v-row
            v-col(cols="9")
              v-row
                span.topHead Recen Test
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
              div(class="d-flex align-center")
                v-img(
                  alt="dbio Logo"
                  class="shrink mr-2"
                  contain
                  src="@/assets/debio-logo.png"
                  transition="scale-transition"
                  width="35px"
                  height="35px"
                )
                div(class="fluid")
                  div.textBox
                    span {{ item.title }}
                  div.subTextBox
                    span {{ item.dna_sample_tracking_id}}


            template(v-slot:[`item.actions`]="{item}")
                ui-debio-icon.iconTable(
                  :icon="eyeIcon"
                  slot="icon" size="20"
                  color="#C400A5"
                  stroke
                  @click="goToDetail"
                  )
</template>

<script>
import { creditCardIcon, layersIcon, labIllustration } from "@/common/icons"

import Banner from "@/common/components/Banner.vue"

export default {
  name: "CustomerHome",

  components: {Banner },
  data: () => ({
    creditCardIcon,
    layersIcon,
    labIllustration,
    cardBlock: false,
    headers: [
      { text: "Service Name", value: "title" },
      { text: "Lab Name", value: "labName" },
      { text: "Date", value: "orderDate" },
      { text: "Status", value: "status" },
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
        title: "Covid-19 Testing"
      },
      {
        dna_sample_tracking_id: "073PAYEYH6OO",
        icon: "mdi-dna",
        labName: "Nebula Lab",
        number: "0x3943c10e33521319e4222843c33a939492978da07070c15815cc32703712604a",
        orderDate: "20 Jan 2021",
        status: "Paid",
        timestamp: "1631849952000",
        title: "Whole Genome Sequencing"
      },
      {
        dna_sample_tracking_id: "073PY6OHOAYE",
        icon: "mdi-dna",
        labName: "Prodia",
        number: "0x3943c10e33521319e4222843c33a939492978da07070c15815cc32703712604a",
        orderDate: "20 Jan 2021",
        status: "Unpaid",
        timestamp: "1631849952000",
        title: "Whole Exome Sequencing"
      },
      {
        dna_sample_tracking_id: "6073POAHYEYO",
        icon: "mdi-dna",
        labName: "Speed Lab",
        number: "0x3943c10e33521319e4222843c33a939492978da07070c15815cc32703712604a",
        orderDate: "20 Jan 2021",
        status: "Refunded",
        timestamp: "1631849952000",
        title: "Targeted Gene Panel Sequencing"
      },
      {
        dna_sample_tracking_id: "EYO6073POHAY",
        icon: "mdi-dna",
        labName: "32andme",
        number: "0x3943c10e33521319e4222843c33a939492978da07070c15815cc32703712604a",
        orderDate: "20 Jan 2021",
        status: "Canceled",
        timestamp: "1631849952000",
        title: "SNP Microarray"
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
  .customer-home
    &::v-deep
      .banner__illustration
        top: -0.625rem !important

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
</style>
