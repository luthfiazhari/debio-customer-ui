import Vue from "vue"

Vue.component("ui-debio-card", () => import("@/core/components/ui/Card"))
Vue.component("ui-debio-avatar", () => import("@/core/components/ui/Avatar"))
Vue.component("ui-debio-icon", () => import("@/core/components/ui/Icon"))

// Forms
Vue.component("ui-debio-input", () => import("@/core/components/ui/Input"))