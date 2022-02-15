<template lang="pug">
  .genetic-analysis-list
    DataTable(
      :headers="headers"
      :items="items"
    )

</template>

<script>

import { mapState } from "vuex"
import { eyeIcon, downloadIcon } from "@/common/icons"
import DataTable from "@/common/components/DataTable"
import { geneticAnalysisByOwner, geneticAnalysisStorage, geneticAnalysisOrders } from "@/common/lib/polkadot-provider/query/genetic-analysis"
import { geneticAnalysts, geneticAnalystServices } from "@/common/lib/polkadot-provider/query/genetic-analyst"
// import { queryGeneticDataByOwner, queryGeneticDataById } from "@/common/lib/polkadot-provider/query/genetic-data"

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
    items: []
  }),

  async mounted() {
    this.fetchGeneticAnalysisData()
  },

  methods: {
    async fetchGeneticAnalysisData() {
      this.items = []
      // const accountId = this.wallet.address
      const accountId = "5GxL2PAEqGGnJNCsiYBv8qSZKNRcd8mn7tuDj1Hd73qe23eF"
      const trackingId = await geneticAnalysisByOwner(this.api, accountId)
      // console.log(accountId, "account")
      // console.log(trackingId, "data items")

      for (let i = 0; i < trackingId.length; i++) {
        console.log(trackingId[i], [i], "tracking ID")
        const geneticAnalysis = await geneticAnalysisStorage(this.api, trackingId[i])
        console.log("abis looping", [i])
        console.log(geneticAnalysis, "genetic storage")

        const updatedAt = geneticAnalysis.updatedAt.toLocaleString("en-GB", { 
          day: "numeric", // numeric, 2-digit
          year: "numeric", // numeric, 2-digit
          month: "short" // numeric, 2-digit, long, short, narrow
        })

        const createdAt = geneticAnalysis.createdAt.toLocaleString("en-GB", {
          day: "numeric", // numeric, 2-digit
          year: "numeric", // numeric, 2-digit
          month: "short" // numeric, 2-digit, long, short, narrow
        })

        const geneticAnalysisTrackingId = geneticAnalysis.geneticAnalystId
        console.log(geneticAnalysisTrackingId, "geneticAnalysisTrackingId")


        const geneticAnalystsData = await geneticAnalysts(this.api, geneticAnalysisTrackingId)
        console.log(geneticAnalystsData, "geneticAnalystData")
        const fullName = (geneticAnalystsData.info.firstName, " ", geneticAnalystsData.info.lastName)


        const orderId = geneticAnalysis.geneticAnalysisOrderId
        const geneticAnalysisOrdersData = await geneticAnalysisOrders(this.api, orderId)
        console.log(geneticAnalysisOrdersData, "geneticAnalysisOrderData")


        const serviceId = geneticAnalysisOrdersData.serviceId
        const geneticAnalystServicesData = await geneticAnalystServices(this.api, serviceId)
        console.log(geneticAnalystServicesData, "geneticAnalystsServiceData")


        const dataResult = {
          serviceName: geneticAnalystServicesData.info.name,
          analystName: fullName,
          createdAt: createdAt,
          updatedAt: updatedAt
        }
        this.items.push(dataResult)
      }
    }
  }
}
</script>

<style>

</style>
