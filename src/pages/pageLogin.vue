<template>
<q-page padding>
  <q-card>
    <q-tabs
      class=" text-gray"
      v-model="tab"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator>
      <q-tab name="login" label="Login"/>
      <q-tab name="register" label="Register"/>
    </q-tabs>
    <q-separator />
       <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <register-login
            :tab="tab" />
          </q-tab-panel>

          <q-tab-panel name="register">
            <register-login
            :tab="tab" />
          </q-tab-panel>

        </q-tab-panels>
  </q-card>
</q-page>
</template>

<script>
import Register from 'src/components/Auth/register_login.vue'
import{mapActions} from 'vuex'

export default {
  data() {
    return {
      tab: 'login'
    }
  },
  methods:{
     ...mapActions('settings',['setActualPage'])
  },
  components:{
    'register-login': require('components/Auth/register_login.vue').default
  },
  created(){
    this.setActualPage('login')
  }
}
</script>
<style>

</style>