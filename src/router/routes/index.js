import routeGuard from "@/common/lib/route-guard";

const indexRoutes = [{
    path: '/',
    name: 'selectrole',
    beforeEnter: routeGuard.checkIsLoggedIn,
      meta: {
        pageHeader: 'SelectRoleGroup',
      },
    component: () => import(/* webpackChunkName */ '../../views/SelectRole'),
  },
]
  
export default indexRoutes