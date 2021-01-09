<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  methods: {
    ...mapActions('settings',['getSettings']),
    ...mapActions('auth',['handleAuthStateChange'])
  },
  mounted(){
    //console.log(this.$q.platform)
    if(this.$q.platform.is.electron){
      require('electron').ipcRenderer.on('show-settings', ()=>{
      this.$router.push('/settings')
    })
    require('electron').ipcRenderer.on('show-information', ()=>{
      this.$router.push('/information')
    })
    }
    

    

    this.getSettings()
    this.handleAuthStateChange()
  }
}
</script>
