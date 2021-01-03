import {firebaseAuth} from 'boot/firebase'
import {LocalStorage, Loading, Notify} from 'quasar'
import {showErrorMessage} from 'src/functions/function-show-error-message.js'


const state = {
    loggedIn: false
}

const mutations = {
    setLoggedIn(state, value){
        state.loggedIn = value
    }
} 

const actions = {
    registerUser({}, payload){
        Loading.show()
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response=>{
            console.log('response: ', response)
        }).catch(error=>{
            showErrorMessage(error.message)
        })
    },
    loginUser({}, payload){
        Loading.show()
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(response=>{
            console.log('response: ', response)
        }).catch(error=>{
            showErrorMessage(error.message)
        })
    },
    logoutUser(){
        firebaseAuth.signOut()
    },
    handleAuthStateChange({commit, dispatch}){
        firebaseAuth.onAuthStateChanged(user =>{
            Loading.hide()
            if(user){
                commit('setLoggedIn', true)
                LocalStorage.set('loggedIn', true)
                this.$router.push('/').catch(err => {})
                dispatch('orders/firebaseReadData', null, {root: true})//different module
                Notify.create('Logged In')
                //dispatch('orders/loadMultipleUpdates', null, {root: true})//different module
            }else{
                commit('orders/clearOrders', null, {root: true})
                commit('orders/setDataDownloaded', false, {root: true})//different module
                commit('setLoggedIn', false)
                LocalStorage.set('loggedIn', false)
                this.$router.push('/login').catch(err => {})
                Notify.create('Logged Out')
            }
        })
    }
}

const getters = {

}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}