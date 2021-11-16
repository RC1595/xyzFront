<template>
    <div>
    <div id="btns">
        <CreateCoBtn/><CreateUserBtn/><CreateProdBtn/><SignOut/>

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
    import SignOut from '../components/SignOut.vue'

    export default {
        name : 'Admin',
        components : {RentalEquipment, CreateCoBtn, CreateUserBtn, CreateProdBtn, SignOut}
    }
</script>

<style scoped>
#btns {
    display: inline-flex;
    justify-content: space-around;
}

</style>