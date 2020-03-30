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
import { RPOINT } from '../store.js';
let chart;

function renderChart(timeOut){

    setTimeout(() => {
      let timeLine =  $dataset["time"];
      let dead = $dataset["Dead"];
      let icu = $dataset["ICU"];

      console.log(timeLine)


      chart = c3.generate({
          bindto: `#${id}`,
          size: {
            width: CWIDTH,
            height: CHEIGHT,
        },
          data: {
            x: 'time',
            columns: [timeLine, dead, icu],
            type: 'bar'
          },
          axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: "%b"
                }
            } 
        },
        point: {
            r: RPOINT
        }
      });
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




 
