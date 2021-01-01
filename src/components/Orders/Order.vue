<template>
 <div class="relative-position">
<transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut">
    <q-item
    :class="order.delivered ? 'bg-green-1' : 'bg-white-1'"
    class="q-pb-md q-pt-md"
    v-touch-hold.mouse="showEditOrderModal"
    clickable
    :to="{ path: 'order-details', query: { id: id , order:order}}">
        <q-item-section avatar>
          <q-icon v-if="order.delivered" color="accent" name="home" />
          <q-icon v-else color="accent" name="local_shipping" />
        </q-item-section>
        <q-item-section>
          {{order.name}}
          <q-item-label class= "q-pt-sm" caption>{{order.track_id}}</q-item-label>
          <q-item-label caption>{{order.courier.name}}</q-item-label>
          </q-item-section>
        <q-item-section side>
          <q-item-label caption>{{order.last_update}}</q-item-label>
        </q-item-section>
        <q-item-section side>
            <div class="row">
            <q-btn 
                @click.prevent="showEditOrder = true" 
                flat round dense 
                color="secondary" 
                icon="edit"/>
            <q-btn 
                v-if="order.archived"
                @click.prevent="delete_order(id)"
                flat round dense 
                color="negative" 
                icon="delete"/>
            <q-btn 
                v-else
                @click.prevent="updateOrder({id: id, updates:{archived: !order.archived}})" 
                flat round dense 
                color="secondary" 
                icon="archive"/>
            </div>
        </q-item-section>
       

        <q-dialog v-model="showEditOrder">
            <edit-order 
            @close = "showEditOrder = false"
            :order="order"
            :id="id" />
        </q-dialog>
      </q-item>
</transition>
 </div>
      
</template>

<script>
import {mapActions} from 'vuex'
export default {
    props:['order', 'id'],
    data() {
        return {
            showEditOrder:false
        }
    },
    methods: {
        ...mapActions('orders', ['updateOrder', 'deleteOrder']),
        delete_order(id){
            this.$q.dialog({
                title: 'Confirm',
                message: 'Would you like to delete the order?',
                ok:{
                    push:true
                },
                cancel: {
                    color:'negative'
                },
                persistent: true
            }).onOk(() => {
                this.deleteOrder([id])
            })
        },
        showEditOrderModal(){
            this.showEditOrder = true
        }
    },
    components:{
        'edit-order' : require('components/Orders/Modals/editOrder.vue').default
    }
}
</script>

<style>

</style>