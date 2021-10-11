<template>
  <div class="tree_box">
        <div class="Tree_box">
          <div class="user_info">
            <div class="top_level">
            <img src="../assets/user.svg" alt="user">
            <p>{{item.user}}</p>
            </div>
            <div class="bot_level">
              <h4>{{item.type}}</h4>
              <p>{{item.date}}</p>
            </div>
          </div>
          <div class="img">
          <img src="../assets/dropdown.svg" alt="dropdown" @click="changestate()">
          </div>
          <div class="dropdown_box" v-bind:class="{ active: isActive }">
            <p>{{item.text}}</p>
          </div>
        </div>
  </div>
</template>

<script>
export default {
props:['item'],
data(){
    return{
        isActive : false
    }
},
methods:{
    changestate(){
        this.isActive = !this.isActive;
    }
}
}
</script>

<style scoped>
.Tree_box{
  background: #F2AE30;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}
.Tree_box > img{
  margin:0 1em 0 0;
}
.Tree_box > .img{
    cursor: pointer;
    background: #F23C30;
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.user_info{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: .5em .5em 0 .5em;
  width: 200px;
}
.top_level{
  display: flex;
  justify-items: center;
  align-items: center;
}
.top_level > img{
  margin: 0 0 .5em 0;
}
.bot_level{
  margin: .5em 0;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  text-align: left;
}
.bot_level > h4{
  margin-right: .5em;
  display: flex;
  align-self: flex-start;
}
.dropdown_box{
background: #EBBA3E;
border-radius: 0 0 5px 5px;
padding: .5em 1em;
width: 218px;
height: 0px;
opacity: 0;
text-align: left;
display: none;
}
.active{
display: unset;
 animation: slide 1s ease 50ms forwards;
}
@keyframes slide {
  0% {height: 0;}
  30% { opacity: 0;}
  100% {height: 150px; opacity: 1;}
}
</style>