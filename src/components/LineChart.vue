<template>
  <Line
      :chart-options="chartOptions"
      :chart-data="chartData"

  />
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS,  Title,  Tooltip,  Legend,  LineElement,  LinearScale,  PointElement,  CategoryScale } from 'chart.js'

ChartJS.register(Title,    Tooltip,    Legend,    LineElement,    LinearScale,    PointElement,    CategoryScale)
export default {
  name: 'LineChart',
  components: { Line },
  props: {
    // width: {
    //   type: Number,
    //   default:  600
    // },
    // height: {
    //   type: Number,
    //   default:  600
    // },
    chartOptions: {
      type: Object,
      default: () => {}
    },
    chartData: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    // console.log(ChartJS.instances)
  }
}
</script>