<template>
    <div>

        <v-row justify="center">
            <v-col
                cols="12"
                sm="10"
                md="8"
                lg="6"
            >
            <v-card class="user" ref="form">
                <v-card-text>
                    <v-text-field
                    ref="fname"
                    v-model="fName"
                    :rules="[
                    () => !!fName || 'This field is required',
                    () => !!fName && fName.length <= 10 || 'First name must be less than 10 characters',
                    userNameCheck
                    ]"
                    label="First Name"
                    placeholder="First Name"
                    counter="10"
                    required
                ></v-text-field>

                <v-text-field
                    ref="lName"
                    v-model="lName"
                    :rules="[
                    () => !!lName || 'This field is required',
                    () => !!lName && lName.length <= 15 || 'First name must be less than 15 characters',
                    userNameCheck
                    ]"
                    label="Last Name"
                    placeholder="Last Name"
                    counter="15"
                    required
                ></v-text-field>

                                    <v-text-field
                    ref="companyName"
                    v-model="companyName"
                    :rules="[
                    () => !!companyName || 'This field is required',
                    () => !!companyName && companyName.length <= 20 || 'Company Name must be less than 20 characters'
                    ]"
                    label="Company Name"
                    placeholder="Company name"
                    counter="200"
                    required
                ></v-text-field>
                    <!-- email -->
                <v-text-field
                    ref="email"
                    v-model="email"
                    :rules="[rules.required, rules.email]"
                    label="E-mail"
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.emailMatch]"
                    :type="show4 ? 'text' : 'password'"
                    name="input-10-2"
                    label="Enter Password"
                    hint="At least 8 characters"
                    value=""
                    error
                    @click:append="show4 = !show4"
                ></v-text-field>

                <v-text-field
                    ref="role"
                    v-model="role"
                    :rules="[() => !!role || 'This field is required']"
                    :error-messages="errorMessages"
                    label="Role"
                    placeholder="User Role"
                    required
                ></v-text-field>

                <!-- Date Picker -->
                <template>
                <div data-app>
                    <div class="mb-6">Date Active: <code>{{ activeDate || 'null' }}</code></div>
                    <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="activeDate"
                        label="Active Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="activeDate"
                        :active-picker.sync="activePicker"
                        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                        min="2020-01-01"
                        @change="save"
                    ></v-date-picker>
                    </v-menu>
                </div>
                </template>

                </v-card-text>
                <v-divider class="mt-12"></v-divider>
                <v-card-actions>
                <v-btn @click="resetForm" text>
                    Cancel
                </v-btn>

                <v-spacer></v-spacer>

                <v-slide-x-reverse-transition>
                    <v-tooltip
                        v-if="formHasErrors"
                        left
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            icon
                            class="my-0"
                            v-bind="attrs"
                            @click="resetForm"
                            v-on="on"
                        >
                        <v-icon>mdi-refresh</v-icon>
                        </v-btn>
                    </template>
                    
                    </v-tooltip>
                </v-slide-x-reverse-transition>

                <v-btn
                    color="primary"
                    text
                    @click="submit">
                    Submit
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        </v-row>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name : "CreateUser",
        data: () => ({            
            errorMessages: '',
            role: '',
            fName: '',
            lName: '',
            companyName: '',
            activeDate: '',
            email:'',
            password: '',
            formHasErrors: false,
            show4: false,
            activePicker: null,
            menu: false,
            errors: '',
            rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            emailMatch: () => (`The email and password you entered don't match`),
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
            },
            },
        }),

    computed: {
        form () {
            return {
            role: this.role,
            fName: this.fName,
            lName: this.lName,
            companyName: this.companyName,
            activeDate: this.activeDate,
            email: this.email,
            password: this.password,
            }
        },
    },

    watch: {
        name () {
            this.errorMessages = ''
        },
        menu (val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },

    methods: {

        userNameCheck () {
            this.errorMessages = this.fName && !this.name
            ? `Hey! I'm required`
            : ''
            return true
        },

        //date picker vuetify
        save (activeDate) {
            this.$refs.menu.save(activeDate)
        },

        //reset form vuetify
        resetForm () {
            this.errorMessages = []
            this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
            this.$refs[f].reset()
            })
        },
        
        submit () {
            this.formHasErrors = false
            Object.keys(this.form).forEach(f => {
            if (!this.form[f]) this.formHasErrors = true,
            this.$refs[f].validate(true);
        }),

            axios.request({
                method: 'POST',
                url: 'http://xyzrent.ml/api/user',
                data: {
                        role: this.role,
                        fName: this.fName,
                        lName: this.lName,
                        email: this.email,
                        password: this.password,
                        companyName: this.companyName
                },
                
            }).then((response) => {
                    console.log(response);
                    this.$router.push('/Admin')
            }).catch((error)=>{
                console.warn(error+"please fill out all required fields");
            })
        }

    }
    }
</script>

<style scoped>

.user {
    background-color: lightskyblue;
    width: 40vw;
    margin-left: 29vw;
    margin-top:5vh;

}

</style>