<script>

export let id;
export let height;
export let width;
export let multiple;
export let data1;
export let data2;
export let capacity;
export let capacity1;
export let capacity2;
export let hide;

import * as d3 from "d3";
import c3 from "c3";
import '../../node_modules/c3/c3.min.css';

import { onMount, beforeUpdate } from 'svelte';
import { dataLoaded } from '../store.js';
import { dataset } from '../store.js';
import { COLORS } from '../store.js';
import { RPOINT } from '../store.js';
import { formatBarchart } from '../store.js';
import { formatTime } from '../store.js';
import { formatYAxis } from '../store.js';
import { params } from '../store.js';

let settings = $params;
let chart;

let name = "";


function renderChart(timeOut){

    chart = chart;

    setTimeout(() => {
      let timeLine =  $dataset["time"];
      let dataSet1 = $dataset[data1];
      let dataSet2 = $dataset[data2];
      let columns;
      let lines;

      if (multiple){
         columns = [timeLine, dataSet1, dataSet2];
      } else {
         columns = [timeLine, dataSet1];
      }

      let line1 = $dataset[capacity1];
      let line2 = $dataset[capacity2];

      if (capacity){
        lines = [
            {value: settings.icu_capacity, text: line1[0], position: 'start'},
            {value: line2[1], text: line2[0], position: 'start'},
          ]
      } else {lines = []}


      let hideSeries; 

      if (hide) {
        hideSeries = hide;
      } else { hideSeries = [];}

      
     

      chart = c3.generate({
          bindto: `#${id}`,
          size: {
            width: width,
            height: height,
        },
          data: {
            x: 'time',
            columns: columns,
            type: 'bar',
            groups: [[data1, data2]],
            colors: COLORS,
            hide: hideSeries
          },
          axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: "%b"
                }
            },
            y : {
              tick: {
                format: function (d) { return formatYAxis(d) }
              }
            } 
        },
        point: {
            r: RPOINT
        },
        legend: {
          item: {
            onclick: function (id) { 
             chart.toggle(id);

              // if (chart.data.shown("Hospitalized excl. ICU")) {
              //   name = "Alsino";
              //   console.log(name);
              //   // console.log(chart.data.shown())
              // } else {
              //   name = "Robert";
              //   console.log(name);
              //   // console.log(chart.data.shown())
              // };   
              

            }
          }
        },
        grid: {
        y: {
          lines: lines
        }
      },
      tooltip: {
        format: {
            title: function (d) { return formatTime(d) },
            value: function (value, ratio, id) {
                return formatBarchart(value);
            }
        }
      }
    });
    }, timeOut);

};


beforeUpdate(() => {
  renderChart(0);
});


</script>




<style>

</style>




 <div id={id} class="cChart"></div>




 
