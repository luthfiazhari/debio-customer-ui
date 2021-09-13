<template>
  <v-card class="degenics-datatable-card elevation-2 ma-15">
      <slot name="prepend"></slot>

      <!-- Data Table -->
      <v-data-table
        class="degenics-data-table"
        :headers="headers"
        :items="items"
        :items-per-page="'5'"
        :page.sync="page"
        :class="additionalClass"
        hide-default-footer
        :sort-by="sortBy"
        :sort-desc="sortDesc"
        :loading="loading"
        :show-expand="expand"
        :expanded.sync="expanded"
        item-key="id"
        @click:row="clickedRow"
        :single-expand="singleExpand"
        :loading-text="computedLoadingText"
      >
        <!-- Slots for row formatting -->
        <template v-for="(slot, name) in $scopedSlots" v-slot:[name]="item">
          <slot :name="name" v-bind="item"></slot>
        </template>
      </v-data-table>

    </v-card>

</template>

<script>
export default {

}
</script>

<style>

</style>