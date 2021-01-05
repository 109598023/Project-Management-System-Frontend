<template>
  <div id="app" class="d-flex flex-column">
    <navbar class="position-relative"></navbar>
    <div class="flex-grow-1">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  components: { Navbar },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  /* margin-top: 56px; */
  /* height: calc(100vh - 56px); */
}
</style>
