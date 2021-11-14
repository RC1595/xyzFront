<template>
    <div>
        <div v-for="rental in rentals"
        :key="rental.sn">
            <v-card class="rentals">
                <v-card-title>{{rental.companyName}}</v-card-title>
                <v-card-subtitle>Phone: {{rental.phone}}</v-card-subtitle>
                <v-card-text>Contact: {{rental.fName}}  {{rental.lName}}&#160;&#160;&#160; Email: {{rental.email}}<br></v-card-text>
                <v-card-text>Equipment# {{rental.sn}}</v-card-text>
                <v-card-text>Date Out: {{rental.dateOut}}</v-card-text>
                <v-card-text>Date In: {{rental.dateIn}}</v-card-text> 
            </v-card>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
    export default {
        name : 'RentalEquipment',
        data: () => ({
            rentals : [],
        }),

        mounted(){
            this.getRentals()
        },

        methods: {
            getRentals(){
                axios.request({
                    method: 'GET',
                    url: 'http://127.0.0.1:5000/api/rentals',
                    headers: {
                        token : cookies.get('token'),
                    },
                }).then((response) => {
                    this.rentals = response.data
                    console.log(response.data);
                }).catch((error)=>{
                    console.error(error+"error");
                })
            }
        }
    }            
</script>

<style scoped>
.rentals{    
    background-color:lightskyblue;
    width:75vw;
    height: 40vh;
    margin-bottom: 5vh;
    margin-left: 11vw;
}

</style>