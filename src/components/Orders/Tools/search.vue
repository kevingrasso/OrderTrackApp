<template>
   <q-input 
   outlined
   @keyup.esc="searchField=''"
   v-model="searchField" 
   class="col"
   label="Search">
        <template v-slot:append>
          <q-icon 
          v-if="searchField !== ''" 
          name="close" 
          @click="searchField = ''" 
          class="cursor-pointer" />
          <q-icon name="search" />
        </template>
      </q-input>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    computed:{
        ...mapState('orders', ['search']),
        searchField:{
            get() {
                return this.search
            },
            set(value){
                this.setSearch(value)
            }
        }
    },
    methods: {
        ...mapActions('orders', ['setSearch'])
    },
}
</script>

<style>

</style>