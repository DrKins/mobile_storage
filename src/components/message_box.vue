<template>
      <div class="messages_Container">
          <div class="message_Box" @click="changestate()">
              <h4>{{item.target}}</h4>
              <img src="../assets/notification.svg" alt="notificationicon" v-if="isRead===1">
              <img src="../assets/read.svg" alt="readicon" v-else>
          </div>
          <div class="message_Content" v-bind:class="{ active: isActive }">
             <p>{{item.text}}</p> 
             <div class="bottom_edit">
                 <img src="../assets/delete.svg" alt="deleteicon" @click="deleteMessage()">
                 <div class="line" v-if="isRead === 1"></div>
                 <img src="../assets/ok.svg" alt="okicon" v-if="isRead === 1" @click="readMessage()">
             </div>
          </div>
      </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
props:['item','close','position'],
data(){
    return{
        isActive : false,
        isRead : this.item.new
    }
},
methods:{
    ...mapMutations(['READ_MESSAGE']),
    changestate(){
        this.isActive = !this.isActive;
    },
    deleteMessage(){
        this.$emit('delete',this.item)
    },
    readMessage(){
        this.READ_MESSAGE({
            position: this.position,
            item: this.item,
        })
        this.isRead = 0;
    },
},
watch:{
    isActive(){
        if(this.close===true) this.isActive = false
    }
}
}
</script>

<style scoped>
.messages_Container{
    display: flex;
    flex-direction: column;
    margin: 1em 0;
}
.message_Box{
    background: #F2B030;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    padding: .75em;
    z-index: 2;
    cursor: pointer;
}
.message_Box > h4{
    padding-left: .5em;
}
.message_Content{
    background: #F2B030;
    border-radius: 5px;
    margin: -.25em 0;
    z-index: 1;
    text-align: left;
    height: 0;
    opacity: 0;
    display: none;
}
.message_Content > p{
    width: 250px;
    padding: .75em;
}
.bottom_edit{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: .5em;
}
.bottom_edit > img{
    cursor: pointer;
}
.line{
  width: 150px;
  height: 1px;
  background: black;
  margin: .5em 2em 0 1em;
}
.active{
display: flex;
flex-direction: column;
justify-content: space-between;
 animation: slide 1s ease 50ms forwards;
}
@keyframes slide {
  0% {height: 0;}
  30% { opacity: 0;}
  100% {height: 150px; opacity: 1;}
}
</style>