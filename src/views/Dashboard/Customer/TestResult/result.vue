<template lang="pug">
  div
    v-container
      ui-debio-card(width="100%")
        v-row
          v-col(cols="12" md="9")
            ui-debio-card(width="100%" height="100%" class="mt-2")
              template
                v-progress-linear(
                  v-if="resultLoading"
                  indeterminate
                  color="primary"
                )
                v-card-text
                  embed(
                    :src="reportResult"
                    type="application/pdf"
                    v-if="isDataPdf"
                    scrolling="auto"
                    height="1000px"
                    width="100%"
                  )
                  span(v-else) {{reportResult}}
          v-col(cols="12" md="3")
            //- div(class="mb-2")
            div(v-for="(file, index) in files" :key="file.name" class="mt-2")
              ui-debio-card(
                :title="file.fileTitle"
                :sub-title="file.fileSubTitle"
                tiny-card
                with-icon
              )
                ui-debio-icon(
                  slot="icon-prepend"
                  size="10"
                  :icon="downloadIcon"
                  stroke
                )
            ui-debio-card(
              class="mt-2"
              tiny-card
              with-icon
              title="Data Bounty"
              sub-title="Provide your data anonymously and get DBIO Reward"
              )
                ui-debio-icon(
                  size="10"
                  slot="icon-prepend"
                  :icon="debioIcon"
                  stroke
                )

</template>

<script>
import { downloadIcon, debioIcon } from "@/common/icons"

export default {
  name: "test-result",
  components: {},
  data: () => ({
    downloadIcon,
    debioIcon,
    files: [
      {
        fileType: "report",
        fileName: "DNA Sequence" + " Report",
        fileLink: "https://ipfs.io/ipfs/QmdHkXZ2613Vx13dWQsvULsrDW5ggS31ahP4F3sNCKe6eD",
        fileTitle: "Download Report",
        fileSubTitle: "Download Your Test Report"
      },
      {
        fileType: "result",
        fileName: "DNA Sequence" + " Result",
        fileLink: "https://ipfs.io/ipfs/QmRSQGh9zsjGnG2wQ2pLLX5gKZs1ufF1tp7aBgNAZmzJd9",
        fileTitle: "Download Raw Data",
        fileSubTitle: "Download Your Genomic Data"
      },
    ]
  }),


}
</script>

<style lang="scss">

</style>