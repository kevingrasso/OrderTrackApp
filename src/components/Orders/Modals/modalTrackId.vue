<template>
    <q-card-section class="q-pt-none">
            <q-input 
                @input="$emit('update:track_id', $event)"
                :rules="[
                    val => !!val || 'Field is required',
                    val => !isTrackIdValid(val) || 'Please enter a valid Track Id']"
                outlined
                ref="track_id"
                :value="track_id" 
                label="Tracking id *" />
          </q-card-section>
</template>
<script>
export default {
    props:['track_id'],
    methods: {
        isTrackIdValid(val){
            const re = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
            return re.test(String(val).toUpperCase())
        }
    },
}
</script>