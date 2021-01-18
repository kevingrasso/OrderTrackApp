
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('pages/PageInTransit.vue') 
      },
      { 
        path: '/settings', 
        component: () => import('pages/PageSettings.vue') 
      },
      { 
        path: '/archived', 
        component: () => import('pages/PageArchived.vue') 
      },
      { 
        path: '/information', 
        component: () => import('pages/pageInfo.vue') 
      },
      { 
        path: '/login', 
        component: () => import('pages/pageLogin.vue') 
      },
      { 
        path: '/order-details', 
        component: () => import('pages/orderDetails.vue') 
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
