<template>
    <div>

    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name : 'adminGet',
        userlist(){
            axios.request({
                method: 'GET',
                url: 'http://127.0.0.1:5000/api/login',
                headers: {
                    token : cookies.get('token'),
                },
            }).then((response) => {
                console.log(response);
            }).catch((error)=>{
                console.error(error+"error");
            })
        }            
    }
</script>

<style scoped>

</style>