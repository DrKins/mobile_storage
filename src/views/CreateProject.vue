<template>
  <div class="createProject_Container">
    <myheader/>
    <div class="logo_container">
        <div class="left_box">
            <h4>new project</h4>
            <div id="logoLine"></div>
        </div>
        <img src="../assets/projects.svg" alt="fileicon">
        <div id="logoLine" class="right_box"></div>
    </div> 
    <div class="interaction_Container">
        <input class="name" type="text" placeholder="Name" v-model="name">
            <select v-model="devtype">
            <option disabled value="">Please select dev type</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Fullstack</option>
            </select>
    <h4 class="Project_title">development team</h4>        
    <div class="dev_Team">
        <div v-for="item,index in developers" :key="index">
        <developer_chip :item=item @selected="addUser"/>
        </div>
    </div>
    <h4 class="Project_title">technology tree</h4>    
    <div class="tech_Box">
        <tech_chip v-for="item,index in tech" :key="index" :item=item @selected="addTech"/>
    </div>
    </div>
    <div class="logo_preview">
        <div class="preview_rectangle">
            <img :src="this.logoLink" alt="logo" v-if="this.logoLink != '' ">
            <img src="../assets/js.svg" alt="logo" v-else>
        </div>
        <input class="name" type="text" placeholder="Paste link" v-model="logoLink">
    </div>
    <div class="btn_Container">
        <button @click="AddNewProject">save</button>
    </div>
  </div>
</template>

<script>
import myheader from '../components/myheader.vue'
import developer_chip from '../components/developer_chip.vue'
import tech_chip from '../components/tech_chip.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
components:{
    myheader,
    developer_chip,
    tech_chip
},
data(){
    return{
        name: "",
        devtype: "",
        developers: undefined,
        selectedDevelopers:[],
        selectedTech:[],
        logoLink:'',
        logoUpdate: false,
        tech:undefined,
    }
},
computed:{
    ...mapGetters(['GET_USERS'])
},
methods:{
    ...mapMutations(['CREATE_PROJECT','UPDATE_PROJECT']),
    extractUsers(){
        this.developers = this.GET_USERS.map(x => x.username)
        let y = null
        this.GET_USERS.forEach( e => {
        y = e.tech.map( e => e )
        });
        this.tech = y;
    },
    addUser(response){
        if(this.selectedDevelopers.includes(response)){
            let x  = this.selectedDevelopers.findIndex( x => x === response)
            this.selectedDevelopers.splice(x,1)
        } else this.selectedDevelopers.push(response)
    },
    addTech(response){
        if(this.selectedTech.includes(response.name)){
            let x  = this.selectedTech.findIndex( x => x === response.name)
            this.selectedTech.splice(x,1)
        } else this.selectedTech.push(response.name)   
    },
    AddNewProject(){
        if(this.name && this.devtype && this.selectedDevelopers && this.selectedTech && this.logoLink){
            this.CREATE_PROJECT({
                name: this.name,
                type: this.devtype,
                team: this.selectedDevelopers,
                tech: this.selectedTech,
                logo: this.logoLink,
                date: new Date().toLocaleDateString(),
                tree: [],
            }) 
            this.$router.push('/home')
        }
        else console.error("Sorry chief. You need to fill all data.")
    }
},
mounted(){
    this.extractUsers()
}
}
</script>

<style scoped>
.logo_container{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: .5em 1em;
}
.logo_container > img{
    height: 55px;
}
#logoLine{
  width: 100px;
  height: 1px;
  background: black;
  margin: .5em 0;
}
.right_box{
    opacity: 0;
}
.interaction_Container{
    display: flex;
    flex-direction: column;
    margin: 1em;
}
.interaction_Container > input {
    height: 45px;
    color: black;
    border: none;
    font-size: 12pt;
    background-color: #F2AE30;
    border-radius: 5px;
    padding-left: 1em;
    margin-bottom: .5em;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
}
.interaction_Container > input::placeholder{
    color:black;
}
.interaction_Container > select {
    height: 45px;
    color: black;
    border: none;
    font-size: 12pt;
    background-color: #F2AE30;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;       /* Remove default arrow */
    background: url(../assets/dropdown.svg) 96% / 15% no-repeat #F2AE30;
    background-size: 24px;
    border-radius: 5px;
    padding-left: 1em;
    cursor: pointer;
    margin-bottom: .5em;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
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
.dev_Team > div{
    cursor: pointer;
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
.tech_Chip{
    background: #EBBA3E;
    border-radius: 25px;
    filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.5));
    padding: .25em 1em;
    margin: .5em;
    font-size: 11pt;
    flex: 1 0 10%;
}
.logo_preview{
    display: flex;
    flex-direction: column;
}
.logo_preview > input{
    height: 45px;
    color: black;
    border: none;
    font-size: 12pt;
    background-color: #F2AE30;
    border-radius: 5px;
    padding-left: 1em;
    margin: 1em;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);   
}
.logo_preview > input::placeholder{
    color:black;
}
.preview_rectangle{
    background: #F2B030;
}
.preview_rectangle > img{
    height: 100px;
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
</style>