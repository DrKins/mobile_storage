<template>
      <div class="header_Container">
      <div class="header_Text">
        <p>Welcome <b>{{GET_CURRENTUSER}}</b>!</p>
        <p>Let's build something together.</p>
      </div>
      <img src="../assets/logo.png" alt="logotype" @click="openMenu()">
      <div class="dropdown">
                  <div v-if="menu" class="notMobile" @click="logout">
                      <img src="../assets/exit.svg" alt="exit">
                      <div>Log out</div>
                  </div>
              </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
name: 'myheader',
computed:{
  ...mapGetters(['GET_CURRENTUSER'])
},
data(){
  return{
    menu: false
  }
},
methods:{
  ...mapMutations(['LOGOUT']),
  openMenu(){
    this.menu = !this.menu
  },
  logout(){
    this.LOGOUT()
    this.$router.push('/')
  }
}
}
</script>

<style scoped>
.dropdown{
    position: absolute;
    right: 20px;
    top:100px;
    width: 100px;
    text-align: left;
    justify-self: end;
    display: flex;
    flex-direction: row;
    background-color: black;
    -webkit-box-shadow: -5px 10px 20px -4px rgba(0,0,0,0.18);
    -moz-box-shadow: -5px 10px 20px -4px rgba(0,0,0,0.18);
    box-shadow: -5px 10px 20px -4px rgba(0,0,0,0.18);
    border-radius: 5px;
    cursor: pointer;
}
.dropdown > div.notMobile{
    padding: 1.5vh;
    display:flex;
    justify-content: center;
    color:#F2AE30;
    font-weight: bold;
    
}
.dropdown > div:first-child > img{
    align-self: center;
    height: 20px;
    margin-right: 1vw;
}
.header_Container{
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #F2AE30;
  box-shadow: 0px 5px 10px -3px rgba(0, 0, 0, 0.25);
  height: 100px;
  position:sticky;
  top: 0;
  z-index: 3;
}
.header_Container > img {
  height: 50px;
  margin-right: 5px;
  cursor: pointer;
}
.header_Text{
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  margin: 1em 0 0 1em;
}
</style>