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

.home h1 {
  grid-column-start: 2;
  grid-column-end: 4;
  padding-bottom: 2em;

}




</style>