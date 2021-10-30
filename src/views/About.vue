<template>
  <div class="about">
    <SignOut/>
    <CreateUser/>
  </div>
</template>


<script>
  import CreateUser from '../components/CreateUser.vue'
  import SignOut from '../components/SignOut.vue'
  export default {
    name: "About",
    components : {CreateUser, SignOut}
  }
</script>

<style scoped>

</style>
