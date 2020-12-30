import Vue from 'vue'
import {uid} from 'quasar'
import {firebaseAuth,firebaseDb} from 'boot/firebase'
import {showErrorMessage} from 'src/functions/function-show-error-message'

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
    deleteOrder({ dispatch }, id){
        dispatch('firebaseDeleteOrder', id)
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
    firebaseReadData({commit}){
        let userID = firebaseAuth.currentUser.uid
        let userOrders = firebaseDb.ref('orders/' + userID)

        userOrders.once('value', snapshot=>{
            commit('setDataDownloaded', true)
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
    firebaseAddOrder({}, payload){
        let userID = firebaseAuth.currentUser.uid
        let orderRef = firebaseDb.ref('orders/'+userID+'/'+payload.id)
        orderRef.set(payload.order, error =>{
            if(error){
                showErrorMessage(error.message)
            }
        })
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