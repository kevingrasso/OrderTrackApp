<template>
      <q-select filled 
      emit-value
      map-options
      class="col q-ml-sm"
      v-model="sortBy" 
      :options="options" 
      label="Sort by" 
      stack-label />

</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    data () {
        return {
            options: [
            {
                label:'Name',
                value:'name'
            },
            {
                label:'Last Update',
                value:'last_update'
            }
            ],
        }
    },
    computed:{
        ...mapState('orders', ['sort']),
        sortBy:{
            get(){return this.sort},
            set(value){
                this.setSort(value)
            }
        }
    },
    methods: {
        ...mapActions('orders', ['setSort'])
    },
}
</script>

<style scoped>
    .q-select{
        flex: 0 0 137px;
    }

</style>