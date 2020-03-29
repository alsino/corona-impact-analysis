<script>

// Run netlify dev

// API doc here: https://f2kayjqpni.execute-api.eu-central-1.amazonaws.com/dev/
// Inspiration: http://gabgoh.github.io/COVID/
// Current: https://covid19-simulation.herokuapp.com/

// CORS help: https://alligator.io/nodejs/solve-cors-once-and-for-all-netlify-dev/

// Tomo: 
// 1. Load data from url
// 2. Draw chart dynamically


	import { onMount, beforeUpdate } from 'svelte';
	import Intro from './intro.svelte';
	import ChartSteps from './charts/chartSteps.svelte';


	let dataSet;

	onMount(async () => {

			

	});

	async function getData(){
		const res = await fetch("/.netlify/functions/node-fetch")
			.then(function(res) {
					res.text()
						.then(function(data){
							dataSet = JSON.parse(data)
							console.log(dataSet)
						})
			})
	}


	function handleClick() {
		getData();
	}



</script>

<div id="app">
	<Intro/>
	<ChartSteps/>

	<button on:click={handleClick}>Get data from API</button>

	{#if dataSet}
		<div>{JSON.stringify(dataSet)}</div>
	{/if}


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