<template>
    <div>

        <v-row justify="center">
            <v-col
                cols="12"
                sm="10"
                md="8"
                lg="6"
            >
            <v-card ref="form">
                <v-card-text>
                    <Adminbox/>
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

                <v-text-field
                    ref="address"
                    v-model="address"
                    :rules="[
                    () => !!address || 'This field is required',
                    () => !!address && address.length <= 25 || 'Address must be less than 25 characters',
                    addressCheck
                    ]"
                    label="Address Line"
                    placeholder="Snowy Rock Pl"
                    counter="25"
                    required
                ></v-text-field>
                <v-text-field
                    ref="city"
                    v-model="city"
                    :rules="[() => !!city || 'This field is required', addressCheck]"
                    label="City"
                    placeholder="El Paso"
                    required
                ></v-text-field>
                <v-text-field
                    ref="region"
                    v-model="region"
                    :rules="[() => !!region || 'This field is required']"
                    label="State/Province/Region"
                    required
                    placeholder="TX"
                ></v-text-field>
                <v-text-field
                    ref="zip"
                    v-model="zip"
                    :rules="[() => !!zip || 'This field is required']"
                    label="ZIP / Postal Code"
                    required
                    placeholder="79938"
                ></v-text-field>
                <v-autocomplete
                    ref="country"
                    v-model="country"
                    :rules="[() => !!country || 'This field is required']"
                    :items="countries"
                    label="Country"
                    placeholder="Select..."
                    required
                ></v-autocomplete>

                    <v-text-field
                    v-model="phoneNumber"
                    :counter="7"
                    :error-messages="errors"
                    label="Phone Number"
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
    import Adminbox from "../components/AdminBox.vue"
    import axios from 'axios'

    export default {
        name : "CreateUser",
        components : {Adminbox},
        data: () => ({            
            countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', `Timor L'Este`, 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
            errorMessages: '',
            role: '',
            fName: '',
            lName: '',
            companyName: '',
            address: '',
            city: null,
            region: null,
            zip: null,
            country: null,
            activeDate: '',
            email:'',
            phoneNumber: '',
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
            phoneNumber: this.phoneNumber,
            address: this.address,
            city: this.city,
            zip: this.zip,
            country: this.country,
            region : this.region,
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
        addressCheck () {
            this.errorMessages = this.address && !this.name
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
        
        //Axios call to create user
        submit () {
        //     this.formHasErrors = false
        //     Object.keys(this.form).forEach(f => {
        //     if (!this.form[f]) this.formHasErrors = true,
        //     this.$refs[f].validate(true);
        // }),

            axios.request({
                method: 'POST',
                url: 'http://127.0.0.1:5000/api/user',
                data: {
                        role: this.role,
                        fName: this.fName,
                        lName: this.lName,
                        companyName: this.companyName,
                        activeDate: this.activeDate,
                        email: this.email,
                        password: this.password,
                        phoneNumber: this.phoneNumber,
                        address: this.address,
                        city: this.city,
                        zip: this.zip,
                        country: this.country,
                        region : this.region,
                },
                
            }).then((response) => {
                    console.log(response);
                    this.$router.push('LoginView')
            }).catch((error)=>{
                console.warn(error+"please fill out all required fields");
            })
        }

    }
    }
</script>

<style scoped>

</style>