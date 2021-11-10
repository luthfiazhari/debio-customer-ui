<template lang="pug">
  .customer-test
    ui-debio-banner.customer-test__banner(
      title="My Test"
      subtitle="Privacy-first biomedical process. Get your own biomedical sample at home, proceed it anonymousely to expert and scientist!"
      with-decoration
      gradientColor="tertiary"
    )
      template(slot="illustration")
        ui-debio-icon(
          :icon="medicalResearchIllustration"
          :size="cardBlock ? 250 : 180"
          view-box="10 0 245 175"
          fill
        )

    .customer-my-test
      .customer-my-test__tabs
        template
          v-tabs(v-model="tabs")
            v-tab Test List
            
            v-tab Stake Service
              
        v-tabs-items(v-model="tabs")
          v-tab-item
            .customer-my-test__table
              DataTable(
                :headers="headers"
                :items="orderHistory"
              )
                template(class="titleSection" v-slot:[`item.service_info.name`]="{item}")
                  div(class="detailLab d-flex align-center")
                    .customer-my-test__title-detail
                      ui-debio-avatar(
                        :src="'https://picsum.photos/200/300'"
                        size="42"
                        rounded
                      )
                    div
                      div.customer-my-test__title-name
                        span {{ item.service_info.name }}
                      div.customer-my-test__title-number
                        span {{ item.dna_sample_tracking_id}}

                template(v-slot:[`item.actions`]="{ item }")
                  .customer-my-test__actions
                    Button(
                      height="25px"
                      width="50%"
                      dark
                      color="primary"
                      :to="{ name: 'order-history-detail', params: item}"
                    ) Detail
                    
                    Button(
                      v-if="item.status != 'ResultReady'"
                      v-show="item.status == 'Registered'"
                      height="25px"
                      width="50%"
                      dark
                      color="secondary"
                      @click="goToInstruction(item.service_info.dna_collection_process)"
                    ) Instruction

                    Button(
                      v-if="item.status != 'Registered'"
                      v-show="item.status == 'ResultReady'"
                      height="25px"
                      width="50%"
                      dark
                      color="secondary"
                      @click="goToStakeData"
                    ) Add as Bounty

                template(v-slot:[`item.status`]="{item}")
                  .customer-my-test__status
                  span(:style="{color: setStatusColor(item.status)}") {{ item.status }}
          v-tab-item
            StakingServiceTab

      modalBounty(
        :show="isBounty"
        title="Do you want to add your test result as a data bounty?"
        sub-title="You can learn more about data bounty by seeing the information"
        link="/"
        :loading="isLoading"
      )
        .modal-bounty__cta.d-flex.mt-8
          Button(outlined color="secondary" width="100" @click="cancelBounty") Cancel
          Button(color="secondary" width="100" @click="submitBounty") Yes
</template>

<script>
import { layersIcon, noteIllustration, medicalResearchIllustration } from "@/common/icons"
import StakingServiceTab from "./StakingServiceTab.vue"
import DataTable from "@/common/components/DataTable"
import Button from "@/common/components/Button"
import { mapState } from "vuex"
import {
  ordersByCustomer,
  getOrdersData
} from "@/common/lib/polkadot-provider/query/orders"
import { queryLabsById } from "@/common/lib/polkadot-provider/query/labs"
import { queryServicesById } from "@/common/lib/polkadot-provider/query/services"
import localStorage from "@/common/lib/local-storage"
import modalBounty from "./modalBounty.vue"
import {
  COVID_19,
  DRIED_BLOOD,
  URINE_COLLECTION,
  FECAL_COLLECTION,
  SALIVA_COLLECTION,
  BUCCAL_COLLEVTION
} from "@/common/constants/instruction-step.js"
import dataTesting from "./dataTesting.json"

