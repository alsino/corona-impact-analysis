<script>

	import * as d3 from "d3";
	import c3 from "c3";
  import '../../node_modules/c3/c3.min.css';

  import { onMount, beforeUpdate } from 'svelte';
  import { dataLoaded } from '../store.js';
  import { dataset } from '../store.js';

  let chart;

  const CWIDTH = 550;
  const CHEIGHT = 300;

  const COLORS = {
    "data1": '#00CBDB',
    "data2": "#F76906",
    "data3": "#FFBB00",
    "data4": "#57C494"
  }


function renderChart(timeOut){

    setTimeout(() => {
      let timeLine =  $dataset["time"];
      let reduction = $dataset["Reduction in new infections through policy"];

      let chart = c3.generate({
        bindto: '#chart-steps',
        size: {
          width: CWIDTH,
          height: CHEIGHT,
        },
        tooltip: {
          grouped: true
        },
        data: {
            x: 'time',
            columns: [timeLine,reduction],
            types: {
                data1: 'step'
            },
            names: {
              data1: 'Reduction in new infections through policy'
            },
            colors: COLORS
        },
        axis : {
          x : {
              type : 'timeseries',
              tick: {
                format: "%b" // format string is also available for timeseries data
              }
          }
      },
        grid:{
          focus:{
            show:false
        }
        } 
        // legend: {
        //   position: 'inset'
        // }
      });


    }, timeOut);

};


onMount(() => {
  renderChart(2000);
}); // onMount end



beforeUpdate(() => {
    renderChart(0);
}); // beforeUpdate end

</script>




<style>

</style>




 <div id="chart-steps" class="cChart"></div>




 
