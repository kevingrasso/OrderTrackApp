<template>
    <q-card>
      <modal-header>Edit Order</modal-header>
        <form @submit.prevent="submitForm">
        
          <modal-order-name 
          :name.sync="orderToInsert.name"
          ref="modalOrderName"/>
          <modal-save-button />
        </form>
      
      </q-card>
</template>

<script>
import {mapActions} from 'vuex'
import { date } from 'quasar'

export default {
  props:['order', 'id'],
  data() {
    return {
      orderToInsert:{}
    }
  },
  methods: {
    ...mapActions('orders', ['updateOrder']),
    submitForm(){
      this.$refs.modalOrderName.$refs.name.validate()
      if(!this.$refs.modalOrderName.$refs.name.hasError){
        this.submitOrder()
      }
    },
    submitOrder(){
      this.updateOrder({
        id: this.id,
        updates: this.orderToInsert
      })
      this.$emit('close')
    }
  },
  components:{
    'modal-header': require('components/Orders/Modals/modalHeader.vue').default,
    'modal-order-name': require('components/Orders/Modals/modalOrderName.vue').default,
    'modal-save-button': require('components/Orders/Modals/modalSaveButton.vue').default
  },
  mounted(){
    this.orderToInsert = Object.assign({}, this.order)
  }
}
</script>