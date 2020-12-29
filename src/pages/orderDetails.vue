<template>
<q-page padding>
  <div class="q-pa-md row items-start q-gutter-md middle">
    <q-card class="my-card col bg-grey-3" flat bordered>
      
      <q-card-section>
        <div class="text-h4 q-mt-sm q-mb-sm">
          {{order.name}}
          </div>
        <div class="text-caption text-grey q-mt-md q-mb-md">
          Last update: {{order.last_update}}
        </div>
        <div class="text-caption text-grey">
          Track ID: {{order.track_id}}
        </div>
      </q-card-section>
        
    </q-card>
  </div>
    <div class="q-pa-md" >
    <q-list bordered padding>
      <q-item-label header>Updates</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>15/04/2020</q-item-label>
        </q-item-section>
      </q-item>

      
    </q-list>
  </div>
</q-page>
 
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      order:{
        track_id:'',
        name:'',
        last_update:'',
        delivered: false,
        archived: false
      },
      updates:[
        {
          
        }
      ]
    }
  },
  methods: {
    getOrderData(data){
      Object.assign(this.order, data)
      console.log(data.name)
    }
  },
  beforeMount(){
    console.log('ID: '+this.$route.query.id)
    this.getOrderData(this.orderInformation(this.$route.query.id))
  },
  computed:{
    ...mapGetters('orders', ['orderInformation'])
  }
}
</script>

<style>

</style>