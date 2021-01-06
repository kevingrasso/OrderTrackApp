<template>
  <q-page padding>
     <div class="q-pa-md" >
    <q-list bordered padding>
      <q-item-label header>Information</q-item-label>

      <q-item tag="label" v-ripple @click="visitOurWebSite">
        <q-item-section>
          <q-item-label>Visit our website</q-item-label>
        </q-item-section>
         <q-item-section side >
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple @click="emailUs">
        <q-item-section>
          <q-item-label>Email us</q-item-label>
        </q-item-section>
         <q-item-section side >
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>

      
    </q-list>
  </div>
  </q-page>
</template>

<script>
import {openURL} from 'quasar'
import {mapActions} from 'vuex'

export default{
  methods: {
    ...mapActions('settings',['setActualPage']),
    visitOurWebSite(){
      openURL('http://order-track-2ed24.web.app/')
    },
    emailUs(){
      window.location.href = 'mailto:help@ordertrackapp.com?subject=Order Track App Feedback'
    }
  },
  created() {
    this.setActualPage('info')
  }
}
</script>
<style>
 
</style>