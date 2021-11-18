<template>
    <div>
        <v-card class = "createCo" ref="form">
            <v-card-text>
                <v-text-field
                    ref="company"
                    v-model="company"
                    :rules="[
                    () => !!company || 'This field is required',
                    () => !!company && company.length <= 20 || 'Company name must be less than 20 characters',
                    companyCheck
                    ]"
                    label="Company"
                    placeholder="Company"
                    counter="20"
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

    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name : 'CreateCompany',
        data:() =>({
            countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', `Timor L'Este`, 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
            company : '',
            address : '',
            city : '',
            region : '',
            zip : '',
            country : '',
            phoneNumber : '',
            activeDate: '',
            activePicker: null,
            menu: false,
            formHasErrors: false,
            errors: '',
            rules: {
            required: value => !!value || 'Required.'
            }
        }),
        computed: {
            form () {
                return {
                company: this.company,
                address: this.address,
                city: this.city,
                region: this.region,
                zip: this.zip,
                country: this.country,
                phoneNumber: this.phoneNumber,
                activeDate: this.activeDate
                }
            },
        },

        methods: {
            companyCheck () {
                this.errorMessages = this.company && !this.company
                ? `Hey! I'm required`
                : ''
                return true
            },
            addressCheck () {
                this.errorMessages = this.address && !this.address
                ? `Hey! I'm required`
                : ''
                return true
            },
            save (activeDate) {
                this.$refs.menu.save(activeDate)
        },
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
                url: 'http://xyzrent.ml/api/company',
                data: {
                        company: this.company,
                        phoneNumber: this.phoneNumber,
                        address: this.address,
                        city: this.city,
                        region: this.region,
                        country: this.country,
                        zip: this.zip,
                        activeDate: this.activeDate
                }
                
            }).then((response) => {
                    console.log(response);
                    this.$router.push('/admin')
            }).catch((error)=>{
                console.warn(error+"please fill out all required fields");
            })
        }
        }
    }

</script>

<style scoped>

.createCo {
    background-color: lightskyblue;
    width: 40vw;
    margin-left: 29vw;
    margin-top:5vh;

}

</style>