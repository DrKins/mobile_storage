<template>
  <div class="stats_Container">
      <myheader/>
      <div class="Projects_Box">
          <div class="leftSide_Box">
          <img src="../assets/stats.svg" alt="statssicon">
          <h4>statistics</h4>
          </div>
          <div id="logoLine"></div>
          <div class="rightSide_Box">
              <p>Welcome to statistics page. This section is only made for your personal progress and fun stats.</p>
          </div>
      </div>
      <div class="funFact_Box">
          <div class="redBg">
              <div>
              <img src="../assets/hearth.svg" alt="hearth">
              <p>You are working on {{this.stats[0].activeProjects}} projects.</p>
              </div>
              <div>
              <img src="../assets/up.svg" alt="up">
              <p>{{this.stats[0].dayCommits + this.stats[0].nightCommits}} commits already.</p>
              </div>
              <div>
              <img src="../assets/plus.svg" alt="plus">
              <p>{{this.stats[0].newTech}} new techs.</p>
              </div>
          </div>
      </div>
      <chart class="chart_container"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import chart from '../components/chart.vue'
import myheader from '../components/myheader.vue'
export default {
    components: { myheader, chart },
    computed:{
        ...mapGetters(['GET_USERS','GET_CURRENTUSER'])
    },
    methods:{
        ExtractData(){
            let x = this.GET_USERS.findIndex( x => x.username === this.GET_CURRENTUSER )
            this.stats = this.GET_USERS[x].stats;
        }
    },
    data(){
        return{
            stats: 'none'
        }
    },
    mounted(){
        this.ExtractData()
    }
}
</script>

<style scoped>
.Projects_Box{
    display: flex;
    align-items:center;
    margin: 1em 1em 0 1em;
    padding: 2em;
    border-radius: 5px;
}
#logoLine{
  width: 1px;
  height: 100px;
  background: black;
  margin: .5em 2em 0 1em;
  opacity: 0;
}
.rightSide_Box{
    text-align: left;
}
.rightSide_Box > p{
    width: 170px;
}
.funFact_Box{
    height: 200px;
background: #F2C730;
box-shadow: 0px 4px 20px 5px rgba(0, 0, 0, 0.25);
border-radius: 5px;
margin: 1em;    
}
.redBg{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background: #F23C30;
    width: 25px;
    height: 200px;
    margin-left: 1em;
}
.redBg > div > img{
    height: 18px;
    padding-left: 4px
}
.redBg > div{
    display: flex;
    align-items: center;
    
}
.redBg > div > p{
    margin-left: 1em;
    min-width: 250px;
    text-align: left;
}
.chart_container{
    display: flex;
    justify-content: center;
    height: 200px;
}
@media (min-width:961px) {
.rightSide_Box{
    text-align: center;
}
.rightSide_Box > p{
    width: auto;
}    
}
</style>