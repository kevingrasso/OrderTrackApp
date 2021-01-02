<template>
<q-page padding>
  <div class="q-pa-md row items-start q-gutter-md middle">
    <q-card class="my-card col bg-grey-3" flat bordered>
      
      <q-card-section>
        <div class="text-h4 q-mt-sm q-mb-sm">
          {{order.name}}
          <q-btn 
                @click.prevent="showEditOrder = true" 
                flat round dense 
                color="secondary" 
                icon="edit"/>
        </div>
        <div class="text-caption text-grey q-mt-md q-mb-md">
          Last update: {{order.last_update}}
        </div>
        <div class="text-caption text-grey">
          Track ID: {{order.track_id}}

          <q-btn
            round
            @click= "copy_track_id(order.track_id)"
            color="accent"
            size="xs"
            icon="content_copy"
            class="q-ml-sm"
          />
        </div>
        <q-item-section>
          <q-item-label class= "q-pt-sm" caption>{{order.courier.name}}</q-item-label>
        </q-item-section>
       
      </q-card-section>       
    </q-card>
    
    <q-dialog v-model="showEditOrder">
          <edit-order 
          @close = "getOrderData"
          :order="order"
          :id="order_id" />
    </q-dialog>
  </div>
  <div 
  v-if="order.order_data.track_info != '' && order.order_data.track_info != null"
  class="q-pa-md row items-start q-gutter-md middle">
    <q-list bordered separator style="width:100%">
      <q-item 
      v-ripple
      class="row"
      v-for="update in order.order_data.track_info"
      :key="update.id">
        <q-item-section class="col ">{{update.StatusDescription}}</q-item-section>
        <q-item-section class="col-2">{{update.Date}}</q-item-section>
      </q-item>

    </q-list>
  </div>
  <div 
 v-else
  class="q-pa-md row">
    <q-banner inline-actions rounded class="bg-orange text-white col" >
      Cannot find your order. Check if the track id is correct.
    </q-banner>
  </div>
                                    
</q-page>
 
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import { Notify, copyToClipboard, Loading } from 'quasar'
import {axios} from 'axios'

export default {
  data() {
    return {
      order_id:'',
      order:{},
      showEditOrder: false
    }
  },
  methods: {
    ...mapActions('orders', ['updateOrder']),
    getOrderData(){
      Object.assign(this.order, this.orderInformation(this.$route.query.id))
      this.showEditOrder = false
    },
    copy_track_id(text){
      copyToClipboard(text).then(() => {
        Notify.create('Track id copied')
      })
      .catch(() => {
        console.log('error')
      })
    }
  },
  components:{
        'edit-order' : require('components/Orders/Modals/editOrder.vue').default
  },
  beforeMount(){
    this.order_id = this.$route.query.id
    this.order = this.$route.query.order
  },
  mounted(){
  },
  computed:{
    ...mapGetters('orders', ['orderInformation'])
  }
}
</script>

<style>


</style>