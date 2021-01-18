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
  <q-card
  v-if="tab == 'login'">
     <div class="q-pa-md q-mt-sm " >
         <q-banner class="bg-grey-3 q-mb-sm text-center row" rounded>
            Do not have an account?
          </q-banner>
          <div class="row">
              <q-btn 
              class="q-mx-auto col-auto"
              style="width:50%;"  
              color="accent" 
              label= 'Create new account'
              @click= "setTab('register')" />
          </div>
             
        </div>
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
     ...mapActions('settings',['setActualPage']),
     setTab(tab){
       this.tab = tab
     }
  },
  components:{
    'register-login': require('components/Auth/register_login.vue').default
  },
  beforeMount(){
    if(this.$route.query.tab != undefined){
      this.tab = this.$route.query.tab
    }
  },
  created(){
    this.setActualPage('login')
  }
}
</script>
<style>

</style>