<template>
    <div>
        <v-container fluid>
            <v-row align="center">
                <div v-for="item in items" :key="item.items">
                    <v-col class="d-flex"
                    cols="12"
                    sm="6">
                        <v-select
                        :items="item"
                        label="Select Client"
                        dense
                        ></v-select>
                    </v-col>
                </div>
                <v-col class="d-flex"
                cols="12"
                sm="6">
                    <v-select
                    :items="user"
                    label="Standard"
                    dense
                    ></v-select>
                </v-col>
                <v-col class="d-flex"
                cols="12"
                sm="6">
                    <v-select
                    :items="sn"
                    label="Standard"
                    dense
                    ></v-select>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import cookies from 'vue-cookies'
    import axios from 'axios'
    export default {
        name: 'CreateRental',
        data: () => ({
            sn: [],
            items: '',
            user: []
    }),
        created(){
            this.getCo()
        },
        methods: {
            getCo(){
                axios.request({
                    method: 'GET',
                    url: 'http://127.0.0.1:5000/api/company',
                    headers: {
                        token : cookies.get('token'),
                    },
                }).then((response) => {
                    this.items = response.data
                    console.log(response.data);
                }).catch((error)=>
                console.error(error+"error"));
            }
        }
    }
</script>

<style scoped>

</style>