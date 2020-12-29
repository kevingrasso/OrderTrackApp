<template>
    <q-card-section class="q-pt-none">
            <q-input 
                @input="$emit('update:track_id', $event)"
                :rules="[val => !!val || 'Field is required']"
                outlined
                ref="track_id"
                :value="track_id" 
                label="Tracking id *" />
          </q-card-section>
</template>
<script>
export default {
    props:['track_id']
}
</script>