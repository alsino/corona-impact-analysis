<script>

// Unix timestamp
// http://jsfiddle.net/DerNalia/kfz2eb60/

  import * as d3 from "d3";
  import c3 from "c3";
  import '../../node_modules/c3/c3.min.css';

  import { onMount, beforeUpdate } from 'svelte';
  import { dataset } from '../store.js';


  const CWIDTH = 550;
  const CHEIGHT = 300;

  const COLORS = {
    "data1": '#00CBDB',
    "data2": "#F76906",
    "data3": "#FFBB00",
    "data4": "#57C494"
  }

  let chart2Data = {
    "s": ['data1', 300, 350, 300, 600, 200, 150, 340, 260, 200, 300],
    "e": ['data2', 100, 250, 400, 70, 90, 310, 240, 560, 300, 400],
    "I_combined": ['data3', 40, 30, 60, 120, 340, 170, 20, 20, 90, 70],
    "R_combined": ['data4', 30, 35, 230, 70, 80, 50, 130, 60, 70, 180],
  }

  let chart2DataNew = {
    "s": ['data1', 30, 35, 230, 70, 80, 50, 130, 60, 70, 180],
    "e": ['data2', 300, 350, 300, 600, 200, 150, 340, 260, 200, 300],
    "I_combined": ['data3', 380, 220, 110, 230, 30, 70, 320, 60, 120, 80],
    "R_combined": ['data4', 100, 250, 400, 70, 90, 310, 240, 560, 300, 400],
  }


  onMount(() => {

    // console.log($dataset);

    let chart2 = c3.generate({
      bindto: '#chart-line',
      size: {
        width: CWIDTH
      },
      data: {
        columns: [
          chart2Data["s"],
          chart2Data["e"],
          chart2Data["I_combined"],
          chart2Data["R_combined"],
        ],
        type: 'spline',
        names: {
          data1: 'S',
          data2: 'E',
          data3: "I_combined",
          data4: "R_combined"
        },
        colors: COLORS
      },
      axis: {
        x: {
          type: "category",
          categories: ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        }
      },
      // legend: {
      //   position: 'inset'
      // }
    });

    

  });


</script>


<div id="chart-line" class="cChart"></div>