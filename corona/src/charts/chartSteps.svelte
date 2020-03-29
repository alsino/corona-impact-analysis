<script>

	import * as d3 from "d3";
	import c3 from "c3";
  import '../../node_modules/c3/c3.min.css';

  import { onMount, beforeUpdate } from 'svelte';
  import { dataset } from '../stores.js';

	// import { id } from '../stores.js';
	// import { subjectVal } from '../stores.js';
	// import { datasets } from '../stores.js';
	// import { colors } from '../stores.js';
	// import { hideSeries }  from '../stores.js';
	// import { locale, formatGermany, formatAxes }  from '../stores.js';

	// import parseData  from '../assets/parseData';

	// let chart;
  // let parsedData;


const CWIDTH = 550;
const CHEIGHT = 300;

const COLORS = {
  "data1": '#00CBDB',
  "data2": "#F76906",
  "data3": "#FFBB00",
  "data4": "#57C494"
}

let chart1Data =  ['data1', 300, 350, 300, 600, 200, 150, 340, 260, 200, 300];
let chart1DataNew = ['data1', 100, 250, 400, 70, 90, 310, 240, 560, 300, 400];


onMount(() => {

    let chart1 = c3.generate({
    bindto: '#chart-steps',
    size: {
      width: CWIDTH,
    },
    tooltip: {
      grouped: true
    },
    data: {
        columns: [chart1Data],
        types: {
            data1: 'step'
        },
        names: {
          data1: 'Policy Strength'
        },
        colors: COLORS
    },
    axis: {
      x: {
        type: "category",
        categories: ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
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

});

</script>


<style>




</style>




 <div id="chart-steps"></div>




 
