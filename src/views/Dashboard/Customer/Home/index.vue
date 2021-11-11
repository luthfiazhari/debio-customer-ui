<template lang="pug">
.customer-home
  ui-debio-banner(
    title="Welcome to Debio!"
    subtitle="The Privacy-First Platform for Personal Biomedical Testing"
    with-decoration
    gradient-color="violet"
  )
    template(slot="illustration")
      ui-debio-icon(:icon="doctorDashboardIllustrator" :size="cardBlock ? 250 : 180" view-box="0 0 180 180" fill)

    template(slot="cta")
      ui-debio-card(
        :to="{ name: 'customer-request-test'}"
        title="Request a Test"
        sub-title="Get your biological sample tested"
        tiny-card
        with-icon
        width="250"
        @click="goToRequestTest"
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
        @click="goToUploadEmr"
        :block="cardBlock"
      )
        ui-debio-icon(:icon="layersIcon" slot="icon" size="34" color="#C400A5" stroke)
  .customer-home-__content
    div.body
      ui-debio-card.leftTable
        div.bodyHeader
          v-row
            v-col(cols="9")
              v-row
                span.topHead Recent Payments
              v-row
                span.botomHead {{ titleWording }}
            v-col(cols="3")
              Button.btnHead(
                :width="'75px'"
                :height="'25px'"
                color="#5640A5"
                outlined
                @click="goToPaymentHistory"
              ) View All

        div
          DataTable.content(
            :headers="headers"
            :items="orderHistory"
            :sortBy="['timestamp']"
            :sort-by="[true]"
            :disableSort="true"
            :showFooter="false"

          )
            template(class="status" v-slot:[`item.service_info.name`]="{item}")
              div(class="d-flex align-center")
                ui-debio-avatar.serviceImage(
                  :src="'https://picsum.photos/200'"
                  size="41"
                  rounded
                )
                div(class="fluid")
                  div
                    span {{ item.service_info.name }}
                  div
                    span {{ item.dna_sample_tracking_id}}

            template(class="status" v-slot:[`item.status`]="{item}") {{ item.status }}

            template(v-slot:[`item.actions`]="{item}")
              ui-debio-icon.iconTable(
                :icon="eyeIcon"
                slot="icon"
                size="20"
                color="#C400A5"
                stroke
                @click="goToPaymentDetail(item.id)"
                )


      ui-debio-card.rightTable
        div.bodyHeader
          v-row
            v-col(cols="9")
              v-row
                span.topHead Recent Test
              v-row
                span.botomHead {{ titleWording }}
            v-col(cols="3")
              Button.btnHead(
                width="75px"
                height="25px"
                outlined
                color="#5640A5"
                @click="goToMyTest"
              ) View All

        div
          DataTable.content(
            :headers="headers"
            :items="orderHistory"
            :sortBy="['timestamp']"
            :disableSort="true"
            :showFooter="false"
          )

            template(class="status" v-slot:[`item.service_info.name`]="{item}")
              div(class="d-flex align-center")
                ui-debio-avatar.serviceImage(
                  :src="'https://picsum.photos/200/300'"
                  size="41"
                  rounded
                )
                div(class="fluid")
                  div
                    span {{ item.service_info.name }}
                  div
                    span {{ item.dna_sample_tracking_id}}


            template(v-slot:[`item.actions`]="{item}")
              ui-debio-icon.iconTable(
                :icon="eyeIcon"
                slot="icon" size="20"
                color="#C400A5"
                stroke
                @click="goToOrderDetail(item)"
                )
</template>

<script>
import { creditCardIcon, layersIcon, labIllustration, doctorDashboardIllustrator, eyeIcon } from "@/common/icons"

import Banner from "@/common/components/Banner"
import DataTable from "@/common/components/DataTable"
import dataTesting from "./MyTest/dataTesting.json"
import Button from "@/common/components/Button"

export default {
  name: "CustomerHome",

  components: {Banner, DataTable, Button },

  data: () => ({
    creditCardIcon,
    layersIcon,
    labIllustration,
    eyeIcon,
    cardBlock: false,
    orderHistory: [],
    testHistory: [],
    titleWording: "",
    doctorDashboardIllustrator,
    headers: [
      { text: "Service Name", value: "service_info.name",sortable: true },
      { text: "Lab Name", value: "lab_info.name", sortable: true },
      { text: "Date", value: "created_at", sortable: true },
      { text: "Status", value: "status", sortable: true },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "center",
        width: "5%"
      }
    ]
  }),

  mounted() {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 959) this.cardBlock = true
      else this.cardBlock = false
    })
  },

  async created() {
    await this.getDataOrder()
    await this.checkOrderLenght()
  },

  methods: {
    async getDataOrder() {
      this.orderHistory = dataTesting.data.map(result => ({
        ...result._source,
        id: result._id,
        updated_at: new Date(parseInt(result._source.updated_at)).toLocaleDateString(),
        created_at: new Date(parseInt(result._source.created_at)).toLocaleDateString(),
        timestamp: parseInt(result._source.created_at)
      }))
      this.orderHistory = this.orderHistory.filter(order => order.status == "OrderPaid")
    },

    async getDataTestHistory() {
      this.testHistory = dataTesting.data.map(result => ({
        ...result._source,
        id: result._id,
        updated_at: new Date(parseInt(result._source.updated_at)).toLocaleDateString(),
        created_at: new Date(parseInt(result._source.created_at)).toLocaleDateString(),
        timestamp: parseInt(result._source.created_at)
      }))
    },

    goToMyTest() {
      this.$router.push({ name: "my-test" }) //go to order history page (mytest)
    },

    goToUploadEmr() {
      console.log("ke create emr")
    },

    goToRequestTest() {
      console.log("ke request test")
    },

    goToPaymentHistory() {
      this.$router.push({ name: "customer-payment-history" }) //go to payment history page
    },

    goToOrderDetail(item) { //item
      this.$router.push({ name: "order-history-detail", params: item}) //go to order history detail page
    },

    goToPaymentDetail(item) {
      this.$router.push({ name: "customer-payment-details", params: item }) //go to payment detail
    },

    async checkOrderLenght() {
      if (!this.orderHistory.length) {
        this.titleWording = "You haven’t made any order."
        return
      }
      this.titleWording = "Quick Actions to view your recent orders"
    }
  }
}
</script>

<style lang="sass" scoped>
  .customer-home
    &::v-deep
      .banner__illustration

      .body
        margin-top: 25px
        display: flex
        width: 100%
        flex-wrap: wrap
        gap: 20px

      .content
        margin: 0 5px 5px -5px

      .bodyHeader
        margin-left: 15px

      .leftTable
        width: 545
        flex: 1

      .rightTable
        width: 545
        flex: 1

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
      .serviceImage
        margin: 0 10px 0 0
        border-radius: 5px
  .degenics-datatable
    margin: 20px 0 0 0
  .degenics-datatable-card
    padding: 0px
</style>
