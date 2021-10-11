<template>
          <div class="developer" :class="{ selected : isSelected }" @click="changeState()">
            <img src="../assets/user.svg" alt="userlogo">
            <p>{{item}}</p>
        </div>
</template>

<script>
export default {
props:['item'],
data(){return{
    isSelected: false
}},
methods:{
    changeState(){
        this.isSelected = !this.isSelected;
        this.select();
    },
    select(){
        this.$emit('selected', this.item)
    }
}
}
</script>

<style scoped>
.developer{
    display: flex;
    align-items: center;
    padding: 1em 1.25em;
    background: #EDB03E;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    flex: 1 0 20%;
    cursor: pointer;
}
.selected{
    background: #f1d759;
}
</style>