<template>
  <div class="working_Container">
      <Popup_finish class="popup_Component" v-if="popup_Controller" @clicked="onClickChild" :name="this.projectName"/>
      <myheader/>
      <div class="info_Box">
          <h2>{{projectName}}</h2>
          <div id="logoLine"></div>
      <div class="timer_Container">
          <img src="../assets/timer.svg" alt="TimerIcon">
          <h1>{{this.h>9? h : '0'+h}}:{{this.m>9? m : '0'+m}}:{{this.s>9 ? s : '0'+s}}</h1>
      </div>
      </div>
      <div class="tech_Box">
          <p>Please select your technologies.</p>
          <Tech_chip v-for="item,index in userTech" :key="index" :item=item @selected="addTech"/>
      </div>
      <div class="newTech">
        <p v-if="insertingTech===false" @click="insertingTech = true">Used new tech?<img src="../assets/plus.svg" alt="plusIcon"></p>
        <p v-if="deleteLAST">Delete last chip<img src="../assets/delete.svg" alt="delete last chip" @click="deleteChip()"></p>
      <div class="recently_Box" v-if="insertingTech===true">
          <div class="first_Box">
              <input class="recently_chip" placeholder="Name" v-model="techName">
              <textarea placeholder="Enter tech description" v-model="techText"></textarea>
          </div>
          <img class="addChip" src="../assets/plus.svg" alt="plusIcon" @click="insertChip(techName,techText)">
      </div>   
      </div>
        <div class="btn_Container">
            <button @click="popup_Controller = true" v-if="!insertingTech && selectedTech.length !== 0">finish</button>
        </div>      
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import myheader from '../components/myheader.vue'
import Popup_finish from '../components/popup_finish.vue'
import Tech_chip from '../components/tech_chip.vue'
export default {
components:{
  Tech_chip
},
data:function(){
    return{
        deleteLAST: false,
        insertingTech: false,
        allinserted:0,
        techName: '',
        techText: '',
        projectName: undefined,
        popup_Controller: false,
        timer_running: false,
        userTech: undefined,
        selectedTech:[],
        s: 0,
        m: 0,
        h: 0,
    }
},
computed:{
  ...mapGetters(['GET_PROJECTS','GET_CURRENTUSER','GET_USERS'])
},
methods:{
  ...mapMutations(['INSERT_TECH','DELETE_LAST_TECH']),
    onClickChild (value) {
      this.popup_Controller = false;
    },
    timer(){
        setInterval(() => {
            this.s++
            if(this.s === 60 ) {this.m++; this.s = 0}
            if(this.m === 60) {this.h++; this.m = 0}
        }, 1000);
    },
    extractData(){
        let index = this.$router.history.current.path.split('/')
        let name = decodeURIComponent(index[index.length-1])
        let x = this.GET_PROJECTS.filter( x => x.name === name)
        this.projectName = x[0].name 

        this.userTech = this.GET_USERS[this.GET_USERS.findIndex(x => x.username === this.GET_CURRENTUSER)].tech
    },
    addTech(response){
        if(this.selectedTech.includes(response.name)){
            let x  = this.selectedTech.findIndex( x => x === response.name)

            this.selectedTech.splice(x,1)
        } else this.selectedTech.push(response.name)   
    },
    insertChip(name,description){
      if(name === undefined || name === '' || description === undefined || description === '') console.error("You need to input data")
      else {
        let item = {
          name: name,
          description: description
        }
        let x = this.GET_USERS.findIndex( x => x.username === this.GET_CURRENTUSER )
        this.INSERT_TECH({
          position: x,
          item: item
        })
        this.insertingTech = false;
        this.allinserted += 1;
        this.techName='',
        this.techText='',
        this.deleteLAST = true;
      }
    },
    deleteChip(){
      let x = this.GET_USERS.findIndex( x => x.username === this.GET_CURRENTUSER )
      let item = this.GET_USERS[x].tech[(this.GET_USERS[x].tech.length) - 1]
      this.DELETE_LAST_TECH({
        position: x,
        item: item
      })
      this.allinserted -= 1;
      if(this.allinserted === 0) this.deleteLAST = false;
    }
},
mounted(){
    this.timer();
    this.extractData()
},
name:"Working",
components:{
    myheader,
    Popup_finish,
Tech_chip
}
}
</script>
<style scoped>
.info_Box{
  background: #F2AE30;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 2em 1em;
  margin: 1.5em 4em;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
#logoLine{
  width: 200px;
  height: 1px;
  background: black;
  margin: .5em 0;
}
.info_Box > p{
    font-size: 10pt;
    padding: .5em 0;
}
.timer_Container{
    padding: 3em 0;
}
.btn_Container{
  display: flex;
  flex-direction: column;
  padding: 2em 0 1em 0;
  align-items: center;
}
.btn_Container > button{
  background-color: black;
  border-radius: 5px;
  height: 50px;
  width: 180px;
  color: #F2AE30;
  font-size: 18pt;
  border: none;
  font-weight: 500;
  filter: drop-shadow(7px 12px 20px rgba(0, 0, 0, 0.41));
  cursor: pointer;
}
.popup_Component{
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}
.tech_Box{
    background: #F2AE30;
    box-shadow: 0px 6px 16px -7px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    display: flex;
    flex-wrap: wrap;
    margin: 1em;
    padding: 1em;
    max-width: 320px;
}
.tech_Box > textarea{
    border-radius: 5px;
    color: black;
    padding: .5em;
    border: none;
}
.tech_Box > p{
  padding: .5em;
}
.tech_Chip{
    background: #EBBA3E;
    border-radius: 25px;
    filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.5));
    padding: .25em 1em;
    margin: .5em;
    font-size: 11pt;
    flex: 1 0 10%;
}
.recently_Box{
display: flex;
justify-content: center;
}
.first_Box{
background: #F2AE30;
box-shadow: 0px 6px 16px -7px rgba(0, 0, 0, 0.25);
border-radius: 25px;
padding: .5em 1em;
display: flex;
flex-direction: column;
align-items: center;
margin: 1em;
}
.recently_chip{
    background: black;
    border-radius: 25px;
    filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.5));
    padding: .25em 1em;
    width: 6em;
    margin: 1em 0;
    font-size: 11pt;
    color: #F2AE30;
    text-align: center;
}
.recently_chip::placeholder{
  color: #F2AE30;
}
.first_Box > p{
    margin-bottom: .5em;
}
.first_Box > textarea {
    margin: unset;
    width: unset;
    background: #F29930;
    border-radius: 5px;
    color: black;
    padding: .5em;
    min-height: 5em;
}
.first_Box > textarea::placeholder{
    color: black;
}
.first_Box > textarea:focus{
    outline: #eff230;
}
.newTech > p{
  cursor:pointer;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
.addChip{
  width: 35px;
  cursor: pointer;
}
@media only screen   
and (min-device-width : 768px) {
}
@media (min-width:961px) {
.tech_Box{
    background: #F2AE30;
    box-shadow: 0px 6px 16px -7px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-self: center;
    justify-self: center;
    min-width: -webkit-fill-available;
    margin: 1em;
    padding: 1em;

}
.tech_Box > textarea{
    border-radius: 5px;
    color: black;
    padding: .5em;
    border: none;
}
.tech_Box > p{
  padding: .5em;
}
.tech_Chip{
    background: #EBBA3E;
    border-radius: 25px;
    filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.5));
    padding: .25em 1em;
    margin: .5em;
    font-size: 11pt;
    flex: 1 0 10%;
}   
}
</style>