/*
Dependecies
*/

const express = require('express')
const axios = require('axios')
var cors = require('cors')

require('dotenv').config()

/*
config - express
*/


const app = express()
app.use(cors({
  origin: ['https://order-track-2ed24--test-backend-zfrhtux7.web.app','http://localhost:8080']
  
}));

/*
config axios
*/
const axiosInstance = axios.create({ 
  baseURL: process.env.API_URL
})
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json' 
axiosInstance.defaults.headers.common['Trackingmore-Api-Key'] = process.env.API_KEY_SECRET
axiosInstance.defaults.headers.common['Lang'] = 'it'
/*
endpoint track-info
*/

/*
  functions
*/
async function get_courier(track_id) {
    return await axiosInstance.post('/v2/carriers/detect', {"tracking_number": track_id}).then((response)=>{
      if(response.data.meta.code == 200){
        if(Object.keys(response.data.data).length>=1){
          console.log(response.data.data)
          return response.data.data[0].code
        }else{
          console.log(response.data.data)
          return response.data.data.code
        }
      }else{
        return null
      }
    }).catch((error)=>{
        console.error(error)
    })
}

async function get_order_data(courier_code, track_id){
  let data = {
    status: '',
    lastUpdateTime: '',
    track_info:[],
    track_id: track_id
  }
  return await axiosInstance.get('/v2/trackings/'+ courier_code + '/' + track_id + '/it').then((response) => {
    console.log(response.data)
    if (response.data.meta.code === 200 && response.data.data.status!= 'pending' && response.data.data.status!= 'notfound') {
        data.status = response.data.data.status
        data.lastUpdateTime = response.data.data.lastUpdateTime
        data.track_info = response.data.data.origin_info.trackinfo
        return data
    }else{
      res = delete_order(courier_code, track_id)
      if(res){
        console.log('order deleted')
      }
      return null
    }
  }).catch((err) => {
        console.log(err)
        return null
  });
}

async function get_multiple_orders(orders){
    let base_url = '/v2/trackings/get?numbers='
    for(let id of orders){
        base_url = base_url + id + ','
    }
    base_url = base_url.substring(0, base_url.length - 1)
    return await axiosInstance.get(base_url).then((response) => {
        if (response.data.meta.code === 200) {
            return response.data.data.items
        }else{
            return null
        }
    })
    .catch((err) => {
    });
}

async function create_order(track_id){
  courier_code = await get_courier(track_id)
  
  if(courier_code != null){
    return await axiosInstance.post('/v2/trackings/post',{
      "tracking_number": track_id,
      "carrier_code": courier_code
    }).then((response) => {
      if (response.data.meta.code === 200 || response.data.meta.code === 4016) {
          return courier_code
      }else{
          return null
      }
    }).catch((err) => {
    })
  }else{
    return null
  }
}

async function delete_order(courier_code, track_id){
  return await axiosInstance.delete('/v2/trackings/'+ courier_code + '/' + track_id).then((response) => {
    if (response.data.meta.code === 200) {
        return true
    }else{
        return false
    }
  }).catch((err) => {
  })
}
  
/*
  endpoints
*/
app.get('/courier-info',async (request, response) => {
    const courier = await get_courier(request.query.track_id)
    response.send(courier)
})

app.get('/order-data',async (request, response) => {
  const data = await get_order_data(request.query.courier_code, request.query.track_id)
  response.send(data)
})

app.get('/multiple-orders', async (request, response) => {
  console.log('loading multiple orders')
  const data = await get_multiple_orders(request.query.orders)
  response.send(data)
})

app.get('/create-order', async (request, response) => {
  const data = await create_order(request.query.track_id)
  response.send(data)
})

app.get('/delete-order', async (request, response) => {
  const data = await delete_order(request.query.courier_code, request.query.track_id)
  if(data){
    console.log('order deleted')
  }
  response.send(data)
})


/*
listen 
*/

app.listen(process.env.PORT || 3000)
