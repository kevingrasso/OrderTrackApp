<template>
  <q-layout view="hHh lpR fFf">
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
          v-go-back=" '/' "
          flat
          dense
          round
          icon="arrow_back"
          
        />

        <q-toolbar-title class="absolute-center">
          Order Track
        </q-toolbar-title>

        <q-btn 
          v-if="!loggedIn && page!='login'"
          to="/login" 
          flat
          stack
          dense
          label= "LOGIN"
          icon="account_circle" 
          class="absolute-right q-mr-sm"/>
        <q-btn 
          v-if="loggedIn && page!='login'" 
          @click= "logoutUser"
          flat
          label="LOGOUT"
          stack
          dense
          icon="account_circle" 
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
      <q-list >
        <q-item-label
          header
          class="text-grey-8"
        >
          Navigation
        </q-item-label>
       
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-separator/>
      </q-list>
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
    ...mapState('settings', ['page'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
  },
}
</script>

<style scoped>

</style>