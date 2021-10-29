<template>
    <div class="newUser">
        <div>
            <h1>Create New User</h1>
        </div>
        <div class="userRole">
            <v-container fluid>
                <v-checkbox
                    v-model = "isAdmin"
                    :label = "`Is Admin: ${isAdmin.toString()}`">
                </v-checkbox>
            </v-container>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'CreateUser',
        data () {
            return {
                isAdmin: true,
            }
        },
    }
</script>

<style scoped>

</style>