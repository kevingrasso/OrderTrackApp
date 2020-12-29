<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
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
          Order Track App
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs v-if="set_showTabs">
        <q-route-tab 
          v-for="tab in tabs" 
          dense
          :key="tab.label"
          :to="tab.link" 
          :label="tab.label" 
          :icon="tab.icon" />
      </q-tabs>
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
import EssentialLink from 'components/EssentialLink.vue'
import {mapState} from 'vuex'
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


export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      ...mapState('orders', ['showTabs']),
      showTabs: this.showTabs,
      leftDrawerOpen: false,
      essentialLinks: linksData,
      tabs: tabsData    
      }
  },
  methods: {
    set_showTabs(){
      console.log(this.showTabs)
      return this.showTabs
    }
  },
}
</script>
<style>
 @media screen and (min-width: 768px){
   .q-tabs{
     display: none;
   }
 }
</style>