import Vue from 'vue'
import {uid} from 'quasar'

const state = {
    orders: {
        'ID1':{
            track_id:'dncdsnk7281bhdj',
            name:'almazon tv',
            last_update:'12/05/2020',
            delivered: false,
            archived: false
        },
        'ID2':{
            track_id:'4893dsnk7281bhdj',
            name:'amazon grill',
            last_update:'11/05/2020',
            delivered: false,
            archived: false
        },
        'ID3':{
            track_id:'dn8393nk7281bhdj',
            name:'amazon phone',
            last_update:'11/05/2020',
            delivered: true,
            archived: true
        }
    },
    search:'',
    sort:'name',
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
    setSearch(state, value){
        state.search = value
    },
    setSort(state, value){
        state.sort = value
    },
}

const actions = {
    updateOrder({ commit },payload){
        commit('updateOrder', payload)
    },
    deleteOrder({ commit }, id){
        commit('deleteOrder', id)
    },
    addOrder({commit}, order){
        let orderId = uid()
        let payload = {
            id: orderId,
            order: order
        }
        commit('addOrder', payload)
    },
    setSearch({commit}, value){
        commit('setSearch', value)
    },
    setSort({commit}, value){
        commit('setSort', value)
    },
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
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}