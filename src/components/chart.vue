<script>
import { Pie } from 'vue-chartjs'
import { mapGetters } from 'vuex'

export default {
  extends: Pie,
  props: ['chartdata', 'options'],
  data(){
    return{
      data: []
    }
  },
  computed:{
    ...mapGetters(['GET_USERS','GET_CURRENTUSER'])
  },
  methods:{
    extractData(){
     let x = this.GET_USERS[this.GET_USERS.findIndex(x => x.username === this.GET_CURRENTUSER)].stats
     this.data.push(x[0].nightCommits)
     this.data.push(x[0].dayCommits)
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  },
mounted () {
  this.extractData()
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['Night','Day'],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: ['#B8371B','#F23C30'],
          borderColor:'transparent',
          data: this.data,
        }
      ]
    },
    {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
      position: 'bottom',
       labels: {
         fontColor: 'black',
         usePointStyle: true,
         fontSize: 14,
         fontFamily:'Roboto'
      }
    }
   })
  }
}
</script>
<style scoped>

</style>