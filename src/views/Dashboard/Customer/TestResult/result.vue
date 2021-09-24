<template lang="pug">
  div
    v-container
      v-row
        v-col(cols="12" md="8")
          ui-debio-card(width="100%")
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
        v-col(cols="12" md="4")
          //- div(class="mb-2")
          div(v-for="(file, index) in files" :key="file.name" class="mb-2")
            ui-debio-card(
              tiny-card
              with-icon
            )
              ui-debio-icon(
                slot="icon"
                :icon="download"
              )

</template>

<script>
import { download } from "@/common/icons"

export default {
  name: "test-result",
  components: {},
  data: () => ({
    download,
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

<style>

</style>