import { LocalStorage } from 'quasar'

const state = {
    settings:{
        darkMode:true,
    },
    page:'login',
}

const mutations = {
    setDarkMode(state, value){
        state.settings.darkMode = value
    },
    setSettings(state, settings){
        Object.assign(state.settings, settings)
    },
    setActualPage(state, value){
        state.page = value
    }
}

const actions = {
    setDarkMode({commit, dispatch}, value){
        commit('setDarkMode', value)
        dispatch('saveSettings')
    },
    saveSettings({state}){
        LocalStorage.set('settings', state.settings)
    },
    getSettings({commit}){
        let settings = LocalStorage.getItem('settings')
        if (settings){
            commit('setSettings', settings)
        }
    },
    setActualPage({commit}, value){
        commit('setActualPage', value)
    }
    
}

const getters = {
    settings: state => {
        return state.settings
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}