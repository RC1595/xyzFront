<template>
    <div>
        <v-btn @click="signOut">Sign Out</v-btn>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
    export default {
        name : 'SignOut',
        methods: {
            signOut() {
                axios.request({
                    method: 'DELETE',
                    mode : 'cors',
                    url: 'http://xyzrent.ml/api/login',
                    data: {
                        token: cookies.get('token'),
                    }
                }).then((response) => {
                    cookies.remove('token')
                    cookies.remove('userId')
                    console.log(response);
                }).catch((error)=>{
                    console.error(error+"error");
            })
            }
        }
    }    
</script>

<style scoped>

</style>