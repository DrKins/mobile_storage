<template>
  <div class="main_Container">
    <popup_session class="popup_Component" v-if="popup_Controller" @clicked="onClickChild"/>
    <myheader/>
    <div class="navigation_Container">
      <div class="info_Rectangle">
        <img class="activityIcon" :src="(this.GET_LASTACTIVITY.logo)? this.GET_LASTACTIVITY.logo : require('../assets/hand.svg')" alt="handIcon">
        <div class="info_Rectangle_text">
          <h2>Last activity</h2>
          <h4>{{(this.GET_LASTACTIVITY.name)? this.GET_LASTACTIVITY.name : 'None, you lazy bastard'}}</h4>
          <div class="info_Rectangle_text_date" v-if="this.GET_LASTACTIVITY.name">
            <p>03/08/2021</p>
            <img src="../assets/clock.svg" alt="clockIcon">
          </div>
        </div>  
      </div>
      <div class="menu_btns">
        <div class="btn1 btn" @click="goToStats()">
          <img src="../assets/stats.svg" alt="statsLogo">
          <h4>statistics</h4> 
        </div>
        <div class="btn2 btn" @click="goToProjects()">
          <img src="../assets/projects.svg" alt="projectsLogo">
          <h4>projects</h4> 
        </div>
        <div class="btn3 btn" @click="goToProgress()">
          <img src="../assets/progress.svg" alt="progressLogo">
          <h4>progress</h4> 
        </div>
        <div class="btn4 btn" @click="goToCollab()">
          <img src="../assets/colab.svg" alt="colabLogo">
          <h4>collabolators</h4> 
        </div>
      </div>
      <div class="btn_Container">
        <button @click="popup_Controller = true">session</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import myheader from '../components/myheader.vue'
import popup_session from '../components/popup_session.vue'
export default {
name:'Home',
 data: function(){
      return{
        popup_Controller: false,
      }
 },
 computed:{
   ...mapGetters(['GET_LASTACTIVITY'])
 },
 methods:{
    onClickChild (value) {
      this.popup_Controller = false;
    },
    goToProjects(){
      this.$router.push({path:'/projects'})
    },
    goToStats(){
      this.$router.push({path:'/stats'})
    },
    goToProgress(){
      this.$router.push({path:'/progress'})
    },
    goToCollab(){
      this.$router.push({path:'/collab'})
    }
 },
components:{
  myheader,
  popup_session
}
}
</script>

<style scoped>
.info_Rectangle{
  margin: 1em 0;
  padding: 1.5em 0;
  background: #F2AE30;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.activityIcon{
  height: 6em;
}
.info_Rectangle_text{
  text-align: left;
}
.info_Rectangle_text_date{
  display: flex;
  justify-content: space-between;
}
.menu_btns{
   padding: 0 .5em;
   display: grid; 

   grid-template-rows: 1fr 1fr;
   grid-template-columns: 1fr 1fr;
   
   grid-template-areas: 
	'label0 label1'
	'label2 label3';
   
   gap: .5em;
   height: 100%;
}
.btn{
  background: #F2AE30;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 1em;
  cursor: pointer;
}
.btn:hover{
   background: #ffbe45;
}
.btn_Container{
  display: flex;
  flex-direction: column;
  padding: 1em 0 1em 0;
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
.btn_Container > button:hover{
  background-color: #130d04
}
.popup_Component{
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}
@media (min-width:961px) {
.menu_btns{
   padding: 0 .5em;
   display: grid; 

   grid-template-rows: 1fr 2fr 1fr 1.5fr;
   grid-template-columns: 1fr;
   
   grid-template-areas: 
	'label0'
	'label1';
   
   gap: .5em;
   height: 100%;
}
.btn{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
}
</style>