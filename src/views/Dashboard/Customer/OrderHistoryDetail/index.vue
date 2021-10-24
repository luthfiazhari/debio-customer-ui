<template lang="pug">
  .customer-orderHistoryDetail
    div.body
      ui-debio-card(
        width="100%"
        height="1000px"
      )
        div.headerSection
          span Test Summary
        div.bodyContent
          v-row
            v-col
              div.leftSection.box.fillColor
                div.topRow.fillColor_II
                  div.topHead
                    span Lab Details
                  div.box
                    div.topBody
                      ui-debio-icon.dataIcon.box(
                        :icon="microscopeIcon"
                        :size="92"
                        stroke
                        :stroke-width="0"
                        color="linear-gradient(180deg, #716CFF 0%, #B267FF 100%)"
                        view-box="-5 0 55 55"
                      )
                      div.topContentWraper
                        span title
                        span Details

                div.middleRow.fillColor_II
                  div.topHead
                    span Product Details
                  div.box
                    div.topBody
                      ui-debio-icon.dataIcon.box(
                        :icon="microscopeIcon"
                        :size="92"
                        stroke
                        :stroke-width="0"
                        color="linear-gradient(180deg, #716CFF 0%, #B267FF 100%)"
                        view-box="-5 0 55 55"
                      )
                      div.topContentWraper
                        span title
                        span Details
                div.botomRow
                  span Specimen Number
                  v-spacer
                  span H8QT-L550-8X92


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
                  div stepper



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
    this.checkOrderDetail()
  },

  methods: {
    checkOrderDetail() {
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

    },
    //lempar banner gimana ? dan stepper belom
    bannerSwitcher() {

    }
  }

}
</script>

<style lang="sass">
  .customer-orderHistoryDetail
    margin: 10px
    &::v-deep
      .banner__subtitle
        max-width: 36.188rem !important
    .headerSection
      text-align: center
      margin: 25px 0 50px 0
      font-weight: 600
      font-size: 24px
    .box
      border: solid 0.5px #E4E4E4

    .fillColor
      height: 456px
    .fillColor_II
      height: 150px
    .bodyContent
      margin: 5px 0 0 0
    .leftSection
      .topRow
        margin: 25px 15px 15px 15px
      .middleRow
        margin: 25px 15px 15px 15px
      .botomRow
        display: flex
        margin: 21px 15px 15px 15px
        font-weight: 600
        font-size: 14px
        line-height: 20px

    .rightSection
    .bodyWraper
      padding: 10px

    .dataIcon
      padding: 10px
      margin: 10px

      .dataContent
        margin: 0 0 0 5px
    .topHead
      margin: 0 0 10px 0
      font-weight: 600
      font-size: 20px
      line-height: 23px
    .topBody
      display: flex
    .topContentWraper
      display: flex
      flex-direction: column
      margin: 5px 0 5px 5px
      justify-content: space-evenly

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
