import { mount } from "@vue/test-utils"
import Icon from "@/common/components/Icon"
import { boxIcon } from "@/common/icons"

describe("Icon Component", () => {
  it("Should render", () => {
    const iconComponent = mount(Icon)

    expect(iconComponent.exists()).toBe(true)
  })

  it("Should render custom icon", () => {
    const iconComponent = mount(Icon, {
      propsData: { icon: boxIcon }
    })

    expect(iconComponent)
  })
})
