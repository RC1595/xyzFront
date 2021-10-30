<template>
    <div>
        <v-btn @click="signOut">Sign Out</v-btn>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name : 'SignOut',
        methods: {
            signOut() {
                axios.request({
                    method: 'DELETE',
                    mode : 'cors',
                    url: 'http://127.0.0.1:5000/api/login',
                    data: {
                        token: this.token,
                    }
                })
            }
        }
    }    
</script>

<style scoped>

</style>