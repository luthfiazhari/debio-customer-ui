import routeGuard from "@/common/lib/route-guard";

console.log(routeGuard, 'router guard')

const customerRoutes = [{
  path: '/customer',
  component: () => import(/* webpackChunkName */ '../../views/Dashboard/Customer'),
  // beforeEnter: routeGuard.checkIsLoggedIn,
  children: [
    {
      path: '/',
      name: 'customer-home',
      meta: {
        pageHeader: 'Home',
        drawerButtons: [
          { text: "Dashboard", disabled: false, active: true, route: { name: "customer-home" } },
          { text: "My Test", disabled: false, route: { name: "" } },
          { text: "My EMR", disabled: false, route: { name: ""} },
          { text: "Order History", disabled: false, route: { name: "" } },
          // { text: "Customer Care", href: "https://docs.debio.network/getting-started" },
        ]
      },
      component: () => import(/* webpackChunkName */ '../../views/Dashboard/Customer/Home')
    },
  ]
}]


export default customerRoutes