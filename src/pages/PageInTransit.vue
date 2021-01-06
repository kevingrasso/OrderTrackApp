<template>
  <q-page>

    <template v-if="dataDownloaded">
         
        <div class="absolute q-pa-sm full-width">
               
            <div class="row ">
              <search />
              <sort />
            </div>
            <div 
            v-if="updating"
            class="q-gutter-md row">
            <q-spinner
              v-if="updating"
              class="col"
              color="primary"
              size="3em"
              />
            </div>
              <no-orders
                v-if="!Object.keys(ordersInTransit).length && !search">
                No orders in transit
              </no-orders>
              <q-list 
              class="q-mb-xl q-mt-sm row full width"
              v-else>
                  <order 
                    v-for="(order, key) in ordersInTransit"
                    :key="key"
                    :order = "order"
                    :id = "key"
                    ></order>
                  
              </q-list>
            <q-dialog v-model="showAddOrder">
              <add-order @close = "showAddOrder = false" />
            </q-dialog>
        </div>
    </template>
    <template v-else>
      <div >
        <q-spinner-hourglass
          color="primary"
          size="5em"
          class="absolute-center"
        />

      </div>
    </template>

    <q-btn
    @click="showAddOrder = true"
    round
    class="fixed-bottom-right q-ma-md shadow-2"
    color="accent"
    size="20px"
    icon="add"/>
   
  </q-page>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex'
import axios from 'axios'
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
  data() {
    return {
      showAddOrder: false,
      tabs:tabsData,
    }
  },
  methods: {
    get_orders_info(){
      axios.get('http://localhost:3000/order-data',{
        params:{
          track_id: 'WW300213164',
          courier_code: 'gls-italy'
        }
      }).then((response) =>{
        console.log('response', response.data)
      }).catch((err) =>{
        console.log('err', err)
      })
    },
     ...mapActions('settings',['setActualPage'])
  },
  computed: {
    ...mapGetters('orders', ['ordersInTransit']),
    ...mapState('orders', ['search', 'dataDownloaded', 'updating'])
  },
  components:{
    'order' : require('components/Orders/Order.vue').default,
    'add-order' : require('components/Orders/Modals/addOrder.vue').default,
    'no-orders' : require('components/Orders/noOrders.vue').default,
    'search' : require('components/Orders/Tools/search.vue').default,
    'sort' : require('components/Orders/Tools/sort.vue').default,
    'tab-orders' : require('components/Orders/inTransitArchivedTabs.vue').default
  },
  created() {
    this.setActualPage('in_transit')
  }
}
</script>
<style>

</style>