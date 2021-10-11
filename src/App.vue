<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
*{
  padding: 0;
  margin: 0;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: linear-gradient(180deg, #F2AE30 0%, #C25E06 100%);
  min-height: 100vh;
  font-size: 12pt;
}
</style>
