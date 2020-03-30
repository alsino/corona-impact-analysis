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
      let reduction = $dataset["Reduction in new infections through policy"];

      chart = c3.generate({
        bindto: `#${id}`,
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
            show:true
          }
        },
        point: {
            r: RPOINT
        } 
        // legend: {
        //   position: 'inset'
        // }
      });

    }, timeOut);

};

onMount(() => {
  renderChart(3000);
}); // onMount end



beforeUpdate(() => {
  renderChart(0);
}); // beforeUpdate end

</script>

<div id={id} class="cChart"></div>




 
