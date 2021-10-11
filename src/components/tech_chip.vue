<template>
          <div class="developer" :class="{ selected : isSelected }" @click="changeState()">
            <p>{{item.name}}</p>
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
    background: #EBBA3E;
    border-radius: 25px;
    filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.5));
    padding: .25em 1em;
    margin: .5em;
    font-size: 11pt;
    flex: 1 0 10%;
    cursor: pointer;
}
.selected{
    background: #f1d759;
}
</style>