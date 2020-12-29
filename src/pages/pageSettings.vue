<template>
  <q-page padding>
    <div class="q-pa-md" >
    <q-list bordered padding>
      <q-item-label header>Settings</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Dark mode</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="blue" v-model="darkMode" val="battery" />
        </q-item-section>
      </q-item>

      
    </q-list>
  </div>
  </q-page>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default{
  methods: {
    ...mapActions('settings',['setDarkMode'])
  },
  computed:{
    ...mapGetters('settings', ['settings']),
    darkMode:{
      get(){
        return this.settings.darkMode
      },
      set(value){
        this.setDarkMode(value)
      }
    }
  },
}
</script>
<style>
 
</style>