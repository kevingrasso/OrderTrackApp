<template>
  <q-page>

    <template v-if="dataDownloaded">
      <tab-orders 
      :tabs="tabs"/>

      <div class="q-pa-md absolute full-width full-height column">
        <div class="row q-mb-md">
          <search />
          <sort />
        </div>
        <q-scroll-area class="q-scroll-area-orders">
          <p v-if="!Object.keys(ordersInTransit).length && search">
            No results
          </p>
          <no-orders
            v-if="!Object.keys(ordersInTransit).length && !search">
            No orders in transit
          </no-orders>
          <q-list 
          class="q-mb-xl"
          v-else>
              <order 
                v-for="(order, key) in ordersInTransit"
                :key="key"
                :order = "order"
                :id = "key"
                ></order>
                
          </q-list>
        </q-scroll-area>
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
        <q-tooltip :offset="[0, 5]">QSpinnerHourglass</q-tooltip>
      </div>
    </template>

    <q-btn
    @click="showAddOrder = true"
    round
    class="absolute-bottom-right q-ma-md"
    color="accent"
    size="20px"
    icon="add"/>

  </q-page>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
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
  computed: {
    ...mapGetters('orders', ['ordersInTransit']),
    ...mapState('orders', ['search', 'dataDownloaded'])
  },
  components:{
    'order' : require('components/Orders/Order.vue').default,
    'add-order' : require('components/Orders/Modals/addOrder.vue').default,
    'no-orders' : require('components/Orders/noOrders.vue').default,
    'search' : require('components/Orders/Tools/search.vue').default,
    'sort' : require('components/Orders/Tools/sort.vue').default,
    'tab-orders' : require('components/Orders/inTransitArchivedTabs.vue').default
  }
}
</script>
<style>
 .q-scroll-area-orders{
   display: flex;
   flex-grow: 1;
 }
</style>