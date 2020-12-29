import {LocalStorage} from 'quasar'

export default ({ router }) => {
  //navigation guards
  router.beforeEach((to, from, next) => {
    let loggedIn = LocalStorage.getItem('loggedIn')
    if(!loggedIn && to.path !== '/login'){
      next('/login')
    }else{
      next()
    }
    
  })
}
