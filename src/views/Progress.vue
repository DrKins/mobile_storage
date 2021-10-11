<template>
  <div class="progress_Container">
      <myheader/>
      <div class="Projects_Box">
          <div class="leftSide_Box">
          <img src="../assets/progress.svg" alt="progresssicon">
          <h4>progress</h4>
          </div>
          <div id="logoLine"></div>
          <div class="rightSide_Box">
              <p>Section dedicated to your progress.Focus is on your self-education and improvement.</p>
          </div>
      </div>
      <div class="Project_title">
          <h4>userTechnologies</h4>
      </div>
      <div class="userTech_Box">
          <div class="userTech_Chip" v-for="item,index in userTech" :key="index"><b>{{item.name}}</b></div>
      </div>
      <div class="Project_title">
          <h4>recently learned</h4>
      </div>
      <div class="recently_Box">
          <div class="first_Box" v-for="item,index in userTech.slice(userTech.length-2,userTech.length)" :key="index">
              <div class="recently_chip">{{item.name}}</div>
              <p>{{item.description}}</p>
          </div>
      </div>
      <div class="Project_title">
          <h4>week commitment</h4>
      </div>
      <div class="chart_container">
          <chart/>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import myheader from '../components/myheader.vue'
import chart from '../components/week_chart.vue'
export default {
  components: { myheader,chart },
data(){
    return{
        userTech:[],
    }
},
computed:{
    ...mapGetters(['GET_USERS','GET_CURRENTUSER'])
},
methods:{
    extractData(){
            let x = this.GET_USERS.findIndex( x => x.username === this.GET_CURRENTUSER )
            this.userTech = this.GET_USERS[x].tech;
    }
},
mounted(){
    this.extractData()
}
}
</script>

<style scoped>
.Projects_Box{
    display: flex;
    align-items:center;
    margin: 1em 1em;
    padding: 2em;
    background: #F2B030;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
}
#logoLine{
  width: 1px;
  height: 100px;
  background: black;
  margin: .5em 2em 0 1em;
}
.rightSide_Box{
    text-align: left;
    width: 125px;
}
.Project_title{
  display: flex;
  justify-content: flex-start;
  margin: 0 1em;
}
.userTech_Box{
    background: #F2AE30;
    box-shadow: 0px 6px 16px -7px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    display: flex;
    flex-wrap: wrap;
    margin: 1em;
    padding: 1em;
    max-width: 320px;
}
.userTech_Chip{
    background: #EBBA3E;
    border-radius: 25px;
    filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.5));
    padding: .25em 1em;
    margin: .5em;
    font-size: 11pt;
    flex: 1 0 10%;
    user-select: none;
}
.recently_Box{
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-template-rows: 1fr;
grid-column-gap: .5em;
grid-row-gap: 0px;
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
    width: fit-content;
    margin: 1em 0;
    font-size: 11pt;
    color: #F2AE30;
    user-select: none;
}
.first_Box > p{
    margin-bottom: .5em;
    user-select: none;
}
@media (min-width:961px) {
.rightSide_Box{
    text-align: left;
    width: auto
}  
}
</style>