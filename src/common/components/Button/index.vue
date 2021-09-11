<template lang="pug">
  //- <v-btn
  //-   depressed
  //-   :color="color"
  //-   large
  //-   width="100%"
  //-   @click="onClick"
  //-   :style="dark ? 'color:white' : ''"
  //-   :disabled="disabled"
  //-   :loading="loading"
  //- >
  //-   <slot></slot>
  //- </v-btn>
  v-btn(
    depressed
    :color="color"
    :width="width"
    @click="onClick"
    :style="dark ? 'color:white' : ''"
    :disabled="disabled"
    :loading="loading"
    :outlined="outlined"
    :height="height")
    slot
</template>

<script>
export default {
  name: 'Button',
  props: {
    color: { type: String, default: 'white'},
    dark: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    width: { type: [String, Number], default: "203px" },
    outlined: { type: Boolean, default: false },
    height: String,
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>

<style>

</style>