<template>
    <q-card>
      <modal-header>Add Order</modal-header>
        <form @submit.prevent="submitForm">
        
          <modal-order-name 
          :name.sync="orderToInsert.name"
          ref="modalOrderName"/>
          <modal-track-id 
          :track_id.sync="orderToInsert.track_id"
          ref="modalTrackId"/>
          <modal-save-button />
        </form>
      
      </q-card>
</template>

<script>
import {mapActions} from 'vuex'
import { date } from 'quasar'
import {get_courier} from 'src/boot/tracking-api.js'

export default {
  data() {
    return {
      orderToInsert:{
        name:'',
        track_id:'',
        added_time:  date.formatDate(Date.now(), 'DD-MM-YYYY hh:mm:ss'),
        last_update: '?',
        delivered: false,
        archived: false,
        courier:{
          name:'',
          code:''
        },
        order_data:{
          status:'',
          lastUpdateTime:'',
          track_info:''
        },
      }
    }
  },
  methods: {
    ...mapActions('orders', ['addOrder']),
    submitForm(){
      this.$refs.modalOrderName.$refs.name.validate()
      this.$refs.modalTrackId.$refs.track_id.validate()
      if(!this.$refs.modalOrderName.$refs.name.hasError && !this.$refs.modalTrackId.$refs.track_id.hasError){
        this.submitOrder()
        
      }
    },
    submitOrder(){
      this.addOrder(this.orderToInsert)
      this.$emit('close')
    }
  },
  components:{
    'modal-header': require('components/Orders/Modals/modalHeader.vue').default,
    'modal-order-name': require('components/Orders/Modals/modalOrderName.vue').default,
    'modal-track-id': require('components/Orders/Modals/modalTrackId.vue').default,
    'modal-save-button': require('components/Orders/Modals/modalSaveButton.vue').default
  }
}
</script>