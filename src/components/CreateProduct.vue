<template>
    <div>
    <v-card flat>
        <v-snackbar
        v-model="snackbar"
        absolute
        top
        right
        color="success"
        >
        <span>Registration successful!</span>
        <v-icon dark>
            mdi-checkbox-marked-circle
        </v-icon>
        </v-snackbar>
        <v-form
        ref="form"
        @submit.prevent="submit"
        >
        <v-container fluid>
            <v-row>
            <v-col
                cols="12"
                sm="6"
            >
                <v-text-field
                v-model="form.prodSn"
                :rules="rules.Prod"
                color="purple darken-2"
                label="Serial Number"
                required
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
            >
                <v-text-field
                v-model="form.prodDesc"
                :rules="rules.prod"
                color="blue darken-2"
                label="Product Description"
                required
                ></v-text-field>
            </v-col>

            <v-col cols="12">
                <v-checkbox
                v-model="form.inventory"
                color="green"
                >
                <template v-slot:label>
                    <div @click.stop="">
                    Enter into Inventory
                    </div>
                </template>
                </v-checkbox>
            </v-col>
            </v-row>
        </v-container>
        <v-card-actions>
            <v-btn
            text
            @click="resetForm"
            >
            Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
            :disabled="!formIsValid"
            text
            color="primary"
            type="submit"
            >
            Register
            </v-btn>
        </v-card-actions>
        </v-form>

    </v-card>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'CreateProduct',
        data () {
        const defaultForm = Object.freeze({
            prodSn: '',
            prodDesc: '',
            inventory: false,
        })

        return {
            form: Object.assign({}, defaultForm),
            rules: {
            name: [val => (val || '').length > 0 || 'This field is required'],
            },
            conditions: false,
            content: '',
            snackbar: false,
            inventory: false,
            defaultForm,
        }
        },

        computed: {
        formIsValid () {
            return (
            this.form.prodSn &&
            this.form.prodDesc &&
            this.form.inventory
            )
        },
        },

        methods: {
        resetForm () {
            this.form = Object.assign({}, this.defaultForm)
            this.$refs.form.reset()
        },
        submit () {
            this.snackbar = true
            this.resetForm()

        axios.request({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/equipment',
            data: {
                sn: this.sn,
                prod: this.prod,
                status: this.status
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

</style>