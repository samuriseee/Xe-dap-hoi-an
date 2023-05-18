<template>
  <div id="app">
    <NavBar v-if="$route.name !== 'login' && $route.name !== 'register'" />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/layout/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #d70000;
}
</style>
