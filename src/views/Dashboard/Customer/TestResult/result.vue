<template lang="pug">
  div
    v-container
      ui-debio-card(width="100%")
        v-row.resultBody
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
                    height="500px"
                    width="100%"
                  )
                  //- span(v-else) {{reportResult}}
                  div
                    span {{dummyResult.title}} 
                    br
                  div
                    span {{dummyResult.subTitle}}
                  div
                    span {{dummyResult.content}}
          v-col(cols="12" md="3")
            //- div(class="mb-2")
            div.buttonSection(v-for="(file, index) in files" :key="file.name")
              ui-debio-card(
                :title="file.fileTitle"
                :sub-title="file.fileSubTitle"
                tiny-card
                with-icon
                @click="actionDownload(file.fileType)"
              )
                ui-debio-icon(
                  slot="icon"
                  size="33"
                  :icon="downloadIcon"
                  stroke
                  color="#c400a5"
                )
            //- ui-debio-card(
            //-   class="mt-2"
            //-   tiny-card
            //-   with-icon
            //-   title="Data Bounty"
            //-   sub-title="Provide your data anonymously and get DBIO Reward"
            //-   )
            //-     ui-debio-icon(
            //-       size="30"
            //-       slot="icon"
            //-       :icon="debioIcon"
            //-       stroke
            //-     )
            
            ui-debio-card(
              class="mt-2"
              tiny-card
              with-icon
              title="Rating"
              sub-title="Help us improve your test experience by rating this service"
              @click="actionRating"
              )
                ui-debio-icon(
                  size="33"
                  slot="icon"
                  :icon="starIcon"
                  stroke
                  color="#c400a5"
                )

</template>

<script>
import { downloadIcon, debioIcon, creditCardIcon, starIcon } from "@/common/icons"

export default {
  name: "test-result",
  components: {},
  data: () => ({
    downloadIcon,
    debioIcon,
    creditCardIcon,
    starIcon,
    resultLoading: false,
    reportResult: "",
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
      }
    ],
    dummyResult: {
      title: "Whole Genome Sequencing Test Report",
      subTitle: "GSI Lab, 5 July 2021",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  }),

  methods: {
    actionDownload(type) {

      console.log(type)
    },

    actionRating() {
      console.log("rating")
    }
  }


}
</script>

<style lang="sass">
  .resultBody
    margin: 25px 0 0 0
  .buttonSection
    margin: 8px 0 45px 0
  .v-card__text
    height: 500px

</style>
