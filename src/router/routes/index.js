const indexRoutes = [{
    path: '/',
    component: () => import(/* webpackChunkName */ '../../views/LandingPage/Layout'),
    children: [
      {
        path: '/',
        name: 'landing-page',
        component: () => import(/* webpackChunkName */ '../../views/LandingPage'),
      },
      {
        path: '/generate',
        name: 'generate-account',
        component: () => import(/* webpackChunkName */ '../../views/LandingPage/GenerateAccount'),
      },
      {
        path: '/generate',
        name: 'generate-mnemonic',
        component: () => import(/* webpackChunkName */ '../../views/LandingPage/GenerateAccount/GenerateMnemonic'),
      },
      {
        path: '/generate',
        name: 'verify-mnemonic',
        component: () => import(/* webpackChunkName */ '../../views/LandingPage/GenerateAccount/VerifyMnemonic'),
      },
      {
        path: '/generate',
        name: 'set-password',
        component: () => import(/* webpackChunkName */ '../../views/LandingPage/GenerateAccount/SetPassword'),
      },
      {
        path: '/generate',
        name: 'registration-successful',
        component: () => import(/* webpackChunkName */ '../../views/LandingPage/GenerateAccount/RegistrationSuccessful'),
      },
      {
        path: '/sign-in',
        name: 'sign-in',
        component: () => import(/* webpackChunkName */ '../../views/LandingPage/SignIn'),
      },
      {
        path: '/sign-in',
        name: 'no-account',
        component: () => import(/* webpackChunkName */ '../../views/LandingPage/SignIn/ImportKeystore'),
      },
      {
        path: '/sign-in',
        name: 'import-keystore',
        component: () => import(/* webpackChunkName */ '../../views/LandingPage/SignIn/ImportKeystore/SelectFile'),
      },
      {
        path: '/sign-in',
        name: 'input-password',
        component: () => import(/* webpackChunkName */ '../../views/LandingPage/SignIn/InputPassword'),
      },
      {
        path: '/sign-in',
        name: 'forgot-password',
        component: () => import(/* webpackChunkName */ '../../views/LandingPage/SignIn/ForgotPassword'),
      },
    ]
  },
]
  
export default indexRoutes