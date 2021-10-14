<template>
  <div class="popup_Container">
      <div class="session_Container">
        <div class="close_tag">
            <img src="../assets/exit.svg" alt="closeTag" @click="onClickButton">
        </div>
        <div class="title_Container">
            <h1>session</h1>
            <div id="logoLine"></div>
            <p>Finalizing your session.</p>
        </div>
        <div class="interaction_Container">
            <label for="description">Develompent type</label>
            <select v-model="devtype">
            <option>Frontend</option>
            <option>Backend</option>
            <option>Fullstack</option>
            </select>
            <label for="description">Description</label>
            <textarea name="description" id="description" cols="30" rows="5" placeholder="Describe your work here" v-model="text"></textarea>
        </div>
        <div class="btn_Container">
            <button @click="saveCommit()">save</button>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    props:['name'],
    data(){
        return{
            devtype:undefined,
            newTech:false,
            text: undefined,
            dayTime: 0,
            nightTime: 0,
            mon: 0,
            tue: 0,
            thu: 0,
            wed: 0,
            fri: 0,
            sat: 0,
            sun: 0,
        }
    },
    computed:{
        ...mapGetters(['GET_PROJECTS','GET_CURRENTUSER'])
    },
    methods:{
        ...mapMutations(['INSERT_COMMIT','UPDATE_LASTACTIVITY']),
        onClickButton () {
          this.$emit('clicked', 'exit')
        },
        saveCommit(){

        // getting time for charts - day and hour
        let hourchart = new Date().toLocaleString('hr-BA',{hour:'numeric'})
        if(hourchart >= 6 && hourchart <= 18) this.dayTime += 1
        else this.nightTime += 1

        //getting day of week chart
        switch (new Date().getDay()) {
            case 0:
                this.sun+=1
                break;
          case 1:
                this.mon+=1
                break;
            case 2:
                this.tue+=1
                break;
          case 3:
                this.wed+=1
                break;
            case 4:
                this.thu+=1
                break;
          case 5:
                this.fri+=1
                break;
            case 6:
                this.sat+=1
                break;
            default:
                break;
        }
        if(this.text !== undefined && this.devtype !== undefined){
        let x = this.GET_PROJECTS.findIndex(x => x.name === this.name)
        this.INSERT_COMMIT({ position: x,
          user: this.GET_CURRENTUSER,
          type: this.devtype,
          date: new Date().toLocaleString('hr-BA',{year:'numeric',month:'numeric',day:'numeric'}),
          day: this.dayTime,
          night: this.nightTime,
          mon: this.mon,
          tue: this.tue,
          thu: this.thu,
          wed: this.wed,
          fri: this.fri,
          sat: this.sat,
          sun: this.sun,
          text: this.text,
          projects: 1,
        })
        this.UPDATE_LASTACTIVITY({
            user: this.GET_CURRENTUSER,
            name: this.name,
            date: new Date().toLocaleString('hr-BA',{year:'numeric',month:'numeric',day:'numeric'}),
            logo: this.GET_PROJECTS[x].logo
        })
        this.$router.push({ path: '/home' })
        }else console.error("input data chief")
    }
    },
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
    padding: 3.5em 3.5em;
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
.interaction_Container > textarea {
    background: #F29930;
    border-radius: 5px;
    color: black;
    padding: .5em;
}
.interaction_Container > textarea::placeholder{
    color: black;
}
.interaction_Container > textarea:focus{
    outline: #eff230;
}
.interaction_Container > select {
    height: 45px;
    min-width: 230px;
    width: auto;
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
    margin-bottom: 1em;
}
.btn_Container{
  display: flex;
  flex-direction: column;
  padding: 1.5em 0 1em 0;
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