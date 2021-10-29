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
