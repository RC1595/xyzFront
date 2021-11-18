<template>
    <div>
        <v-app>
            <v-card class="card">
        <v-container fluid>
            <v-row align="center">
                <div>
                    <v-col class="d-flex"
                    cols="12"
                    sm="12">
                        <v-select id="client"
                        v-model="selectedCompany"
                        :items="company"
                        item-text="companyId"
                        label="Client"
                        dense
                        ></v-select>
                    </v-col>
                </div>
                <v-col class="d-flex"
                cols="12"
                sm="4">
                    <v-select id="user"
                    v-model="selectedUser"
                    :items="user"
                    item-text="userId"
                    label="Select User"
                    dense>
                    </v-select>
                </v-col>
                <v-col class="d-flex"
                cols="12"
                sm="4">
                    <v-select id="sn"
                    v-model="selectedSn"
                    :items="sn"
                    item-text="sn"
                    label="Equipment"
                    dense
                    ></v-select>
                </v-col>
                <v-btn id="btn" @click="submit">Submit</v-btn>
                <!-- <v-btn @click="cancel">Cancel</v-btn> -->
            </v-row>
        </v-container>
        </v-card>
        </v-app>
    </div>
</template>

<script>
    import cookies from 'vue-cookies'
    import axios from 'axios'
    export default {
        name: 'CreateRental',
        data: () => ({
            user: [],
            company: [],
            sn: [],
            selectedUser: '',
            selectedCompany: '',
            selectedSn: ''
    }),
        mounted(){
            this.getCo(),
            this.getUser(),
            this.getSn()
        },
        methods: {
            submit(){
                axios.request({
                    method: 'POST',
                    url: 'http://xyzrent.ml/api/rentals',
                    headers: {
                        token : cookies.get('token'),
                    },
                    data: {
                        selectedSn: this.selectedSn,
                        selectedUser: this.selectedUser,
                        selectedCompany: this.selectedCompany
                    }
                    }).then((response) => {
                    console.log(response);
                    this.$router.push('/admin')
                    }).catch((error)=>{
                        console.warn(error+"please fill out all required fields");
                    })
            },
                
            getCo(){
                axios.request({
                    method: 'GET',
                    url: 'http://xyzrent.ml/api/company',
                    headers: {
                        token : cookies.get('token'),
                    },
                }).then((response) => {
                    this.company = response.data
                    console.log(response.data)
                }).catch((error)=>{
                console.error(error+"error");
                })
            },
        
            getUser(){
                axios.request({
                    method: 'GET',
                    url: 'http://xyzrent.ml/api/user',
                    headers: {
                    token : cookies.get('token'),
                    },
                    }).then((response) => {
                        this.user = response.data
                        console.log(response.data)
                        }).catch((error) => {
                        console.error(error+"error")
                        })
                },

            getSn(){
                axios.request({
                    method:'GET',
                    url: 'http://xyzrent.ml/api/equipment',
                    headers: {
                    token : cookies.get('token'),
                    },
                    }).then((response) => {
                        this.sn = response.data
                        console.log(response.data)
                        }).catch((error) => {
                        console.error(error+"error")
                        })        
            }
        }
    }

</script>

<style scoped>
.card {
    background-color:lightskyblue;
    height: 25vh;
    margin-left: 20vw;
    margin-top: 15vh;
}
#btn {
    position:absolute;
    bottom:0;
    right:0;
}


</style>