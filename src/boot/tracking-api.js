import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create({ 
    baseURL: process.env.API_URL
})
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json' 
axiosInstance.defaults.headers.common['Trackingmore-Api-Key'] = process.env.API_KEY_SECRET
axiosInstance.defaults.headers.common['Lang'] = 'it'


Vue.prototype.$axios = axiosInstance

function get_courier(track_id){
    let courier = {
        name:'',
        code:''
    }
    return axiosInstance.post('/v2/carriers/detect', {"tracking_number": track_id}).then((response) => {
        if (response.status === 200) {
            courier.name = response.data.data[0].name
            courier.code = response.data.data[0].code
        }
        return courier
    })
}
function get_order_info_from_api(track_id,courier_code){
    let data = {
        status:'',
        lastUpdateTime:'',
        track_info:[]
    }
    return axiosInstance.get('/v2/trackings/'+ courier_code + '/' + track_id + '/it').then((response) => {
        if (response.data.meta.code === 200) {
            data.status = response.data.data.status
            data.lastUpdateTime = response.data.data.lastUpdateTime
            data.track_info = response.data.data.origin_info.trackinfo
        }
        return data
    })
    .catch((err) => {
        //console.log(err)
    });
}
export{get_courier, get_order_info_from_api}
