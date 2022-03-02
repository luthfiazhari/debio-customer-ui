<template lang="pug">
  .geneticAnalysts-registration-form
    .geneticAnalysts-registration-form__card
      .geneticAnalysts-registration-form__avatar-wrapper
        .geneticAnalysts-registration-form__avatar-image
          ui-debio-avatar(
            :src="computedImageLink"
            size="50"
            rounded
          )
        .geneticAnalysts-registration-form__avatar-description

  
</template>

<script>
export default {
  name: "GeneticAnalystsForm",

  data: () => ({
    profileImage: ""
  }),

  computed: {
    computedImageLink() {
      return this.profileImage ? this.profileImage : require("@/assets/add-image-placeholder.png")
    }
  }
}
</script>

<style>

</style>
