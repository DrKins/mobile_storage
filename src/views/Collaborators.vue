<template>
  <div class="colab_Container">
      <popup_message class="popup_Component" v-if="popup_Controller" @clicked="onClickChild"/>
      <myheader/>
      <div class="Projects_Box">
          <div class="leftSide_Box">
          <img src="../assets/colab.svg" alt="colabsicon">
          <h4>collaborations</h4>
          </div>
          <div id="logoLine"></div>
          <div class="rightSide_Box">
              <p>Section focused on messaging between collaborators.</p>
          </div>
      </div>
      <div class="Project_title"><h4>all messages</h4></div>
      <div class="message" v-for="item,index in inbox" :key="index">
        <message :item="item" :position="position" @delete="deleteMessage" :close="closeALL()"/>
        </div>
      <div class="btn_Container">
          <button @click="popup_Controller = true">+</button>
      </div>
  </div>
</template>

<script>
import myheader from '../components/myheader.vue'
import message from '../components/message_box.vue'
import Popup_message from '../components/popup_message.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: { myheader,message, Popup_message },
data(){
  return{
    inbox: undefined,
    popup_Controller: false,
    position: undefined,
  }
},
computed:{
...mapGetters(['GET_USERS','GET_CURRENTUSER'])
},
methods:{
  ...mapMutations(['DELETE_MESSAGE','READ_MESSAGE']),
  deleteMessage(item){
    let x = this.GET_USERS.findIndex( x => x.username === this.GET_CURRENTUSER )
    this.DELETE_MESSAGE({
      position: x,
      item})
  },
    onClickChild (value) {
      this.popup_Controller = false;
    },
    closeALL(){
      if(this.popup_Controller === true) return true;
    },
    extractData(){
        this.position = this.GET_USERS.findIndex( x => x.username === this.GET_CURRENTUSER )
        this.inbox  = this.GET_USERS[this.position].inbox.sort((a,b) => (a.new > b.new) ? -1 : ((b.new > a.new) ? 1 : 0))
    }
},
mounted(){
  this.extractData()
}
}
</script>

<style scope>
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
.Project_title{
  display: flex;
  justify-content: flex-start;
  margin: 0 1em;
}
.message{
  margin: 0 .5em;
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
.popup_Component{
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}
@media only screen   
and (min-device-width : 768px) {
}

@media (min-width:961px) {
.rightSide_Box{
    text-align: center;
    width: auto;
  }
}  
</style>