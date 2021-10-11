<template>
  <div class="project_Container">
    <myheader/>
      <div class="info_Rectangle">
        <img :src="projectLogo" alt="DefaultIcon" style="max-width:150px">
        <div class="info_Rectangle_text">
          <h2>{{projectName}}</h2>
          <h4>{{projectType}}</h4>
          <div class="info_Rectangle_text_date">
            <p>{{projectDate}}</p>
            <img src="../assets/clock.svg" alt="clockIcon">
          </div>
        </div>  
      </div>
    <h4 class="Project_title">development team</h4>
    <div class="dev_Team">
        <div class="developer" v-for="item,index in projectDevelopers" :key="index">
            <img src="../assets/user.svg" alt="userlogo">
            <p>{{item}}</p>
        </div>
    </div>
    <h4 class="Project_title">progress tree</h4>
    <div class="dev_Tree" v-for="item,index in projectTree" :key="index">
      <div v-bind:class="{ Tree_first: even(index), Tree_second : !even(index) }">
        <div class="circle" v-bind:class="{ frontend : type(item.type), backend : !type(item.type)}"></div>
        <div id="logoLine"></div>
        <box :item="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import box from '../components/project_tree_box.vue'
import Myheader from '../components/myheader.vue'
import { mapGetters } from 'vuex'
export default {
components:{
    Myheader,
    box
},
data(){
    return{
        projectName: undefined,
        projectType: undefined,
        projectLogo: undefined,
        isActive: false,
        projectDevelopers: undefined,
        projectDate: undefined,
        projectTree: undefined,
    }
},
computed:{
...mapGetters(['GET_PROJECTS','GET_CURRENTUSER'])
},
methods:{
  changestate(){
    this.isActive = !this.isActive
  },
  even(number){
    if(number % 2 == 0)return true
    else return false
  },
  type(end){
    if(end === 'Frontend') return true
    else return false
  },
  extractData(){
    let x  = this.GET_PROJECTS.filter( e => e.team.includes(this.GET_CURRENTUSER))
    let index = this.$router.history.current.path.split('/')
    this.projectName = x[index[2]].name;
    this.projectLogo = x[index[2]].logo;
    this.projectType = x[index[2]].type;
    this.projectDevelopers = x[index[2]].team;
    this.projectDate = x[index[2]].date
    this.projectTree = x[index[2]].tree
  }
},
mounted(){
 this.extractData()
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
.info_Rectangle_text{
  text-align: left;
}
.info_Rectangle_text_date{
  display: flex;
  justify-content: space-between;
}
.Project_title{
  display: flex;
  justify-content: flex-start;
  margin: 0 1em;
}
.dev_Team{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-column-gap: .5em;
  grid-row-gap: .5em;
  margin: .5em .5em;
}
.developer{
    display: flex;
    align-items: center;
    padding: 1em 1.25em;
    background: #EDB03E;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    flex: 1 0 30%;
}
.dev_Tree{
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
.Tree_first{
  display: flex;
  justify-items: center;
  align-items: center;
  padding: 1em;
}
.Tree_second{
  display: flex;
  flex-direction: row-reverse;
  justify-items: center;
  align-items: center;
  padding: 1em;
}
.circle {
  display: inline-block;
  border-radius: 50%;
  min-width: 20px;
  min-height: 20px;
  padding: 5px;
  color: white;
  text-align: center;
  line-height: 1;
  box-sizing: content-box;
  white-space: nowrap;
}
.frontend{
  background: #B8371B;
}
.backend{
  background: #EDB03E;
}
.circle:before {
  content: "";
  display: inline-block;
  vertical-align: middle;
  padding-top: 100%;
  height: 0;
}
#logoLine{
  width: 50px;
  height: 1px;
  background: #B8371B;
  margin: .5em 0;
}
</style>