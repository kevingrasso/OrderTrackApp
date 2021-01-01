<template>
    <q-page>
    <tab-orders
    class="visible-tabs" 
    :tabs="tabs"/>
    <div class="q-pa-md absolute full-width full-height column">
        <div class="row q-mb-md">
          <search />
          <sort />
        </div>
        <p
        v-if="!Object.keys(ordersArchived).length && search">
        No results</p>
        
        <q-scroll-area class="q-scroll-area-orders">
          <no-orders
          v-if="!Object.keys(ordersArchived).length && !search">
          No orders archived</no-orders>
          <div v-else>
            <q-btn 
            @click.prevent="delete_order()"
            align="around" 
            style="width:100%" 
            color="red-5" 
            label="Delete all orders"/>
            <q-list separator >
              <order 
                v-for="(order, key) in ordersArchived"
                :key="key"
                :order = "order"
                :id = "key"></order>
            
          </q-list>
          </div>
         
        </q-scroll-area>
    </div>
  </q-page>
</template>

<script>
import Order from 'src/components/Orders/Order.vue'
import {mapGetters, mapState, mapActions} from 'vuex'

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

export default{
  computed: {
    ...mapGetters('orders', ['ordersArchived']),
    ...mapState('orders', ['search']),
  },
  components:{
    'order' : require('components/Orders/Order.vue').default,
    'no-orders' : require('components/Orders/noOrders.vue').default,
    'search' : require('components/Orders/Tools/search.vue').default,
    'sort' : require('components/Orders/Tools/sort.vue').default,
    'tab-orders' : require('components/Orders/inTransitArchivedTabs.vue').default
  },
  methods: {
    ...mapActions('orders', ['updateOrder', 'deleteOrder']),
    delete_order(){
      let ids = []
      for (let id of Object.keys(this.ordersArchived)) {
          ids.push(id)
      }
      console.log(ids)
      this.$q.dialog({
          title: 'Confirm',
          message: 'Would you like to delete all orders?',
          ok:{
              push:true
          },
          cancel: {
              color:'negative'
          },
          persistent: true
      }).onOk(() => {
        //console.log(Object.keys(this.ordersArchived))
        this.deleteOrder(ids)
      })
    }
  },
  data() {
    return {
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2
      },
      tabs:tabsData
    }
  },
}
</script>

<style>
</style>