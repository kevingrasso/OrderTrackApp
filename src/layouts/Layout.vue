<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="page != 'order_details'"
          flat
          dense
          round
          icon="menu"
         
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
          <q-btn
          v-if="page == 'order_details'"
          v-go-back= " '/' "
          flat
          dense
          round
          icon="arrow_back"
          
        />

        <q-toolbar-title class="absolute-center">
         Order Track
        </q-toolbar-title>

        <q-btn 
          v-if="loggedIn && (page=='archived' || page == 'in_transit')"
          @click="updateOrders"
          :loading="updating"
          flat
          stack
          dense
          icon="cached" 
          class="absolute-right q-mr-xl"/>
        <q-btn 
          v-if="loggedIn && page!='login'" 
          @click= "logout"
          flat
          stack
          dense
          icon="exit_to_app" 
          class="absolute-right q-mr-sm"/>
      </q-toolbar>
      <tab-orders
      v-if="page == 'in_transit' || page == 'archived' " 
        :tabs="tabs"/>
     
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
        <div style="height: calc(100% - 150px); margin-top: 150px; ">
          <q-list padding>
               <EssentialLink
                v-for="link in essentialLinks"
                :key="link.title"
                v-bind="link"/>
                <q-item 
                v-if="$q.platform.is.electron"
                @click="quitApp"
                clickable 
                class="absolute-bottom">
                  <q-item-section avatar>
                    <q-icon name="power_settings_new" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Quit</q-item-label>
                  </q-item-section>
                </q-item>
          </q-list>
        </div>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.pixabay.com/photo/2017/08/27/21/20/box-2687558_960_720.png">
            </q-avatar>
            <div class="text-weight-bold">Order Track App</div>
            <div>@order-track-app</div>
          </div>
        </q-img>

          
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import EssentialLink from 'components/EssentialLink.vue'
const tabsData = [
  {
    label: 'In Transit',
    icon: 'local_shipping',
    link:'/'
  },
    {
    label: 'Archived',
    icon: 'delete',
    link:'/archived'
  }
]
const linksData = [
  {
    title: 'In Transit',
    icon: 'local_shipping',
    link: '/'
  },
   {
    title: 'Archived',
    icon: 'delete',
    link: '/archived'
  },
   {
    title: 'Settings',
    icon: 'settings',
    link: '/settings'
  },
   {
    title: 'Information',
    icon: 'help_outline',
    link: '/information'
  },
];

export default {
  name: 'MainLayout',
  components: { 
    EssentialLink,
    'tab-orders' : require('components/Orders/inTransitArchivedTabs.vue').default 
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      tabs: tabsData
      }
  },
  computed:{
    ...mapState('auth', ['loggedIn']),
    ...mapState('settings', ['page']),
    ...mapState('orders', ['updating'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    ...mapActions('orders', ['loadMultipleUpdates']),
    updateOrders(){
      this.loadMultipleUpdates()
    },
    logout(){
      this.logoutUser()
    },
    quitApp(){
      this.$q.dialog({
        title: 'Confirm',
        message: 'Really quit Order Track app?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        if(this.$q.platform.is.electron){
          require('electron').ipcRenderer.send('quit-app')
        }
        
      })
    }
  },
}
</script>

<style scoped>

</style>