<template lang="pug">
.customer-home
  ui-debio-banner(
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
                span.topHead Recent Orders
              v-row
                span.botomHead {{ titleWording }}
            v-col(cols="3")
              Button.btnHead(
                :width="'75px'"
                :height="'25px'"
                outlined
                :color="'#5640A5'"
                dark
                @click="goToOrderHistory"
              ) View All
        div.bodyContent
          DataTable.content(
            :headers="headers"
            :items="orderHistory"
            :sortBy="['timestamp']"
            :sort-by="[true]"
            :disableSort="true"
            :showFooter="false"

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
                  div
                    span {{ item.title }}
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
                  @click="goToDetail"
                  )


      ui-debio-card.rightTable(
        width="545"
      )
        div.bodyHeader
          v-row
            v-col(cols="9")
              v-row
                span.topHead Recent Test
              v-row
                span.botomHead {{ titleWording }}
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
            :items="testHistory"
            :sortBy="['timestamp']"
            :sort-by="[true]"
            :disableSort="true"
            :showFooter="false"
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
                  div
                    span {{ item.title }}
                  div
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
import { creditCardIcon, layersIcon, labIllustration, eyeIcon } from "@/common/icons"

import Banner from "@/common/components/Banner.vue"
import DataTable from "@/common/components/DataTable"
import dataTesting from "./MyTest/dataTesting.json"


export default {
  name: "CustomerHome",

  components: {Banner, DataTable },
  data: () => ({
    creditCardIcon,
    layersIcon,
    labIllustration,
    eyeIcon,
    cardBlock: false,
    orderHistory: [],
    testHistory: [],
    titleWording: "",

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
    await this.getDataTestHistory()
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
      console.log(this.orderHistory.length, "length")
    },

    async getDataTestHistory() {
      // beda nya apa sama data history, kalo beda dari status ya nanti di filter
      this.testHistory = dataTesting.data.map(result => ({
        ...result._source,
        id: result._id,
        updated_at: new Date(parseInt(result._source.updated_at)).toLocaleDateString(),
        created_at: new Date(parseInt(result._source.created_at)).toLocaleDateString(),
        timestamp: parseInt(result._source.created_at)
      }))
      console.log(this.testHistory.length, "length")
    },

    goToOrderHistory() {
      console.log("to order history")
      this.$router.push({ name: "customer-test" })
    },
    goToDetail() {
      console.log("go to detail order history")
      // this.$router.push({ name: "", params: this.orderHistory })
    },

    async checkOrderLenght() {
      if (this.orderHistory.length == 0) {
        this.titleWording = "You haven’t made any order."
        return
      }
      this.titleWording = "Quick Actions to view your recent orders"
    }

    // setStatusColor(status) {
    //   let colors = Object.freeze({
    //     Registered:,
    //     REGISTERED:,
    //     Arrived:,
    //     ARRIVED:,
    //     REJECTED:,
    //     SUCCESS:,
    //     FAILEDL,
    //     QUALITYCONTROLLED
    //     Rejected:,
    //     Success:,
    //     Failed:,
    //     QualityControlled:,
    //     GenotypedSequenced:,
    //     Reviewed:,
    //     Computed:,
    //     ResultReady:
    //   })
    // }
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
        margin: 0 5px 5px -5px

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
