<template lang="pug">
  .customer-test
    ui-debio-banner(
      title="My Test"
      subtitle="Privacy-first biomedical process. Get your own biomedical sample at home, proceed it anonymousely to expert and scientist!"
    )
      template(slot="illustration")
        ui-debio-icon(:icon="noteIllustration" :size="cardBlock ? 250 : 180" view-box="0 0 100 86" fill)

      template(slot="cta")
        ui-debio-card
          ui-debio-icon(:icon="layersIcon" slot="icon" size="34" color="#C400A5" stroke)   

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
                      )
                    div
                      div
                        span {{ item.service_info.name }}
                      div
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
                      v-if="item.status == 'Registered'"
                      height="25px"
                      width="50%"
                      dark
                      color="secondary"
                      @click="goToInstruction"
                    ) Instruction

                    Button(
                      v-if="item.status == 'ResultReady'"
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
        v-if="isBounty"
        title="Do you want to add your test result as a data bounty?"
        sub-title="You can learn more about data bounty by seeing the information"
        link="/"
        :loading="isLoading"
      )
        .modal-bounty__cta.d-flex.mt-8.justify-center
          Button(outlined color="secondary" width="100" @click="cancelBounty") Cancel
          Button(color="secondary" width="100" @click="submitBounty") Yes
</template>

<script>
import { layersIcon, noteIllustration } from "@/common/icons"
import StakingServiceTab from "./StakingServiceTab.vue"
import DataTable from "@/common/components/DataTable"
import Button from "@/common/components/Button"
import { mapState } from "vuex"
import {
  // searchOrder,
  ordersByCustomer,
  getOrdersData
} from "@/common/lib/polkadot-provider/query/orders"
import { queryLabsById } from "@/common/lib/polkadot-provider/query/labs"
import { queryServicesById } from "@/common/lib/polkadot-provider/query/services"
import localStorage from "@/common/lib/local-storage"
import dataTesting from "./dataTesting.json"
import modalBounty from "../DataBounty/modalBounty"
import {
  COVID_19,
  DRIED_BLOOD,
  URINE_COLLECTION,
  FECAL_COLLECTION,
  SALIVA_COLLECTION,
  BUCCAL_COLLEVTION
} from "@/common/constants/instruction-step.js"

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
    showing: false,
    isReady: true,
    isRegistered: true,
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
    BUCCAL_COLLEVTION
  }),

  mounted() {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 959) this.cardBlock = true
      else this.cardBlock = false
    })
  },
  async created(){
    this.onSearchInput()
  },
  methods: {
    toRequestTest() {
      this.$router.push({ name: "customer-request-test-select-lab"})
    },

    async onSearchInput() {
      this.orderHistory = dataTesting.data.map(result => ({
        ...result._source,
        id: result._id,
        updated_at: new Date(parseInt(result._source.updated_at)).toLocaleDateString(),
        created_at: new Date(parseInt(result._source.created_at)).toLocaleDateString(),
        timestamp: parseInt(result._source.created_at)
      }))
    },

    setStatusColor(status) {
      let colors = Object.freeze({
        REGISTERED: "#44921A",
        PAID: "#E27625",
        RESULTREADY: "#5640A5",
        REJECTED: "#9B1B37",
        SUBMITEDASDATABOUNTY: "#5640A5"
      })
      return colors[status.toUpperCase()]
    },

    async getOrderHistory() {
      this.isLoadingOrderHistory = true;
      try {
        this.orderHistory = [];
        const address = this.wallet.address;
        const listOrderId = await ordersByCustomer(this.api, address);

        var lengthMax = 3;
        if (listOrderId != null) {
          listOrderId.reverse();
          if (listOrderId.length < lengthMax) {
            lengthMax = listOrderId.length;
          }

          for (let i = 0; i < lengthMax; i++) {
            const detailOrder = await getOrdersData(this.api, listOrderId[i]);
            const detaillab = await queryLabsById(
              this.api,
              detailOrder.seller_id
            );
            const detailService = await queryServicesById(
              this.api,
              detailOrder.service_id
            );
            this.prepareOrderData(detailOrder, detaillab, detailService);
          }

          this.orderHistory.sort(
            (a, b) => parseInt(b.timestamp) - parseInt(a.timestamp)
          );
          const status = localStorage.getLocalStorageByName("lastOrderStatus")
          if (status) this.orderHistory[0].status = status
        }

        this.isLoadingOrderHistory = false;
      } catch (err) {
        console.log(err);
        this.isLoadingOrderHistory = false;
      }
    },

    checkLastOrder() {
      const status = localStorage.getLocalStorageByName("lastOrderStatus")
      this.isProcessed = status ? status : null
    },

    goToDetail() {
      console.log("detail")
    },

    goToStakeData() {
      console.log("stake data")
      this.isBounty = true
    },

    goToInstruction() {
      console.log("insturction")
      const pdf = "assets/Buccalcollection_compressed.pdf"//
      window.open(pdf, "_blank")
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
  .customer-
    &::v-deep
      .banner__subtitle
        max-width: 36.188rem !important

  .customer-my-test
    width: 100%
    height: 100% 
    background: #FFFFFF
    margin-top: 50px

    &__tabs
      padding: 3px
    
    &__actions
      padding: 25px
      display: flex
      align-items: center
      gap: 20px
      margin: 3px 20px
    
    &__title-detail
      margin: 0 10px 0 0
      border-radius: 10px
</style>
