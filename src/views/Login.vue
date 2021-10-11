<template>
  <div class="login_Container">
    <div class="logotype_Container">
      <img src="../assets/logo.png" alt="storageLogotype">
      <h1>storage</h1>
      <div id="logoLine"></div>
      <p>let’s be productive.</p>
    </div>
    <div class="inputs_Container">
      <input class="username" type="text" placeholder="username" v-model="username">
      <div class="password-box">
      <input class="password" :type="(!this.showPassword)? 'password' : 'text'" placeholder="password" v-model="password">
      <span class="password-eye"><img v-if="!showPassword" src="../assets/eye.svg" alt="eye" @click="changeImage()">
      <img v-else src="../assets/eye-off.svg" alt="eye" @click="changeImage()"></span>
      </div>
    </div>
    <div class="remember-me">
      <input type="checkbox" id="remember" name="remember" v-model="stayLogged">
      <label for="remeber">remember me?</label>
    </div>
    <div class="btn_Container">
      <button @click="homePage()">login</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Login',
  data(){return{
    stayLogged: false,
    username:'',
    password:'',
    showPassword: false,
    imageSource: '../assets/eye.svg',
  }
  },
  computed:{
      ...mapGetters(['GET_USERS'])
  },
  methods:{
    ...mapMutations(['REGISTER_USER','UPDATE_CURRENTUSER','UPDATE_STAYLOGGED']),
    homePage(){
      if(this.GET_USERS.find(e => e.username === this.username)) {
        if(this.GET_USERS.find(e => e.password === this.password)){
          this.UPDATE_CURRENTUSER(this.username);
          this.$router.push('/home')
        } else
        console.error("Wrong password")
        }
      else {
        if(this.username === '' || this.password==='' || this.username ===undefined || this.password === undefined) console.error("You need to pass valid data")
        else {this.REGISTER_USER({id:this.GET_USERS[length],'username':this.username,'password':this.password,'stats':[
          {
          activeProjects: 0,
          dayCommits: 0,
          nightCommits:0,
          mon: 0,
          tue: 0,
          thu: 0,
          wed: 0,
          fri: 0,
          sat: 0,
          sun: 0,
          newTech: 0
          }],'tech':[],'inbox':[]}); 
        this.UPDATE_CURRENTUSER(this.username)
        this.UPDATE_STAYLOGGED(this.stayLogged)}
        this.$router.push('/home')
        }
    },
    changeImage(){
      this.showPassword = !this.showPassword;
    }
  },
}
</script>
<style scoped>
.login_Container{
  padding-top: 2.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100%;
}
.logotype_Container{
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
.logotype_Container > img{
  max-width: 200px;
  padding: .5em 0;
}
#logoLine{
  width: 200px;
  height: 1px;
  background: black;
  margin: .5em 0;
}
.inputs_Container{
  display: flex;
  flex-direction: column;
  padding: 6em 0 0 0;
  align-items: center;
}
input{
  width: 200px;
  border: none;
  border-bottom: 2px solid black;
  background: transparent;
  margin-bottom: 2em;
  height: 20px;
  color: black;
  font-size: 12pt;
  padding: 5px;
}
input:focus{
  outline: none;
}
input::placeholder{
  color: black;
  font-size: 12pt;
}
.password-box{
  margin-left: 1.5em;
}
.password-eye{
position: relative;
right: 1.75em;
top: .5em;cursor: pointer;
}
.remember-me{
  display: flex;
  position: relative;
  right: 2em;
}
.remember-me > input{
  width:unset;
  margin-right: 1em;
  cursor: pointer;
}
.btn_Container{
  display: flex;
  flex-direction: column;
  padding: 5em 0 0 0;
  align-items: center;
}
.btn_Container > button{
  background-color: black;
  border-radius: 5px;
  height: 50px;
  width: 200px;
  color: #F2AE30;
  font-size: 18pt;
  border: none;
  filter: drop-shadow(7px 12px 20px rgba(0, 0, 0, 0.41));
  cursor: pointer;
}
</style>
