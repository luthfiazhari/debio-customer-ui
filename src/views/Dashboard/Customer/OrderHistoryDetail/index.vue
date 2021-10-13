<template lang="pug">
  .customer-orderHistoryDetail
    div.body
      ui-debio-card(
        width="100%"
        height="1000px"
      )
        div.header
          span(align="center") HEADER
        div.bodyContent
          v-row
            v-col
              div.leftSection.box
                div.topRow
                  div.titleHead
                    span Lab details
                  div
                    ui-debio-card(
                      width="100%"
                      height="100%"
                    )
                      div.box
                        ui-debio-icon(
                          :icon="microscopeIcon"
                          :size="52"
                          stroke
                          color="linear-gradient(81.43deg, #6344D0 2.53%, #9D82FF 100%)"
                          view-box="-5 0 55 55"
                        )
                      div content
                div.middleRow
                  div
                    span Products details
                  div
                    ui-debio-card(
                      width="100%"
                      height="100%"
                    )
                      div.box
                        ui-debio-icon(
                          :icon="microscopeIcon"
                          :size="52"
                          stroke
                          color="linear-gradient(81.43deg, #6344D0 2.53%, #9D82FF 100%)"
                          view-box="-5 0 55 55"
                        )
                      div content
                div.botomRow
                  span.specimentNumber speciment number
                  v-spacer
                  span.number 0131-1324-1323

            v-col
              div.rightSection.box
                div
                  div.imageBanner.box
                    ui-debio-icon(
                      :icon="qualityControlBanner"
                      :size="295"
                      view-box="-20 0 300 125"
                    )
                div.statusSection
                  span.status Registered
                  span.detail Details
                div.statusStepper



</template>

<script>
import {
  microscopeIcon,
  weightLifterIcon,
  fileSearchIcon,
  hairIcon,
  familyTreeIcon,
  dnaIcon,
  foodAppleIcon,
  pillIcon,
  virusIcon,
  registeredBanner, //"0 0 182 135" size 185
  receivedBanner, //"-20 0 300 135" size 300
  wetworkBanner, //"-20 0 300 150" size 295
  resultReadyBanner, //"-20 0 300 150" size 295
  qualityControlBanner //"-20 0 300 125" size 295
} from "@/common/icons"
import Banner from "@/common/components/Banner.vue"

export default {
  name: "OrderHistoryDetail",
  components: { Banner },
  data: () => ({
    microscopeIcon,
    fileSearchIcon,
    hairIcon,
    familyTreeIcon,
    dnaIcon,
    foodAppleIcon,
    pillIcon,
    virusIcon,
    weightLifterIcon,
    registeredBanner,
    receivedBanner,
    wetworkBanner,
    resultReadyBanner,
    qualityControlBanner,
    cardBlock: false,
    DnaSampleStatus: "registered",
    size: 0,
    viewBox: "",
    dnaStatus: "",
    dnaDetail: "",
    orderDetail: [
      {
        status: "Registered", name: "Registered", detail: "Your request has been registered, please send sample in 48 hours! see instruction here", size: 185, viewBox: "0 0 182 135"
      },
      {
        status: "Received", name: "Received", detail: "Your sample has been arrived at the lab", size: 300, viewBox: "-20 0 300 135"
      },
      {
        status: "QualityControlled", name: "Quality Control", detail: "Your sample has passed the quality control", size: 295, viewBox: "-20 0 300 125"
      },
      {
        status: "WetWork", name: "Wet Work", detail: "Your sample is being analyzed by the Lab", size: 295, viewBox: "-20 0 300 150"
      },
      {
        status: "ResultReady", name: "Result Ready", detail: "Your sample has been successfully analyzed", size: 295, viewBox: "-20 0 300 150"
      }
    ]
  }),

  mounted() {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 959) this.cardBlock = true
      else this.cardBlock = false
    })
    this.bannerSwitcher()
  },

  methods: {
    bannerSwitcher() {
      for (let i = 0; i < this.orderDetail.length; i++) {
        if (this.orderDetail[i].status == this.DnaSampleStatus) {
          this.dnaStatus = this.orderDetail[i].name
          this.dnaDetail = this.orderDetail[i].detail
          this.size = this.orderDetail[i].size
          this.viewBox = this.orderDetail[i].viewBox
        }
      }
    },

    iconSwitcher() {

    }
    //lempar banner gimana ? dan stepper belom
  }

}
</script>

<style lang="sass">
  .customer-orderHistoryDetail
    margin: 10px
    &::v-deep
      .banner__subtitle
        max-width: 36.188rem !important
    .header
      align: center
    .box
      border: solid 0.5px #E4E4E4
    .bodyContent
      margin: 5px 0 0 0
    .leftSection
      .topRow
        margin: 5px 0 10px 0
      .middleRow
        margin: 5px 0 10px 0
      .botomRow
        display: flex
        margin: 5px 0 10px 0
        .specimentNumber
        .number
          align: flex-end

    .rightSection

    .titleHead
      margin: 0 0 0 17px
    .imageBanner
      width: 481px
      height:184px
      margin: 15px
      align-items: center
      display: flex
      flex-direction: column
      background: linear-gradient(81.43deg, #6344D0 2.53%, #9D82FF 100%)

    .statusSection
      margin: 0 0 0 15px
      display: flex
      flex-direction: column
      .status
        font-size: 14px
        font-weight: 600
        line-height: 20px
        margin: 0 0 10px 0
      .detail
        font-size: 12px
        font-weight: 400
        line-height: 16px
</style>
