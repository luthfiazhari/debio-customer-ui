<style lang="scss">
.sidebar-text{
  text-transform: none !important;
  letter-spacing: 0 !important;
  font-size: 13pt !important;
}
.dg-raleway-font{
  font-family: 'Raleway', sans-serif;
}
.btn-drawer{
  text-align: left;
  padding-left: 0%;
  align-content: flex-start;
}
.lineDivider{
  margin-left: 35px;
  margin-right: 35px;
  margin-top: 5px;
  border-color: #c400a5 !important;
}
.footerDrawer{
  align-content:flex-end
}
.footer{
  align-items: flex-start;
  align-content: flex-start;
  text-align: left;
}
</style>

<template lang="pug">
  v-Navigation-drawer(
    app
    clipped
    fixed
    permanent
    :width="this.width"
    class="mr-10 pt-10 dg-raleway-font"
  )
    //- v-toolbar(
    //- flat
    //- class="text-h7 secondary--text "
    //- style="margin-top:50px;"
    //- )
    
    //- v-app-bar(
    //-   app
    //-   color="secondary"
    //-   dark
    //-   class="dg-app-bar"
    //-   clipped-left
    //- )

    div
      a(
        href="https://www.degenics.com/"
        target="_blank"
        style="text-decoration: none"
      )
        div(class="d-flex align-center")
          v-img(
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="@/assets/debio-logo.png"
            transition="scale-transition"
            width="40"
          )
          div(class="text-h6 font-weight-bold light_primary--text")
    v-flex
      v-container(
        class="ml-5 pt-2 pb-2"
        v-for="(item, key) in drawerButtons" :key="key")
          //- v-btn(
          //-   v-if="item.href"
          //-   :class="item.active ? 'font-weight-bold sidebar-text primary--text' : 'font-weight-bold sidebar-text'"
          //-   text
          //-   @click="openHref(item.href)"
          //- ) 
          //-   v-icon(
          //-     left
          //-     dark
          //-     src="mdi-cloud-upload"
          //-   ) mdi-cloud-upload {{ item.text }}
          //- v-btn(
          //-   v-else
          //-   :class="item.active ? 'font-weight-bold sidebar-text primary--text' : 'font-weight-bold sidebar-text'"
          //-   text
          //-   @click="goLink(item.href)"
          //-   :disabled="item.disabled != false"
          //- )
          //-   span(class="text-left") {{ item.text }}
            


          Button.btn-drawer(
            v-if="item.href"
            :class="item.active ? 'font-weight-bold sidebar-text primary--text' : 'font-weight-bold sidebar-text'"
            text
            :width="width"
            :color="'black'"
            outlined
            @click="openHref(item.href)"
            :height="'35px'"
          ) 
            v-icon(
              left
              dark
              src="mdi-cloud-upload"
            ) mdi-cloud-upload {{ item.text }}
          Button.btn-drawer(
            v-else
            outlined
            :class="item.active ? 'font-weight-bold sidebar-text primary--text' : 'font-weight-bold sidebar-text'"
            text
            @click="goLink(item.href)"
            :width="width"
            :color="'black'"
            :disabled="item.disabled != false"
            :height="'35px'"
          )
            span(class="text-left") {{ item.text }}
      
      v-divider.lineDivider
      v-container(class="ml-5 pt-2 pb-2")
        v-container
          Button(
            outlined
            :height="'35px'"
            class="font-weight-bold sidebar-text primary--text mt-4"
            :color="'#c400a5'") Request a Test
          
          Button(
            outlined
            :height="'35px'"
            class="font-weight-bold sidebar-text primary--text mt-4"
            :color="'#c400a5'") Upload EMR

        v-spacer
        v-contain.footerDrawer
          Button(
            class="sidebar-text mt-4"
            :color="'grey'"
            :height="'35px'"
            outlined
            small
          ) 
            div.footer
              p Help and
              p Documentation
  //- <v-navigation-drawer
  //-   app
  //-   clipped
  //-   fixed
  //-   permanent
  //-   :width="this.width"
  //-   class="mr-10 pt-10 dg-raleway-font"
  //- >
  //-   <v-toolbar flat class="text-h7 secondary--text " style="margin-top:90px;">
  //-     <v-flex>
  //-       <v-container
  //-         class="pt-1 pb-1"
  //-         v-for="(item, key) in drawerButtons" :key="key"
  //-       >
  //-         <v-btn
  //-           v-if="item.href"
  //-           :class="item.active ? 'font-weight-bold sidebar-text primary--text' : 'font-weight-bold sidebar-text'"
  //-           text
  //-           @click="openHref(item.href)"
  //-         >{{ item.text }}</v-btn>
  //-         <v-btn
  //-           v-else
  //-           :class="item.active ? 'font-weight-bold sidebar-text primary--text' : 'font-weight-bold sidebar-text'"
  //-           text
  //-           @click="goLink(item.route)"
  //-           :disabled="item.disabled != false"
  //-         >
  //-           <span class="text-left">
  //-             {{ item.text }}
  //-             <p v-if="item.subText" class="text-caption font-italic mb-0 black--text">{{ item.subText }}</p>
  //-           </span>
  //-         </v-btn>
  //-       </v-container>
  //-     </v-flex>
  //-   </v-toolbar>
  //- </v-navigation-drawer>
</template>

<script>

import Button from '@/common/components/Button'

export default {
  name: 'NavigationDrawer',
  components: {
    Button
  },
  props: {
    width: String,
  },
  data: () => ({
    width: "1000px",
    color: "black"
  }),

  methods: {
    goLink(route){
      if(route != undefined && route.name != this.$route.name){
        this.$router.push(route)
      }
    },

    openHref(href){
      window.open(href, '_blank').focus();
    }
  },

  computed: {
    drawerButtons() {
      if (this.$route.meta && this.$route.meta.drawerButtons) {
        return this.$route.meta.drawerButtons
      }
      return []
    }
  }
}
</script>