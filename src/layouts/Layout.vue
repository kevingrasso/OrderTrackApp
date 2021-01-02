<template>
  <q-layout view="hHh lpR fFf">
    <q-header >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="absolute-center">
          Order Track
        </q-toolbar-title>

        <q-btn 
          v-if="!loggedIn"
          to="/login" 
          flat
          stack
          dense
          label= "LOGIN"
          icon="account_circle" 
          class="absolute-right q-mr-sm"/>
        <q-btn 
          v-else 
          @click= "logoutUser"
          flat
          label="LOGOUT"
          stack
          dense
          icon="account_circle" 
          class="absolute-right q-mr-sm"/>
      </q-toolbar>
      
     
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
  components: { EssentialLink },
  data () {
    return {
      ...mapState('orders', ['showTabs']),
      showTabs: this.showTabs,
      leftDrawerOpen: false,
      essentialLinks: linksData,
        
      }
  },
  computed:{
    ...mapState('auth', ['loggedIn'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
  },
}
</script>

<style scoped>

</style>