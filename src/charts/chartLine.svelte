<script>

  export let id;

	import * as d3 from "d3";
	import c3 from "c3";
  import '../../node_modules/c3/c3.min.css';

  import { onMount, beforeUpdate } from 'svelte';
  import { dataLoaded } from '../store.js';
  import { dataset } from '../store.js';
  import { COLORS } from '../store.js';
  import { CWIDTH } from '../store.js';
  import { CHEIGHT } from '../store.js';

  let chart;

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


function renderChart(timeOut){

    setTimeout(() => {
      let timeLine =  $dataset["time"];
      let dead = $dataset["Dead"];

      console.log(timeLine)


      chart = c3.generate({
          bindto: `#${id}`,
          size: {
            width: CWIDTH,
            height: CHEIGHT,
        },
          data: {
            x: 'time',
            columns: [timeLine, dead],
            type: 'spline'
          },
          axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: "%b"
                }
            } 
        }
      });

      // let chart2 = c3.generate({
      //   bindto: '#chart-2',
      //   size: {
      //     width: CWIDTH
      //   },
      //   data: {
      //     columns: [
      //       chart2Data["s"],
      //       chart2Data["e"],
      //       chart2Data["I_combined"],
      //       chart2Data["R_combined"],
      //     ],
      //     type: 'spline',
      //     names: {
      //       data1: 'S',
      //       data2: 'E',
      //       data3: "I_combined",
      //       data4: "R_combined"
      //     },
      //     colors: COLORS
      //   },
      //   axis: {
      //     x: {
      //       type: "category",
      //       categories: ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      //     }
      //   },
      //   // legend: {
      //   //   position: 'inset'
      //   // }
      // });


    }, timeOut);

};

onMount(() => {
  renderChart(5000);
}); // onMount end



beforeUpdate(() => {
  renderChart(0);
}); // beforeUpdate end

</script>




<style>

</style>




 <div id={id} class="cChart"></div>




 
