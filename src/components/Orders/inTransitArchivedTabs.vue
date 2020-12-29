<template>
    <q-tabs
    class="bg-primary text-white shadow-2">
        <q-route-tab 
          v-for="tab in tabs" 
          dense
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

<style>

</style>