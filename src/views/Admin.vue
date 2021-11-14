<template>
    <div>
    <div>
        <CreateCoBtn/><CreateUserBtn/><CreateProdBtn/>

    </div>
    <div>
        <RentalEquipment/>
    </div>
    </div>
</template>

<script>
    import CreateProdBtn from '../components/CreateProdBtn.vue' 
    import RentalEquipment from '../components/RentalEquipment.vue'
    import CreateCoBtn from '../components/CreateCoBtn.vue'
    import CreateUserBtn from '../components/CreateUserBtn.vue'

    export default {
        name : 'Admin',
        components : {RentalEquipment, CreateCoBtn, CreateUserBtn, CreateProdBtn}
    }
</script>

<style scoped>

</style>