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
	import { dataLoaded } from './store.js';
	import { dataset } from './store.js';

	let settings = $params;

	let API_ENDPOINT = `https://f2kayjqpni.execute-api.eu-central-1.amazonaws.com/dev/simulate?policy_period1=${settings.policy_period1}&policy_strength1=${settings.policy_strength1}`;

	
	onMount(async () => {
		await getData(API_ENDPOINT);		
	});


	function handleClick() {
		console.log(API_ENDPOINT)
	}

	function update(){
		API_ENDPOINT = `https://f2kayjqpni.execute-api.eu-central-1.amazonaws.com/dev/simulate?policy_period1=${settings.policy_period1}&policy_strength1=${settings.policy_strength1}`;
		getData(API_ENDPOINT);

	}

</script>

<div id="app">
	<Intro/>
	<ChartSteps/>

	<!-- <button on:click={handleClick}>Get data from API</button> -->

	<label>
		<span>Beginning</span>
		<input type=text bind:value={settings.policy_period1} on:change={update}>
		<span>Policy Strength</span>
		<input type=range bind:value={settings.policy_strength1} min=0 max=1 step=0.1 on:change={update}>
		<span>{settings.policy_strength1}</span>
	</label>

	{#if $dataset}
		<div>{JSON.stringify($dataset)}</div>
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