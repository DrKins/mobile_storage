<script>
import { Bar } from 'vue-chartjs'
import { mapGetters } from 'vuex'

export default {
  extends: Bar,
  props: ['chartdata', 'options'],
  data(){
    return{
      data:[]
    }
  },
  computed:{
    ...mapGetters(['GET_USERS','GET_CURRENTUSER'])
  },
  methods:{
    extractData(){
      let x = this.GET_USERS[this.GET_USERS.findIndex(x => x.username === this.GET_CURRENTUSER)].stats
      this.data.push(x[0].mon)
      this.data.push(x[0].tue)
      this.data.push(x[0].wed)
      this.data.push(x[0].thu)
      this.data.push(x[0].fri)
      this.data.push(x[0].sat)
      this.data.push(x[0].sun)
    }
  },  
  mounted () {
    this.renderChart(this.chartdata, this.options)
  },
mounted () {
  this.extractData()
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: ['#B8371B','#F23C30','#B8371B','#F23C30','#B8371B','#F23C30','#B8371B'],
          borderColor:'red',
          data: this.data
        }
      ]
    },
    {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
      display: false,
      position: 'bottom',
       labels: {
         fontColor: 'black',
         usePointStyle: true,
         fontSize: 14,
         fontFamily:'Roboto'
      }
    },
    scales: {
            xAxes: [{
                ticks:{
                  fontColor:"black",
                },
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }],
            yAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                },
                ticks:{
                  fontColor:"black",
                  precision:0
                }   
            }]
        }
   })
  }
}
</script>
<style scoped>

</style>