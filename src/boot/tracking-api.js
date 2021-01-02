import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create({ 
    baseURL: process.env.API_URL
})
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json' 
axiosInstance.defaults.headers.common['Trackingmore-Api-Key'] = process.env.API_KEY_SECRET
axiosInstance.defaults.headers.common['Lang'] = 'it'


Vue.prototype.$axios = axiosInstance

async function get_courier(track_id){
    let courier = {
        name:'',
        code:''
    }
    return axiosInstance.post('/v2/carriers/detect', {"tracking_number": track_id}).then((response) => {
        if (response.data.meta.code === 200) {
                return response.data.data[0].code
        }else{
            return null
        }
        
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
async function get_multiple_info(list){
    let base_url = '/v2/trackings/get?numbers='
    for(let id of list){
        base_url = base_url + id + ','
    }
    base_url = base_url.substring(0, base_url.length - 1)

    return axiosInstance.get(base_url).then((response) => {
        if (response.data.meta.code === 200) {
            return response.data.data.items
        }else{
            return null
        }
    })
    .catch((err) => {
        //console.log(err)
    });
}
async function create_ship(track_id){
    await get_courier(track_id).then((result)=>{
        console.log(result)
        if(result != null){
            return axiosInstance.post('/v2/trackings/post',{
                    "tracking_number": track_id,
	                "carrier_code": result
                    }).then((response) => {
                    
                if (response.data.meta.code === 200) {
                    console.log('ok')
                    return track_id
                }else{
                    console.log('no')
                    return null
                }
            })
            .catch((err) => {
                //console.log(err)
            });
        }
        else{
            return null
        }
    })
}
export{get_courier, get_order_info_from_api, get_multiple_info, create_ship}
