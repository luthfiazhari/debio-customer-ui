const indexRoutes = [{
    path: '/',
    component: () => import(/* webpackChunkName */ '../../views/LandingPage/Layout'),
    children: [
      {
        path: '/',
        name: 'landing-page',
        meta: {
          pageHeader: 'LandingPage',
        },
        component: () => import(/* webpackChunkName */ '../../views/LandingPage'),
      },
      {
        path: '/generate',
        name: 'generate-account',
        meta: {
          pageHeader: 'GenerateAccount',
        },
        component: () => import(/* webpackChunkName */ '../../views/LandingPage/GenerateAccount'),
      },
      {
        path: '/generate',
        name: 'generate-mnemonic',
        meta: {
          pageHeader: 'GenerateMnemonic',
        },
        component: () => import(/* webpackChunkName */ '../../views/LandingPage/GenerateAccount/GenerateMnemonic'),
      },
      {
        path: '/generate',
        name: 'verify-mnemonic',
        meta: {
          pageHeader: 'VerifyMnemonic',
        },
        component: () => import(/* webpackChunkName */ '../../views/LandingPage/GenerateAccount/VerifyMnemonic'),
      },
    ]
  },
]
  
export default indexRoutes