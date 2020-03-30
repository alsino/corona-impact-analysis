<script>

	import * as d3 from "d3";
	import c3 from "c3";
  import '../../node_modules/c3/c3.min.css';

  import { onMount, beforeUpdate } from 'svelte';
  import { dataLoaded } from '../store.js';
  import { dataset } from '../store.js';

  const CWIDTH = 550;
  const CHEIGHT = 300;

  const COLORS = {
    "data1": '#00CBDB',
    "data2": "#F76906",
    "data3": "#FFBB00",
    "data4": "#57C494"
  }


onMount(() => {

    setTimeout(() => {

      console.log($dataset)
      
      let timeLine =  $dataset["time"];
      let reduction = $dataset["Reduction in new infections through policy"];

      let columns = [timeLine,reduction];
      console.log(columns);


    let chart1 = c3.generate({
      bindto: '#chart-steps',
      size: {
        width: CWIDTH,
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





    }, 3000);
    


    


});

</script>




<style>

</style>




 <div id="chart-steps" class="cChart"></div>




 
