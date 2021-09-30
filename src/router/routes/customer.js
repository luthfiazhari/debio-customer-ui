// import { checkIsLoggedIn } from "@/common/lib/route-guard"

const customerRoutes = [{
  path: "/customer",
  component: () => import(/* webpackChunkName */ "../../views/Dashboard/Customer/Layout"),
  // beforeEnter: checkIsLoggedIn,
  children: [
    {
      path: "/",
      name: "customer-dashboard",
      meta: { pageHeader: "Home" },
      component: () => import(/* webpackChunkName */ "../../views/Dashboard/Customer/Home")
    },
    {
      path: "emr",
      name: "customer-emr",
      meta: { pageHeader: "Emr" },
      component: () => import(/* webpackChunkName */ "../../views/Dashboard/Customer/Home/Emr")
    },
    {
      path: "create",
      name: "customer-emr-create",
      meta: { pageHeader: "Emr Create", parent: "customer-emr" },
      component: () => import(/* webpackChunkName */ "../../views/Dashboard/Customer/Home/Emr/Create")
    },
    {
      path: "my-test",
      name: "customer-test",
      meta: { pageHeader: "My Test" },
      component: () => import(/* webpackChunkName */ "../../views/Dashboard/Customer/MyTest")
    },
    {
      path: "test-result",
      name: "test-result",
      meta: { pageHeader: "Test Result", parent: "customer-test" },
      component: () => import(/* webpackChunkName */ "../../views/Dashboard/Customer/TestResult/result")
    },
    {
      path: "collection-step",
      name: "collection-step",
      meta: { pageHeader: "Collection Step", parent: "customer-test" },
      component: () => import(/* webpackChunkName */ "../../views/Dashboard/Customer/CollectionStep")
    }
  ]
}]

export default customerRoutes
