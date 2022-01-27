import { mount, shallowMount } from "@vue/test-utils"
import DataTable from "@/common/components/DataTable"
import Vue from "vue"
import Vuetify from "vuetify"
import Button from "@/common/components/Button"
import EntrySelect from "@/common/components/DataTable/EntrySelect"

Vue.use(Vuetify)
let vuetify

describe("DataTable Component", () => {
  const stubs = { Button, EntrySelect }
  const items = [
    {
      a: "a", b: "b", c: "c", d: "d", e: "e", f: "f"
    }
  ]
  const header = [
    { text: "a", value: "a", sortable: true },
    { text: "b", value: "b", sortable: true },
    { text: "c", value: "c", sortable: true },
    { text: "d", value: "d", sortable: true },
    { text: "e", value: "e", width: "115", sortable: true },
    {
      text: "f",
      value: "f",
      sortable: false,
      align: "center",
      width: "5%"
    }
  ]
  beforeEach(() => {
    vuetify = new Vuetify()
  })
  const entrySelect = shallowMount(EntrySelect)
  entrySelect.setProps({ value: 1 })

  it("Should render", () => {
    const dataTableComponent = mount(DataTable, {
      vuetify,
      stubs,
      propsData: { header, items }
    })

    expect(dataTableComponent.exists()).toBe(true)
  })

  it("Should render Data Table with header", () => {
    const wrapper = mount(DataTable, {
      vuetify,
      stubs,
      propsData: { header, items}
    })

    const dataTableComponent = wrapper.find("thead")
    
    expect(dataTableComponent.exists()).toBe(true)
    expect(dataTableComponent.find("tr").exists()).toBe(true)
  })

  // it("Should render Data Table with custom header", () => {
  //   const wrapper = mount(DataTable, {
  //     vuetify,
  //     stubs,
  //     propsData: { header, items}
  //   })

  //   const dataTableComponent = wrapper.find("thead").find("tr")
  //   expect(dataTableComponent.findAllComponents("th")).toContain("div")
  // })

  it("Should render Data Table with Data Item", () => {
    const wrapper = mount(DataTable, {
      vuetify,
      stubs,
      propsData: { header, items}
    })

    const dataTableComponent = wrapper.find("tbody")
    
    expect(dataTableComponent.exists()).toBe(true)
    expect(dataTableComponent.find("tr").exists()).toBe(true)
  })
})
