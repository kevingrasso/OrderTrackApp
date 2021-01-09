import { LocalStorage } from 'quasar'

const state = {
    settings:{
        archiveIfDelivered:false,
    },
    page:'login',
}

const mutations = {
    setArchiveIfDelivered(state, value){
        state.settings.archiveIfDelivered = value
    },
    setSettings(state, settings){
        Object.assign(state.settings, settings)
    },
    setActualPage(state, value){
        state.page = value
    }
}

const actions = {
    setArchiveIfDelivered({commit, dispatch}, value){
        commit('setArchiveIfDelivered', value)
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