<script>

// API doc here: https://f2kayjqpni.execute-api.eu-central-1.amazonaws.com/dev/
// Inspiration: http://gabgoh.github.io/COVID/
// Current: https://covid19-simulation.herokuapp.com/


	import axios from 'axios';
	import { onMount, beforeUpdate } from 'svelte';
	import Intro from './intro.svelte';
	import ChartSteps from './charts/chartSteps.svelte';
	import { params } from './store.js';
	import { getData } from './store.js';


	let settings = $params;
	let API_ENDPOINT = 
	`https://f2kayjqpni.execute-api.eu-central-1.amazonaws.com/dev/simulate?policy_period1=${$params.policy_period1}&policy_strength1=${$params.policy_strength1}`;


	onMount(async () => {
		// getData();
		console.log(settings);
	});


	function handleClick() {
		console.log(API_ENDPOINT)
		getData(API_ENDPOINT);
	}



</script>

<div id="app">
	<Intro/>
	<ChartSteps/>

	<button on:click={handleClick}>Get data from API</button>

	<!-- {#if dataSet}
		<div>{JSON.stringify(dataSet)}</div>
	{/if} -->


</div>



<style type="text/scss">
	#app {
		margin: 2em 6em 0 6em;
	}




	// @media (min-width: 640px) {
	// 	main {
	// 		max-width: none;
	// 	}
	// }

</style>