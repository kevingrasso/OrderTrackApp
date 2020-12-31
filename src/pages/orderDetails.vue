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
       
      </q-card-section>
        
    </q-card>
     <q-dialog v-model="showEditOrder">
            <edit-order 
            @close = "getOrderData"
            :order="order"
            :id="order_id" />
        </q-dialog>
  </div>
   
  <div class="q-pa-md  items-start q-gutter-md middle">
    <form class= "hidden" name = "form" role="form" action="//track.trackingmore.com" method="get" onsubmit="return false">
        <div class="TM_input-group">
            <input type="text" 
            class="TM_my_search_input_style " 
            id="button_tracking_number" 
            placeholder="Tracking Number" 
            name="button_tracking_number" 
            v-model= "order.track_id"
            autocomplete="off" 
            maxlength="100" 
            style="border-color: #0099cc">
            <span class="TM_input-group-btn">
                <button class="TM_my_search_button_style " 
                id="query" 
                type="button" 
                onclick="return doTrack()" 
                style="background-color: #0099cc">Track</button>
            </span>
        </div>
        <input type="hidden" name="lang" value="en" />
        <input id="button_express_code" type="hidden" name="lang" value="" />
    </form>
    <div id="TRNum"></div>
  </div>
                                                        
</q-page>
 
</template>

<script>
import {mapGetters} from 'vuex'
import { Notify, copyToClipboard } from 'quasar'


export default {
  data() {
    return {
      order_id:'',
      order:{},
      showEditOrder: false
    }
  },
  methods: {
    getOrderData(){
      if(this.order.track_id != this.orderInformation(this.$route.query.id).track_id){
        document.getElementById('query').click()
      }
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
    document.getElementById('query').click()
  },
  computed:{
    ...mapGetters('orders', ['orderInformation'])
  }
}
</script>

<style>


</style>