export default {
  name: "MyTest",

  components: {
    StakingServiceTab,
    DataTable,
    Button,
    modalBounty
  },

  data: () => ({ 
    layersIcon, 
    noteIllustration, 
    cardBlock: false,
    documents: null,
    tabs: null,
    isProcessed: true,
    isBounty: false,
    isLoading: false,
    orderHistory: [],
    btnLabel: "",
    headers: [
      { text: "Service Name", value: "service_info.name", sortable: true },
      { text: "Lab Name", value: "lab_info.name", sortable: true },
      { text: "Order Date", value: "created_at", sortable: true },
      { text: "Last Update", value: "updated_at", sortable: true },
      { text: "Test Status", value: "status", sortable: true },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "center",
        width: "5%"
      }
    ],
    COVID_19,
    DRIED_BLOOD,
    URINE_COLLECTION,
    FECAL_COLLECTION,
    SALIVA_COLLECTION,
    BUCCAL_COLLEVTION,
    medicalResearchIllustration,
    isLoadingOrderHistory: false
  }),

  mounted() {
    // this.getOrderHistory()
    // console.log(this.orderHistory, "<=== order history saat mounted")
    this.onSearchInput()
  },

  methods: {
    toRequestTest() {
      this.$router.push({ name: "customer-request-test-select-lab"})
    },

    async onSearchInput() {
      console.log("masuk mounted")
      this.orderHistory = dataTesting.data.map(result => ({
        ...result._source,
        id: result._id,
        updated_at: new Date(parseInt(result._source.updated_at)).toLocaleDateString(),
        created_at: new Date(parseInt(result._source.created_at)).toLocaleDateString(),
        timestamp: parseInt(result._source.created_at)
      }))
    },

    setStatusColor(status) { //change color for each order status
      let colors = Object.freeze({
        REGISTERED: "#6F4CEC",
        PAID: "#44921A",
        UNPAID: "#FAAD15",
        FULFILLED: "#44921A",
        CANCELLED: "#9B1B37",
        FAILED: "#9B1B37",
        RESULTREADY: "#6F4CEC",
        REJECTED: "#9B1B37",
        SUBMITEDASDATABOUNTY: "#5640A5"
      })
      return colors[status.toUpperCase()]
    },

    async getOrderHistory() {//this for get order from substrate
      try {
        const dummyAddress = "5Da5aHSoy3Bxb7Kxo4HuPLY7kE9FKxEg93dVhCKeXJ5JGY25"
        this.isLoadingOrderHistory = true
        // const address = this.wallet.address
        const listOrderId = await ordersByCustomer(this.api, dummyAddress)
  
        for (let i = 0; i < listOrderId.length; i++) {
          const detailOrder = await getOrdersData(this.api, listOrderId[i])
          const detaillab = await queryLabsById(this.api, detailOrder.seller_id)
          const detailService = await queryServicesById(this.api, detailOrder.service_id);
          this.prepareOrderData(detailOrder, detaillab, detailService)
        }
        
        this.orderHistory.sort(
          (a, b) => parseInt(b.timestamp) - parseInt(a.timestamp)
        )
  
        const status = localStorage.getLocalStorageByName("lastOrderStatus")
        if (status) this.orderHistory[0].status = status
        
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoadingOrderHistory = false
      }
    },

    prepareOrderData(detailOrder, detaillab, detailService) {
      console.log(detailOrder, "detail order")
      console.log(detaillab, "detail lab")
      console.log(detailService, "detail service")
      
      const title = detailService.info.name
      const description = detailService.info.description
      const serviceImage = detailService.info.image
      const category = detailService.info.category
      const test_result_sample = detailService.info.test_result_sample // eslint-disable-line
      const prices_by_currency = detailService.info.prices_by_currency // eslint-disable-line
      const expected_duration = detailService.info.expected_duration // eslint-disable-line
      const service_id = detailService.id // eslint-disable-line
      const dna_collection_process = detailService.info.dna_collection_process // eslint-disable-line
      const service_info = { // eslint-disable-line
        name: title,
        description: description,
        image: serviceImage,
        category: category,
        test_result_sample: test_result_sample,
        prices_by_currency: prices_by_currency,
        expected_duration: expected_duration,
        dna_collection_process: dna_collection_process
      }

      const labName = detaillab.info.name
      const address = detaillab.info.address
      const labImage = detaillab.info.profile_image
      const lab_id = detaillab.info.box_public_key // eslint-disable-line
      const lab_info = { // eslint-disable-line
        name: labName,
        address: address,
        profile_image: labImage
      }

      let icon = "mdi-needle";
      if (detailService.info.image != null) {
        icon = detailService.info.image;
      }

      const number = detailOrder.id
      const dateSet = new Date(
        parseInt(detailOrder.created_at.replace(/,/g, ""))
      )
      const dateUpdate = new Date(
        parseInt(detailOrder.updated_at.replace(/,/g, ""))
      )
      const timestamp = dateSet.getTime().toString();
      const orderDate = dateSet.toLocaleString("en-US", {
        weekday: "short", // long, short, narrow
        day: "numeric", // numeric, 2-digit
        year: "numeric", // numeric, 2-digit
        month: "long", // numeric, 2-digit, long, short, narrow
        hour: "numeric", // numeric, 2-digit
        minute: "numeric"
      })
      const updated_at = dateUpdate.toLocaleString("en-US", { // eslint-disable-line
        day: "numeric", // numeric, 2-digit
        year: "numeric", // numeric, 2-digit
        month: "long" // numeric, 2-digit, long, short, narrow
      })
      const created_at = dateSet.toLocaleString("en-US", { // eslint-disable-line
        day: "numeric", // numeric, 2-digit
        year: "numeric", // numeric, 2-digit
        month: "long" // numeric, 2-digit, long, short, narrow
      });
      const status = detailOrder.status
      const dna_sample_tracking_id = detailOrder.dna_sample_tracking_id // eslint-disable-line
      const order = {
        icon,
        number,
        timestamp,
        status,
        dna_sample_tracking_id,
        orderDate,
        service_id,
        service_info,
        lab_id,
        lab_info,
        updated_at,
        created_at
      }

      this.orderHistory.push(order)
    },

    checkLastOrder() {
      const status = localStorage.getLocalStorageByName("lastOrderStatus")
      this.isProcessed = status ? status : null
    },

    goToStakeData() {
      console.log("stake data")
      console.log(this.isBounty, " before")
      this.isBounty = true
      console.log(this.isBounty, " afteer")
    },

    goToInstruction(item) {
      console.log("insturction")
      console.log(item)
      if (item == "Covid 19 Saliva Test") {
        window.open(this.COVID_19, "_blank")
      }
      if (item == "Blood Cells - Dried Blood Spot Collection Process") {
        window.open(this.DRIED_BLOOD, "_blank")
      }
      if (item == "Epithelial Cells - Buccal Swab Collection Process") {
        window.open(this.BUCCAL_COLLEVTION, "_blank")
      }
      if (item == "Fecal Matters - Stool Collection Process") {
        window.open(this.FECAL_COLLECTION, "_blank")
      }
      if (item == "Saliva - Saliva Collection Process") {
        window.open(this.SALIVA_COLLECTION, "_blank")
      }
      if (item == "Urine - Clean Catch Urine Collection Process") {
        window.open(this.URINE_COLLECTION, "_blank")
      }
    },

    submitBounty() {
      this.isLoading = true
    },

    cancelBounty() {
      this.isBounty = false
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
      return JSON.parse(localStorage.getKeystore()) ["Address"]
    }


  }
}
</script>

<style lang="sass" scoped>
  .customer-test
    &::v-deep
      

  .customer-my-test
    width: 100%
    height: 100% 
    background: #FFFFFF


    &__tabs
      padding: 2px
    
    &__table
      padding-top: 0px !important
      margin-top: 0px !important

    &__actions
      padding: 25px
      display: flex
      align-items: center
      gap: 20px
      margin: 3px 20px
    
    &__title-detail
      margin: 0 10px 0 0
      border-radius: 10px
    
    &__title-number
      color: #8C8C8C


  .modal-bounty__cta
    justify-content: space-around !important
  
  .degenics-datatable-card
    padding-top: 0px !important
    
  .degenics-data-table
    margin-top: 0px !important
</style>
