import { mount } from "@vue/test-utils"
import SearchBar from "@/common/components/DataTable/SearchBar"
// import DataTable from "@/common/components/DataTable"
import Vue from "vue"
import Vuetify from "vuetify"
// import Button from "@/common/components/Button"

Vue.use(Vuetify)
// let vuetify

describe("Search Bar", () => {
  it("Should Render", () => {
    const searchBarComponent = mount(SearchBar)
    
    expect(searchBarComponent.exist()).toBe(true)
  })
})
