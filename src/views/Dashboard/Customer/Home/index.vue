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
        to="/"
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
import { creditCardIcon, layersIcon, labIllustration, eyeIcon } from "@/common/icons"
import DataTable from "@/common/components/DataTable"
import Button from "@/common/components/Button"
import Banner from "@/common/components/Banner.vue"
import { mapState } from "vuex"
import localStorage from "@/common/lib/local-storage"
import {
  ordersByCustomer,
  getOrdersData
} from "@/common/lib/polkadot-provider/query/orders"
import { queryLabsById } from "@/common/lib/polkadot-provider/query/labs"
import { queryServicesById } from "@/common/lib/polkadot-provider/query/services"

export default {
  name: "CustomerHome",

  components: { Banner, DataTable, Button },
  data: () => ({
    creditCardIcon,
    layersIcon,
    labIllustration,
    cardBlock: false,
    eyeIcon,
    orderHistory: [],
    isLoadingOrderHistory: false,
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
    // this.getOrderHistory()
  },

  methods: {
    goToDetail() {
      console.log("to to detail")
    },
    async getOrderHistory() {
      this.isLoadingOrderHistory = true
      try {
        this.orderHistory = []
        const address = this.wallet.address
        const listOrderId = await ordersByCustomer(this.api, address)

        var lengthMax = 3
        if (listOrderId != null) {
          listOrderId.reverse()
          if (listOrderId.length < lengthMax) {
            lengthMax = listOrderId.length
          }

          for (let i = 0; i < lengthMax; i++) {
            const detailOrder = await getOrdersData(this.api, listOrderId[i])
            const detaillab = await queryLabsById(
              this.api,
              detailOrder.seller_id
            )
            const detailService = await queryServicesById(
              this.api,
              detailOrder.service_id
            )
            this.prepareOrderData(detailOrder, detaillab, detailService)
          }

          this.orderHistory.sort(
            (a, b) => parseInt(b.timestamp) - parseInt(a.timestamp)
          )
          const status = localStorage.getLocalStorageByName("lastOrderStatus")
          if (status) this.orderHistory[0].status = status
        }

        this.isLoadingOrderHistory = false
      } catch (err) {
        console.log(err)
        this.isLoadingOrderHistory = false
      }
    },
    prepareOrderData(detailOrder, detaillab, detailService) {
      const title = detailService.info.name
      const labName = detaillab.info.name
      let icon = "mdi-needle"
      if (detailService.info.image != null) {
        icon = detailService.info.image
      }

      const number = detailOrder.id
      const dateSet = new Date(
        parseInt(detailOrder.created_at.replace(/,/g, ""))
      )
      const timestamp = dateSet.getTime().toString()
      const orderDate = dateSet.toLocaleString("en-US", {
        weekday: "short", // long, short, narrow
        day: "numeric", // numeric, 2-digit
        year: "numeric", // numeric, 2-digit
        month: "long", // numeric, 2-digit, long, short, narrow
        hour: "numeric", // numeric, 2-digit
        minute: "numeric"
      })
      const status = detailOrder.status
      const dna_sample_tracking_id = detailOrder.dna_sample_tracking_id
      const order = {
        icon,
        title,
        number,
        labName,
        timestamp,
        status,
        dna_sample_tracking_id,
        orderDate
      }

      this.orderHistory.push(order)
    },
    goToOrderHistory() {
      this.$router.push({
        name: "order-history"
      })
    },
    gotoDetailOrder(order) {
      this.$router.push({
        name: "order-history-detail",
        params: { number: order.number }//butuh penyesuaian dengan data dari substrate
      })
    }
  },

  computed: {
    ...mapState({
      walletBalance: (state) => state.substrate.walletBalance,
      api: (state) => state.substrate.api,
      wallet: (state) => state.substrate.wallet,
      lastEventData: (state) => state.substrate.lastEventData
    }),
    userAddress() {
      return JSON.parse(localStorage.getKeystore())["address"]
    }
  },

  watch: {
    lastEventData() {
      if (this.lastEventData != null) {
        const dataEvent = JSON.parse(this.lastEventData.data.toString())
        if (this.lastEventData.section == "orders") {
          if (dataEvent[0].customer_id == this.wallet.address) {
            this.getOrderHistory()
          }
        }
      }
    }
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
