<template>
    <q-card-section class="q-pt-none">
        <q-input 
            autofocus
             outlined
             @input="$emit('update:name', $event)"
            :value="name" 
            :rules="[val => !!val || 'Field is required']"
            ref="name"
            label="Order name *" />
    </q-card-section>
</template>

<script>
export default {
    props:['name']
}
</script>