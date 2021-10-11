<template>
  <div class="projects_Container">
      <myheader/>
      <div class="Projects_Box">
          <div class="leftSide_Box">
          <img src="../assets/projects.svg" alt="projectsicon">
          <h4>projects</h4>
          </div>
          <div id="logoLine"></div>
          <div class="rightSide_Box">
              <p>If you want to add new project, click on big plus button on bottom of this page.</p>
          </div>
      </div>
      <div class="Projects_Slots" v-for="item,index in projects" :key="index" @click="goToProject1(index)">
          <div class="project_Rectangle">{{item}}</div>
      </div>
      <div class="btn_Container">
          <button @click="goToCreate()">+</button>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import myheader from '../components/myheader.vue'
export default {
    data(){
        return{
            projects:undefined
        }
    },
    computed:{
        ...mapGetters(['GET_USERS','GET_CURRENTUSER','GET_PROJECTS'])
    },
    methods:{
        goToProject1(index){
        this.$router.push({path:`/projects/${index}`})
        },
        goToCreate(){
        this.$router.push({path:'/createproject'})
        },
        ExtractData(){
            let x = this.GET_PROJECTS.map(e => (e.team.includes(this.GET_CURRENTUSER))? e.name: undefined)
            this.projects = x.filter(e => e !== undefined)
        }
    },
  components: { myheader },
  mounted(){
    this.ExtractData()
  }
}
</script>

<style scoped>
.Projects_Box{
    display: flex;
    align-items:center;
    margin: 1em .5em;
    padding: 1em;
    background: #F2B030;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
}
#logoLine{
  width: 1px;
  height: 100px;
  background: black;
  margin: .5em 1em;
}
.rightSide_Box{
    text-align: left;
    width: 100px;
}
.project_Rectangle{
    cursor: pointer;
    margin: 1em;
    padding: 1em;
    background: #EDB03E;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
}
.btn_Container{
  display: flex;
  flex-direction: column;
  padding: 1em 0 1em 0;
  align-items: center;
}
.btn_Container > button{
  background-color: black;
  border-radius: 75px;
  height: 75px;
  width: 75px;
  color: #F2AE30;
  font-size: 32pt;
  border: none;
  filter: drop-shadow(7px 12px 20px rgba(0, 0, 0, 0.41));
  cursor: pointer;
}
@media (min-width:961px) {
.rightSide_Box{
    text-align: center;
    width: auto;
}  
}
</style>