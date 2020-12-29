<template>
<transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut">
        <q-banner 
        rounded
        class="bg-grey-3 q-pa-lg flex flex-center text-center">
            <span class="text-h6 text-no-wrap">
                <slot></slot> 
            </span>
        </q-banner>
</transition>
</template>