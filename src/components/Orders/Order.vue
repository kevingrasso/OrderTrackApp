<template>
<transition
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut">
    <div class="relative-position full-width q-mb-sm">
    
        <q-item
            :class="order.delivered ? 'bg-green-1' : 'bg-blue-grey-1'"
            style="border-radius:5px;"
            class="q-pb-md q-pt-md row"
            v-touch-hold:500.mouse="showEditOrderModal"
            clickable
            
            :to="{ path: '/order-details', query: { id: id , order:order}}">
            <q-item-section avatar class="col-1">
                <q-badge v-if= "order.order_data.updated" color="orange" class="absolute-top-left q-ml-sm q-mt-lg" style="border-radius: 10px; height:10px;"></q-badge>
                <q-icon v-if="order.delivered" color="accent" name="home" />
                <q-icon v-else color="accent" name="local_shipping" />
            </q-item-section>
            <q-item-section class="col q-pl-md ow">
                <q-item-label class= "ow"> {{order.name}}</q-item-label>
               
                <q-item-label class= "q-pt-sm text-uppercase ow" caption>{{order.track_id}}</q-item-label>
                <q-item-label caption class="text-capitalize">{{order.courier.name | name_courier}}</q-item-label>
            </q-item-section>
            <q-item-section class="col-4" side>
                <q-item-label caption class="text-center">{{order.order_data.lastUpdateTime | time}}</q-item-label>
            </q-item-section>
            <q-item-section class="col-2" side>
               
                <q-btn 
                    @click.prevent="showEditOrder = true" 
                    flat round dense 
                    class="row"
                    color="secondary" 
                    icon="edit"/>
                <q-btn 
                    v-if="order.archived"
                    @click.prevent="delete_order(id)"
                    flat round dense 
                    class="row"
                    color="negative" 
                    icon="delete"/>
                <q-btn 
                    v-else
                    @click.prevent="archiveOrder(id)" 
                    flat round dense 
                    class="row"
                    color="secondary" 
                    icon="archive"/>
                
            </q-item-section>
        

            <q-dialog v-model="showEditOrder">
                <edit-order 
                @close = "showEditOrder = false"
                :order="order"
                :id="id" />
            </q-dialog>
        </q-item>
    </div>
 </transition>
      
</template>

<script>
import { route } from 'quasar/wrappers'
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
                this.$q.notify({
                message: 'Order Deleted'
                })
            })
        },
        archiveOrder(id){
            this.$q.notify({
                message: 'Order Archived'
            })
            this.updateOrder({
                id: id, 
                updates:{
                    archived: !this.order.archived
                    }
            })

        },
        showEditOrderModal(){
            this.showEditOrder = true
        },
    },
    components:{
        'edit-order' : require('components/Orders/Modals/editOrder.vue').default
    },
    filters:{
        time: function(value){
            if (!value) return ''
            return value.slice(0,-3)
        },
        name_courier: function(value){
            if (!value) return ''
            return value.replace("-", " ")
        }
    }
}
</script>

<style>
.ow{
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
</style>