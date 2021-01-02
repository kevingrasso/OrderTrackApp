import Vue from 'vue'
import {uid, Notify} from 'quasar'
import {firebaseAuth,firebaseDb} from 'boot/firebase'
import {showErrorMessage} from 'src/functions/function-show-error-message'
import {get_multiple_info, create_ship} from 'src/boot/tracking-api.js'
import { containsTrackId } from 'src/functions/find_element_by_track_id'

const state = {
    orders: {
        // 'ID1':{
        //     track_id:'dncdsnk7281bhdj',
        //     name:'almazon tv',
        //     last_update:'12/05/2020',
        //     delivered: false,
        //     archived: false
        // }
    },
    search:'',
    sort:'name',
    dataDownloaded: false
}

const mutations = {
    updateOrder(state, payload){
        Object.assign(state.orders[payload.id], payload.updates)
    },
    deleteOrder(state,id){
        Vue.delete(state.orders, id)
    },
    addOrder(state, payload){
        Vue.set(state.orders, payload.id, payload.order)
    },
    clearOrders(state){
        state.orders = {}
    },
    setSearch(state, value){
        state.search = value
    },
    setSort(state, value){
        state.sort = value
    },
    setDataDownloaded(state, value){
        state.dataDownloaded = value
    }
}

const actions = {
    updateOrder({ dispatch },payload){
        dispatch('firebaseUpdateOrder', payload)
    },
    deleteOrder({ dispatch }, ids){
        if(ids.length == 1){
            dispatch('firebaseDeleteOrder', ids)
        }else if(ids.length > 1){
            for(let id of ids){
                dispatch('firebaseDeleteOrder', id)
            }
        } 
    },
    addOrder({dispatch}, order){
        let orderId = uid()
        let payload = {
            id: orderId,
            order: order
        }
        dispatch('firebaseAddOrder', payload)
    },
    setSearch({commit}, value){
        commit('setSearch', value)
    },
    setSort({commit}, value){
        commit('setSort', value)
    },
    firebaseReadData({commit, dispatch}){
        let userID = firebaseAuth.currentUser.uid
        let userOrders = firebaseDb.ref('orders/' + userID)

        userOrders.once('value', snapshot=>{
            
            commit('setDataDownloaded', true)
            dispatch('loadMultipleUpdates')
        }, error => {
            showErrorMessage(error.message)
            this.$router.replace('/login')
        })

        userOrders.on('child_added', snapshot =>{//added an order
            let order = snapshot.val()
            let payload = {
                id: snapshot.key,
                order:order
            }
            commit('addOrder', payload)
        })
        userOrders.on('child_changed', snapshot =>{//order changed
            let order = snapshot.val()
            let payload = {
                id: snapshot.key,
                updates: order
            }
            commit('updateOrder', payload)
        })
        userOrders.on('child_removed', snapshot =>{//order removed
            commit('deleteOrder', snapshot.key)
        })
    },
    firebaseAddOrder({dispatch, state}, payload){
        let userID = firebaseAuth.currentUser.uid
        let orderRef = firebaseDb.ref('orders/'+userID+'/'+payload.id)
        var result = containsTrackId(state.orders, payload.order.track_id)
        console.log(result)
        if(!result){
            orderRef.set(payload.order, error =>{
                if(error){
                    showErrorMessage(error.message)
                }
            })
            dispatch('loadSingleUpdate', payload.id)
        }
        else{
            showErrorMessage('An order with the same track id already exists.')
        }
    },
    firebaseUpdateOrder({}, payload){
        let userID = firebaseAuth.currentUser.uid
        let orderRef = firebaseDb.ref('orders/'+userID+'/'+payload.id)
        orderRef.update(payload.updates, error =>{
            if(error){
                showErrorMessage(error.message)
            }
        })
    },
    firebaseDeleteOrder({}, id){
        let userID = firebaseAuth.currentUser.uid
        let orderRef = firebaseDb.ref('orders/'+userID+'/'+id)
        orderRef.remove( error =>{
            if(error){
                showErrorMessage(error.message)
            }
        })
    },
    loadMultipleUpdates({state, dispatch}){
        
        let keys = Object.keys(state.orders)
    
        let list_track_id = []
        for(let key of keys){
            list_track_id.push(state.orders[key].track_id)
        }
    
        let updates = []
        get_multiple_info(list_track_id).then((result) =>{
            if(result != null){
                let i = 0
                console.log(result)
                for(let key of keys){
                    let payload = {
                        id:key,
                        updates:{
                            order_data:{
                                status: result[i].status,
                                lastUpdateTime:result[i].lastUpdateTime,
                                track_info: result[i].origin_info.trackinfo
                            },
                            last_update: result[i].lastUpdateTime,
                            courier:{
                                name:result[i].carrier_code,
                                code:result[i].carrier_code
                            },
                            delivered:(result[i].status == 'delivered')? true : false
                        }
                    }
                    dispatch('firebaseUpdateOrder', payload)
                    i++
                }
            }
        })
    },
    async loadSingleUpdate({dispatch}, key){
        
        let track_id = state.orders[key].track_id
        let created = false
        await create_ship(track_id).then((result)=>{
            //console.log(result)
        })
        await get_multiple_info([track_id]).then((result)=>{
            console.log(result)
            if(result != null){
                let payload = {
                    id: key,
                    updates:{
                        order_data:{
                            status: result[0].status,
                            lastUpdateTime:result[0].lastUpdateTime,
                            track_info: result[0].origin_info.trackinfo
                        },
                        last_update: result[0].lastUpdateTime,
                        courier:{
                            name:result[0].carrier_code,
                            code:result[0].carrier_code
                        },
                        delivered:(result[0].status == 'delivered')? true : false
                    }
                }
                console.log('updated')
                dispatch('firebaseUpdateOrder', payload)
            }
            else{
                dispatch('firebaseDeleteOrder', key)
                // Notify.create({
                //     type: 'negative',
                //     message: 'Cannot find your order whit track id: '+ track_id,
                //     icon: 'report_problem'
                // })
                showErrorMessage('Cannot find your order whit track id: '+ track_id)
            }
            
        })
    }
}

