<script>

export let id;
export let height;
export let width;

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
      let HospitalizedExclICU = $dataset["HospitalizedExclICU"];
      let icu = $dataset["ICU"];
      let icuCapacity = $dataset["IcuCapacity"];
      let HospitalCapacity = $dataset["HospitalCapacity"];


      // console.log(timeLine)


      chart = c3.generate({
          bindto: `#${id}`,
          size: {
            width: width,
            height: height,
        },
          data: {
            x: 'time',
            columns: [timeLine, HospitalizedExclICU, icu],
            type: 'bar',
            groups: [['HospitalizedExclICU', 'ICU']],
            colors: COLORS
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
        },
        grid: {
        y: {
          lines: [
            {value: icuCapacity[1], text: icuCapacity[0], position: 'start'},
            {value: HospitalCapacity[1], text: HospitalCapacity[0], position: 'start'},
          ]
        }
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




 
