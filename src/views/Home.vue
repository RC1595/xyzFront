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
.home{
  grid-column-start: 3;
  grid-column-end: 6;
  grid-row-start: 2;
  grid-row-end: 5;
  justify-items: center;
  align-items: center;
}
.home h1 {
  grid-column-start: 0;
  grid-column-end: 4;
  padding-bottom: 2em;
}




</style>