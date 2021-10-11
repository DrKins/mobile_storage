<template>
  <div class="popup_Container">
      <div class="session_Container">
        <div class="close_tag">
            <img src="../assets/exit.svg" alt="closeTag" @click="onClickButton">
        </div>
        <div class="title_Container">
            <h1>session</h1>
            <div id="logoLine"></div>
            <p>Select project and press start.</p>
        </div>
        <div class="interaction_Container">
            <label for="category">Projects</label>
            <select name="Category" id="category" v-model="selectedProject">
                <option v-for="item,index in activeProjects" :key="index">{{item}}</option>
            </select>
        </div>
        <div class="btn_Container">
            <button @click="dutyPage()">start</button>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
            activeProjects:undefined,
            selectedProject:undefined,
        }
    },
    computed:{
        ...mapGetters(['GET_PROJECTS','GET_CURRENTUSER'])
    },
    methods:{
    extractData(){
        let x = this.GET_PROJECTS.filter( x => x.team.includes(this.GET_CURRENTUSER))
        this.activeProjects = x.map( e => e.name )
    },
        onClickButton () {
          this.$emit('clicked', 'exit')
        },
    dutyPage(){
        this.$router.push({ path: '/duty/'+this.selectedProject })
        }
    },
    mounted(){
    this.extractData()
    }
}
</script>

<style scoped>
.popup_Container{
    position: fixed;
    display: flex;
    justify-items: center;
    align-items: center;
    z-index: 4;
}
.session_Container{
    display:flex;
    align-self: center;
    flex-direction: column;
    background-color: black;
    border-radius: 30px;
    padding: 4em 4.5em;
    filter: drop-shadow(7px 12px 20px rgba(0, 0, 0, 0.41));
}
.close_tag{
    display: flex;
    align-self: center;
    margin-bottom: 2em;
}
.close_tag > img {
    cursor: pointer;
}

.title_Container{
    color:#F2AE30;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
}
.title_Container > p {
    padding: .5em 0;
    font-size: 10pt;
}
#logoLine{
  width: 200px;
  height: 1px;
  background: #F2AE30;
  margin: .5em 0;
}
.interaction_Container{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5em 0;
    color: #F2AE30;
}
.interaction_Container > label {
    margin: 0 6em .25em 0;
}
.interaction_Container > select {
    width: 180px;
    height: 45px;
    color: black;
    border: none;
    font-size: 12pt;
    background-color: #F2AE30;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;       /* Remove default arrow */
    background: url(../assets/dropdown.svg) 96% / 15% no-repeat #F2AE30;
    border-radius: 5px;
    padding-left: 1em;
    cursor: pointer;
}
.btn_Container{
  display: flex;
  flex-direction: column;
  padding: 3.5em 0 1em 0;
  align-items: center;
}
.btn_Container > button{
  background-color: #F2AE30;
  border-radius: 5px;
  height: 50px;
  width: 180px;
  color: black;
  font-size: 18pt;
  border: none;
  font-weight: 500;
  filter: drop-shadow(7px 12px 20px rgba(0, 0, 0, 0.41));
  cursor: pointer;
}
</style>