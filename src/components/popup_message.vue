<template>
  <div class="popup_Container">
      <div class="session_Container">
        <div class="close_tag">
            <img src="../assets/exit.svg" alt="closeTag" @click="onClickButton">
        </div>
        <div class="title_Container">
            <h1>new message</h1>
            <div id="logoLine"></div>
            <p>Select target and connect with people.</p>
        </div>
        <div class="interaction_Container">
            <label for="category">Target</label>
            <select name="Category" id="category" v-model="selectedUser">
                <option v-for="item,index in users" :key="index">{{item}}</option>
            </select>
            <label for="description">Message</label>
            <textarea name="description" id="description" cols="30" rows="5" placeholder="Describe your work here" v-model="message"></textarea>
        </div>
        <div class="btn_Container">
            <button @click="sendMessage()">save</button>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data(){
        return{
            selectedUser: '',
            users:undefined,
            message:undefined,
        }
    },
    computed:{
        ...mapGetters(['GET_USERS','GET_CURRENTUSER'])
    },
    methods:{
        ...mapMutations(['SEND_MESSAGE']),
        extractData(){
            let x = this.GET_USERS.filter(x => x.username !== this.GET_CURRENTUSER)
            this.users = x.map( x => x.username)
        },
        onClickButton () {
          this.$emit('clicked', 'exit')
        },
        sendMessage(){
        this.SEND_MESSAGE({
            target: this.GET_CURRENTUSER,
            to: this.selectedUser,
            text:   this.message,
            new: 1,
        })
        this.onClickButton()
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
    margin: 2em 0;
    color: #F2AE30;
}
.interaction_Container > label {
    margin: .5em 6em .5em 0;
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
    padding: .5em;
    cursor: pointer;
    width: 220px;
    background-size: 24px;
}
.interaction_Container > textarea {
    background: #F29930;
    border-radius: 5px;
    color: black;
    padding: .5em;
    font-size: 12pt;
    width: 205px;
}
.interaction_Container > textarea::placeholder{
    color: black;
}
.interaction_Container > textarea:focus{
    outline: #eff230;
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