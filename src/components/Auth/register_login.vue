<template>
    <form @submit.prevent = "submitForm">
        <q-banner class="bg-grey-3 row q-mb-md" rounded>
            <template v-slot:avatar>
                <q-icon name="account_circle" color="primary" />
            </template>
            {{tab | titleCase}} to our Order Track App
        </q-banner>
        <div  class="row q-mb-xs">
            <q-input 
            class=" col"
            outlined 
            v-model="formData.email" 
            label="Email"
            ref="email"
            :rules="[ val => isEmailValid(val) || 'Please enter a valid email address']" 
            lazy-rules />
        </div>
        <div  class="row q-mb-xs">
        <q-input 
            class=" col "
            outlined 
            v-model="formData.password" 
            type="password"
            label="Password"
            ref="password"
            :rules="[ val => val.length >= 6 || 'Please use minimum 6 characters']" 
            lazy-rules/>
        </div>
        <div  class="row q-mb-sm">
             <q-btn 
             class="q-mx-auto"
             style="width:50%;"
             color="secondary" 
             :label= 'tab'
             type="submit" />
        </div>
    </form>
</template>
<script>
import {mapActions} from 'vuex'

export default {
    props:['tab'],
    data() {
        return {
            formData:{
                email:'',
                password:''
            }
        }
    },
    methods: {
        ...mapActions('auth', ['registerUser', 'loginUser']),
        submitForm(){
            this.$refs.email.validate()
            this.$refs.password.validate()
            if(!this.$refs.email.hasError && ! this.$refs.password.hasError){
                if(this.tab == 'login'){
                    this.loginUser(this.formData)
                }else{
                    this.registerUser(this.formData)
                }
            }
        },
        isEmailValid(email){
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(String(email).toLowerCase())
        }
    },
    filters:{
        titleCase(value){
            return value.charAt(0).toUpperCase()+value.slice(1)
        }
    }
}
</script>

<style>

</style>