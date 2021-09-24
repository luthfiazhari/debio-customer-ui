// import routeGuard from "@/common/lib/route-guard";//here too

const customerRoutes = [{
  path: '/customer',
  component: () => import(/* webpackChunkName */ '../../views/Dashboard/Customer'),
  // beforeEnter: routeGuard.checkIsLoggedIn, //open if other page done
  children: [
    {
      path: '/',
      name: 'customer-home',
      meta: {
        pageHeader: 'Home',
        drawerButtons: [
          { text: "Dashboard", disabled: false, active: true, route: { name: "customer-home" }, img: "@/assets/grid.png" },
          { text: "My Test", disabled: false, active: false, route: { name: "customer-mytest" }, img: "@/assets/box.png" },
          { text: "My EMR", disabled: false, active: false, route: { name: "customer-emr"}, img: "@/assets/file-text.png" },
          { text: "Order History", disabled: false, active: false, route: { name: "history-test" }, img: "@/assets/credit-card.png" },
        ]
      },
      component: () => import(/* webpackChunkName */ '../../views/Dashboard/Customer/Home')
    },
    {
      path: '/customer/result-test/',//souldbe /:number <= order number
      name: 'result-test',
      meta: {
        pageHeader: 'Test Result',
        // breadcrumbs: [
        //   { text: 'Home', href: '/customer' },
        //   { text: 'Test Results', href: 'all-test-result' },
        //   { text: 'Result', disabled: true }
        // ],
        drawerButtons: [
          { text: "Dashboard", disabled: false, active: false, route: { name: "customer-home" }, img: "@/assets/grid.png" },
          { text: "My Test", disabled: false, active: true, route: { name: "customer-mytest" }, img: "@/assets/box.png" },
          { text: "My EMR", disabled: false, active: false, route: { name: "customer-emr"}, img: "@/assets/file-text.png" },
          { text: "Order History", disabled: false, active: false, route: { name: "order-history" }, img: "@/assets/credit-card.png" },
        ]
      },
      component: () => import(/* webpackChunkName */ '../../views/Dashboard/Customer/TestResult/result.vue')
    },
  ]
}]


export default customerRoutes