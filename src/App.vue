<template>
  <div id="app" class="main">
    <h1 class="main-header">
      Converter
    </h1>
    <div class="main-pages">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #212121;
  min-width: 100vw;
  min-height: 100vh;
  background-color: #ebebeb;
}
.main-header {
  padding: 20px;
  font-size: 24px;
  background-color: #7ab72b;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px 0px, rgba(0, 0, 0, 0.15) 0px 3px 5px 0px;
}
.main-pages {
  margin: 55px;
}
.button {
  display: block;
  margin: 30px auto;
  padding: 10px 30px;
  background-color: #7ab72b;
  border: 1px solid #6a9e26;
  border-radius: 7%;
  font-size: 16px;
  text-transform: uppercase;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px 0px, rgba(0, 0, 0, 0.15) 0px 3px 5px 0px;
}
</style>
