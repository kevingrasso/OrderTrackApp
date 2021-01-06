<template>
<q-page padding>
  <div class="q-pa-sm full-width full-height">
    <div class=" row items-start middle row">
      <q-card class="my-card col bg-grey-3" flat bordered>
        
        <q-card-section>
          <div class="text-h4 q-mt-sm q-mb-sm">
            {{orderInformation(order_id).name}}
            <q-btn 
                  @click.prevent="showEditOrder = true" 
                  flat round dense 
                  color="secondary" 
                  icon="edit"/>
          </div>
          <div class="text-caption text-grey q-mt-md q-mb-md">
            Last update: {{orderInformation(order_id).order_data.lastUpdateTime}}
          </div>
          <div class="text-caption text-grey">
            Track ID: {{orderInformation(order_id).track_id}}

            <q-btn
              round
              @click= "copy_track_id(orderInformation(order_id).track_id)"
              color="accent"
              size="xs"
              icon="content_copy"
              class="q-ml-sm"
            />
          </div>
          <q-item-section>
            <q-item-label class= "q-pt-sm" caption>{{orderInformation(order_id).courier.name}}</q-item-label>
          </q-item-section>
        
        </q-card-section>       
      </q-card>
      
      <q-dialog v-model="showEditOrder">
            <edit-order 
            @close = "getOrderData"
            :order="orderInformation(order_id)"
            :id="order_id" />
      </q-dialog>
    </div>
    <div 
    v-if="orderInformation(order_id).order_data.track_info != '' && orderInformation(order_id).order_data.track_info != null"
    class="q-pa-md  q-pb-lg items-start row">
      <q-card 
      flat 
      bordered 
      v-for="update in orderInformation(order_id).order_data.track_info"
      :key="update.id"
      class="my-card q-pt-md q-mt-sm q-mb-sm row ">
      
        <q-card-section class="q-pt-none col">
          {{update.StatusDescription}}
        </q-card-section>
        <q-card-section class="q-pt-none col"
        style="text-align:right">
          {{update.Date}}
        </q-card-section>
        <q-separator inset 
        v-if="update.Details !=''"/>
        <q-card-section 
        v-if="update.Details !=''"
        class="col">
          {{update.Details}}
        </q-card-section>

    </q-card>
    </div>
    <div 
      v-else
      class="q-pa-md row">
      <q-banner inline-actions rounded class="bg-orange text-white col" >
        Cannot find your order. Check if the track id is correct.
      </q-banner>
    </div>    
  <p v-if="updating"> Updating</p>
  </div>
                      
</q-page>
 
</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex'
import { Notify, copyToClipboard, Loading } from 'quasar'
import {axios} from 'axios'

export default {
  data() {
    return {
      order_id:'',
      showEditOrder: false
    }
  },
  methods: {
    ...mapActions('orders', ['updateOrder']),
    ...mapActions('settings', ['setActualPage']),
    getOrderData(){
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
  },
  computed:{
    ...mapGetters('orders', ['orderInformation']),
    ...mapState('orders', ['updating'])
  },
  created() {
    this.setActualPage('order_details')
    let order = this.orderInformation(this.$route.query.id)
    let payload = {
      id: this.$route.query.id,
      updates:{
        order_data:{
            status: order.order_data.status,
            lastUpdateTime:order.order_data.lastUpdateTime,
            track_info: order.order_data.track_info,
            updated:false
        } 
      }   
    }      
    this.updateOrder(payload)
  },
  
}
</script>

<style scoped>
.my-card{
    width: 100%;

}


</style>