<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/rental">New Rental</router-link> |
      <router-link to="/admin">Dashboard</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  display: grid;
  grid-template-columns: 1fr, 1fr, 1fr, 1fr, 1fr;
  grid-template-rows: 1fr, 1fr, 1fr, 1fr, 1fr;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: lightslategray;
}

#nav {
  grid-column-start: 1;
  grid-column-end: 6;
  padding: 30px;
  margin-right: 8vw;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #780ebe;
}
</style>
