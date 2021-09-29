<template lang="pug">
  .customer-myTest
    Banner(
      title="My Test"
      subtitle="Here, you can request at-home medical testing so that you do not need to visit a physical facility. This includes Covid-19 testing and other diseases. All tests are anonymous-first."
    )
      template(slot="illustration")
        ui-debio-icon(:icon="mytestIllustration" :size="cardBlock ? 250 : 180" view-box="0 0 182 130" fill)
</template>

<script>
import { mytestIllustration } from "@/common/icons"

import Banner from "@/common/components/Banner.vue"

export default {
  name: "CustomerMyTest",
  
  components: {
    Banner
  },

  data: () => ({
    mytestIllustration,
    cardBlock: false
  }),

  mounted() {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 959) this.cardBlock = true
      else this.cardBlock = false
    })
  }

}
</script>

<style lang="sass" scoped>
  .customer-myTest
    &::v-deep
      .banner__subtitle
        max-width: 36.188rem !important
</style>
