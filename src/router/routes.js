
export default [
  { path: '/', component: () => import('pages/Home') },
  { path: '/Login', component: () => import('pages/Login') },
  { path: '/Register', component: () => import('pages/Register') },
  { path: '/Account', component: () => import('pages/Account') },
  { path: '/Call', component: () => import('pages/Call') },
  { path: '/Legal', component: () => import('pages/Legal') },
  { path: '/Recover', component: () => import('pages/Recover') },
  { path: '/Arizona', component: () => import('pages/Arizona') },
  { path: '/Family', component: () => import('pages/Family') },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
