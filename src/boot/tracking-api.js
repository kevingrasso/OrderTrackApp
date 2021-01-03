import Vue from 'vue'
import axios from 'axios'

async function get_courier(track_id){
    return await axios.get(process.env.SERVER_URL + '/courier-info',{
        params:{
          track_id: track_id
        }
      }).then((response) =>{
        return response.data
      }).catch((err) =>{
        console.log('err', err)
      })
}
async function get_order_info(track_id,courier_code){
    return await axios.get(process.env.SERVER_URL + '/order-data',{
        params:{
          courier_code: courier_code,
          track_id: track_id
        }
    }).then((response) => {
        if(response.data == ""){
            return null
        }else{
            return response.data
        }
        
    })
    .catch((err) => {
        //console.log(err)
    });
}
async function get_multiple_info(list){
    return await axios.get(process.env.SERVER_URL + '/multiple-orders',{
        params:{
          orders: list
        }
      }).then((response) => {
        if(response.data == ""){
            return null
        }else{
            return response.data
        }
    })
    .catch((err) => {
        //console.log(err)
    });
}
async function create_ship(track_id){
    return await axios.get(process.env.SERVER_URL + '/create-order',{
        params:{
          track_id: track_id
        }
    }).then((response) => {
        if(response.data == ""){
            return null
        }else{
            return response.data
        }
    })
    .catch((err) => {
        //console.log(err)
    });
}

async function delete_ship(courier_code, track_id){
    return await axios.get(process.env.SERVER_URL + '/delete-order',{
        params:{
            courier_code: courier_code,
            track_id: track_id
        }
    }).then((response) => {
       
    })
    .catch((err) => {
        //console.log(err)
    });
}
export{get_courier, get_order_info, get_multiple_info, create_ship, delete_ship}
