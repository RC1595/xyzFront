<template>
  <div class="home">
    <h1>Log in to continue</h1>
    <LoginForm/>
  </div>
</template>

<script>
  import LoginForm from '../components/LoginForm.vue'

  export default {
    name: 'Home',
    components: {LoginForm},
}
</script>

<style scoped>

h1 {
  margin-left:10vw;
  padding-bottom: 2vh;
  padding-top: 2vh;
  margin-left: 15vw;
}





</style>