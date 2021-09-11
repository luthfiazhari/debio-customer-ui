<template lang="pug">
div Customer
  v-app
    //- v-app-bar(
    //-   app
    //-   color="secondary"
    //-   dark
    //-   class="dg-app-bar"
    //-   clipped-left
    //- )
    //-   div.dg-app-bar-items-container
    //-     a(
    //-       href="https://www.degenics.com/"
    //-       target="_blank"
    //-       style="text-decoration: none"
    //-     )
    //-       div(class="d-flex align-center")
    //-         v-img(
    //-           alt="Vuetify Logo"
    //-           class="shrink mr-2"
    //-           contain
    //-           src="@/assets/debio-logo.png"
    //-           transition="scale-transition"
    //-           width="40"
    //-         )
    //-         div(class="text-h6 font-weight-bold light_primary--text")
        v-spacer

    NavigationDrawer
    router-vue
</template>

<script>
import NavigationDrawer from "@/common/components/NavigationDrawer"

export default {
  name: "Dashboard",
  components: {
    NavigationDrawer
  }
}
</script>

<style lang="scss">
  @import "~vuetify/src/styles/styles.sass";
  @media screen and (min-width: 960px) {
    div.dg-app-bar-items-container {
      max-width: 900px !important;
    }
  }
  @media screen and (min-width: 1264px) {
    div.dg-app-bar-items-container {
      max-width: 1185px !important;
    }
  }
  @media screen and (min-width: 1904px) {
    div.dg-app-bar-items-container {
      max-width: 1400px !important;
    }
  }
  .dg-app-bar {
    > div {
      justify-content: center;

      div.dg-app-bar-items-container {
        display: flex;
        width: 100%;
      }
    }
  }
  .dg-dashboard-main {
    background: #e5e5e5;
  }
</style>