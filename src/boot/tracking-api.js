import Vue from 'vue'
import axios from 'axios'

// const axiosInstance = axios.create({ 
//   baseURL: 'https://api.trackingmore.com' 
// })
// axiosInstance.defaults.headers.common['Content-Type'] = 'application/json' 
// //axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
// axiosInstance.defaults.headers.common['Trackingmore-Api-Key'] = 'API KEY' 
// axiosInstance.defaults.headers.common['Lang'] = 'it'
  
//Vue.prototype.$axios = axiosInstance
//axios.post(URL, data, config).then()


// Vue.prototype.$axios = axiosInstance
Vue.prototype.$axios = axios
