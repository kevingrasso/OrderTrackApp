<template>
    <q-tabs
    class="bg-primary row text-white  ">
        <q-route-tab 
          v-for="tab in tabs" 
          dense
          class="col"
          :key="tab.label"
          :to="tab.link" 
          :label="tab.label" 
          :icon="tab.icon" />
      </q-tabs>
</template>

<script>
export default {
    props:['tabs']
}
</script>

<style scoped>
 @media screen and (min-width: 768px){
   .q-tabs{
     display: none;
   }
 }
</style>