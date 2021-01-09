<template>
  <q-page padding>
    <div class="q-pa-md" >
    <q-list bordered padding>
      <q-item-label header>Settings</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Archive automatically if order delivered</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="blue" v-model="archiveIfDelivered" val="battery" />
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
    ...mapActions('settings',['setArchiveIfDelivered']),
    ...mapActions('settings',['setActualPage'])
  },
  computed:{
    ...mapGetters('settings', ['settings']),
    archiveIfDelivered:{
      get(){
        return this.settings.archiveIfDelivered
      },
      set(value){
        this.setArchiveIfDelivered(value)
      }
    }
  },
  created() {
    this.setActualPage('settings')
  }
}
</script>
<style>
 
</style>