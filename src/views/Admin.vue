<template>
    <div>
        <CreateUser/>
        <CreateCompany/>
    </div>
</template>

<script>
    import CreateUser from '../components/CreateUser.vue'
    import CreateCompany from '../components/CreateCompany.vue'
    export default {
        name : 'Admin',
        components : {CreateUser, CreateCompany}
    }
</script>

<style scoped>

</style>