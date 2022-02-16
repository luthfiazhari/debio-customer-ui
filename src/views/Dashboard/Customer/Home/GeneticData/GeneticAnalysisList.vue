<template lang="pug">
  .genetic-analysis-list
    DataTable(
      :headers="headers"
      :items="items"
    )
      template(v-slot:[`item.serviceName`]="{ item }")
        .d-flex.flex-column.genetic-analysis-list__service
          span {{ item.serviceName }}
      
      template(v-slot:[`item.fullName`]="{ item }")
        .d-flex.flex-column.genetic-analysis-list__name
          span {{ item.fullName }}

      

      template(v-slot:[`item.status`]="{ item }")
        .d-flex.flex-column.genetic-analysis-list__status
          span {{ item.status }}

    
      template(v-slot:[`item.actions`]="{ item }")
        .genetic-analysis-list__actions
          ui-debio-icon(v-if="!iconShow" :icon="eyeIcon" size="16" role="button" stroke @click="toDetail()")
          ui-debio-icon(v-if="iconDownloadShow" :icon="downloadIcon" size="16" role="button" stroke @click="toDownload()")

</template>

<script>

import { mapState } from "vuex"
import { eyeIcon, downloadIcon } from "@/common/icons"
import DataTable from "@/common/components/DataTable"
import { geneticAnalysisByOwner, geneticAnalysisStorage, geneticAnalysisOrders } from "@/common/lib/polkadot-provider/query/genetic-analysis"
import { geneticAnalysts, geneticAnalystServices } from "@/common/lib/polkadot-provider/query/genetic-analyst"

export default {
  name: "GeneticAnalysisList",

  components: {
    DataTable
  },

  computed: {
    ...mapState({
      api: (state) => state.substrate.api,
      wallet: (state) => state.substrate.wallet,
      lastEventData: (state) => state.substrate.lastEventData,
      web3: (state) => state.metamask.web3
    })
  },

  data: () => ({
    eyeIcon,
    downloadIcon,
    headers: [
      {
        text: "Service Name",
        value: "serviceName",
        sortable: true
      },
      {
        text: "Analyst Name",
        value: "analystName",
        sortable: false
      },
      {
        text: "Order Date",
        value: "createdAt",
        sortable: true
      },
      {
        text: "Update Date",
        value: "updatedAt",
        sortable: true
      },
      {
        text: "Status",
        value: "status",
        sortable: true
      },
      {
        text: "Action",
        value: "actions",
        sortable: false
      }
    ],
    items: [],
    iconShow: true,
    iconDownloadShow: true
  }),

  async mounted() {
    this.fetchGeneticAnalysisData()
    this.checkStatusData()
  },

  methods: {
    async fetchGeneticAnalysisData() {
      this.items = []
      const accountId = this.wallet.address
      const trackingId = await geneticAnalysisByOwner(this.api, accountId)

      for (let i = 0; i < trackingId.length; i++) {
        const geneticAnalysis = await geneticAnalysisStorage(this.api, trackingId[i])

        const dateCreated = new Date(parseInt(geneticAnalysis.createdAt.replace(/,/g, "")))
        const dateUpdated = new Date(parseInt(geneticAnalysis.updatedAt.replace(/,/g, "")))

        const updatedAt = dateUpdated.toLocaleString("en-GB", { 
          day: "numeric", // numeric, 2-digit
          year: "numeric", // numeric, 2-digit
          month: "short" // numeric, 2-digit, long, short, narrow
        })

        const createdAt = dateCreated.toLocaleString("en-GB", {
          day: "numeric", // numeric, 2-digit
          year: "numeric", // numeric, 2-digit
          month: "short" // numeric, 2-digit, long, short, narrow
        })

        const geneticAnalysisTrackingId = geneticAnalysis.geneticAnalystId

        const geneticAnalystsData = await geneticAnalysts(this.api, geneticAnalysisTrackingId)
        const fullName = (geneticAnalystsData.info.firstName + " " + geneticAnalystsData.info.lastName)

        const orderId = geneticAnalysis.geneticAnalysisOrderId
        const geneticAnalysisOrdersData = await geneticAnalysisOrders(this.api, orderId)

        const serviceId = geneticAnalysisOrdersData.serviceId
        const geneticAnalystServicesData = await geneticAnalystServices(this.api, serviceId)

        const dataResult = {
          trackingId: trackingId[i],
          serviceName: geneticAnalystServicesData.info.name,
          analystName: fullName,
          createdAt: createdAt,
          updatedAt: updatedAt,
          status: geneticAnalysis.status
        }
        this.items.push(dataResult)
      }
    },

    toDetail() {
      // console.log(geneticId)
      // Open new tab with sending props geneticId for fetch detail
    },

    toDownload(){
      //Do something
    },

    checkStatusData() {
      for(let i = 0; i < this.items.length; i++) {
        if(this.items.length.status == "ResultReady") {
          this.iconDownloadShow = false
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "@/common/styles/mixins.sass"

  .genetic-analysis-list
    padding: 0 !important
    margin: -50px -28px 0 -28px


    &__service
      width: 117px
    
    &__fullName
      width: 480px

    &__status
      width: 65px

    &__actions
      width: 45px
      display: flex
      align-items: center
      justify-content: center
      gap: 20px
</style>