const getters = {
    ordersInTransit: (state, getters) =>{
        let ordersFiltered = getters.ordersFiltered
        let orders = {}
        Object.keys(ordersFiltered).forEach((key) =>{
            let order = ordersFiltered[key]
            if(!order.archived){
                orders[key] = order
            }
        })
        return orders
    },
    ordersArchived: (state, getters) =>{
        let ordersFiltered = getters.ordersFiltered
        let orders = {}
        Object.keys(ordersFiltered).forEach((key) =>{
            let order = ordersFiltered[key]
            if(order.archived){
                orders[key] = order
            }
        })
        return orders
    },
    ordersFiltered: (state, getters)=>{
        let ordersSorted = getters.ordersSorted
        let ordersFiltered = {}
        if(state.search){
            Object.keys(ordersSorted).forEach((key) =>{
                let order = ordersSorted[key]
                if(order.name.toLowerCase().includes(state.search.toLowerCase()) 
                    || order.track_id.toLowerCase().includes(state.search.toLowerCase())){
                    ordersFiltered[key] = ordersSorted[key]
                }
            })
            return ordersFiltered
        }
        return ordersSorted
    },
    ordersSorted:(state) =>{
        let ordersSorted={}
        let keysOrdered = Object.keys(state.orders)
        keysOrdered.sort((a,b)=>{
            let a_name = state.orders[a][state.sort].toLowerCase()
            let b_name = state.orders[b][state.sort].toLowerCase()

            if(a_name > b_name) return 1
            else if(a_name < b_name) return -1
            else return 0
        })
        keysOrdered.forEach((key) =>{
            ordersSorted[key] = state.orders[key]
        })
        return ordersSorted
    },
    orderInformation:(state) => (key) =>{
        if(Object.keys(state.orders).includes(key)){
           return state.orders[key]
        }
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}