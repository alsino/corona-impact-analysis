<script>

// API doc here: https://f2kayjqpni.execute-api.eu-central-1.amazonaws.com/dev/
// Inspiration: http://gabgoh.github.io/COVID/
// Current: https://covid19-simulation.herokuapp.com/

// Issues
// Data loading per promise not per timeout
// Update charts not per re-render but just data update

	import axios from 'axios';
	import { onMount, beforeUpdate } from 'svelte';
	import Intro from './intro.svelte';
	import ChartSteps from './charts/chartSteps.svelte';
	import ChartLine from './charts/chartLine.svelte';
	import { requestAPI } from './store.js';
	import { params } from './store.js';
	import { dataLoaded } from './store.js';
	import { dataset } from './store.js';

	let settings = $params;
	let data;

	let API= `https://f2kayjqpni.execute-api.eu-central-1.amazonaws.com/dev/simulate?
		policy_period0=${settings.policy_period0}&
		policy_period1=${settings.policy_period1}&
		policy_period2=${settings.policy_period2}&
		policy_period3=${settings.policy_period3}&
		policy_period4=${settings.policy_period4}&
		policy_strength1=${settings.policy_strength1}&
		policy_strength2=${settings.policy_strength2}&
		policy_strength3=${settings.policy_strength3}&
		r0=${settings.r0}&
		t_incubation=${settings.t_incubation}&
		t_presymptomatic=${settings.t_presymptomatic}&
		t_recovery_asymptomatic=${settings.t_recovery_asymptomatic}&
		t_recovery_mild=${settings.t_recovery_mild}&
		t_home_severe=${settings.t_home_severe}&
		t_hospital_severe_recovered=${settings.t_hospital_severe_recovered}&
		t_hospital_severe_deceased=${settings.t_hospital_severe_deceased}&
		p_asymptomatic=${settings.p_asymptomatic}&
		p_severe=${settings.p_severe}&
		p_fatal=${settings.p_fatal}&
		p_self_quarantine=${settings.p_self_quarantine}&
		p_icu_given_hospital=${settings.p_icu_given_hospital}&
		population_size=${settings.population_size}&
		hospital_capacity=${settings.hospital_capacity}&
		icu_capacity=${settings.icu_capacity}&
		T=${settings["T"]}&
		S=${settings["S"]}&
		E=${settings["E"]}&
		I=${settings["I"]}&
		I_asymptomatic=${settings.I_asymptomatic}&
		I_mild=${settings.I_mild}&
		I_severe_home=${settings.I_severe_home}&
		I_severe_hospital=${settings.I_severe_hospital}&
		I_fatal_home=${settings.I_fatal_home}&
		I_fatal_hospital=${settings.I_fatal_hospital}&
		R_from_asymptomatic=${settings.R_from_asymptomatic}&
		R_from_mild=${settings.R_from_mild}&
		R_from_severe=${settings.R_from_severe}&
		Dead=${settings.Dead}&
		Hypothetical%20R0=${settings["Hypothetical%20R0"]}`

	
	onMount(async () => {
		requestAPI(API);
	});


	function handleClick() {
		console.log(API)
	}

	function update(){

		API= `https://f2kayjqpni.execute-api.eu-central-1.amazonaws.com/dev/simulate?
		policy_period0=${settings.policy_period0}&
		policy_period1=${settings.policy_period1}&
		policy_period2=${settings.policy_period2}&
		policy_period3=${settings.policy_period3}&
		policy_period4=${settings.policy_period4}&
		policy_strength1=${settings.policy_strength1}&
		policy_strength2=${settings.policy_strength2}&
		policy_strength3=${settings.policy_strength3}&
		r0=${settings.r0}&
		t_incubation=${settings.t_incubation}&
		t_presymptomatic=${settings.t_presymptomatic}&
		t_recovery_asymptomatic=${settings.t_recovery_asymptomatic}&
		t_recovery_mild=${settings.t_recovery_mild}&
		t_home_severe=${settings.t_home_severe}&
		t_hospital_severe_recovered=${settings.t_hospital_severe_recovered}&
		t_hospital_severe_deceased=${settings.t_hospital_severe_deceased}&
		p_asymptomatic=${settings.p_asymptomatic}&
		p_severe=${settings.p_severe}&
		p_fatal=${settings.p_fatal}&
		p_self_quarantine=${settings.p_self_quarantine}&
		p_icu_given_hospital=${settings.p_icu_given_hospital}&
		population_size=${settings.population_size}&
		hospital_capacity=${settings.hospital_capacity}&
		icu_capacity=${settings.icu_capacity}&
		T=${settings["T"]}&
		S=${settings["S"]}&
		E=${settings["E"]}&
		I=${settings["I"]}&
		I_asymptomatic=${settings.I_asymptomatic}&
		I_mild=${settings.I_mild}&
		I_severe_home=${settings.I_severe_home}&
		I_severe_hospital=${settings.I_severe_hospital}&
		I_fatal_home=${settings.I_fatal_home}&
		I_fatal_hospital=${settings.I_fatal_hospital}&
		R_from_asymptomatic=${settings.R_from_asymptomatic}&
		R_from_mild=${settings.R_from_mild}&
		R_from_severe=${settings.R_from_severe}&
		Dead=${settings.Dead}&
		Hypothetical%20R0=${settings["Hypothetical%20R0"]}`

		requestAPI(API);
	}

</script>

<div id="app">
	<Intro/>
	<ChartSteps id={"chart-steps"}/>
	<ChartLine id={"chart-mask"}/>
	<!-- <ChartLine/> -->

	<!-- <button on:click={handleClick}>Get data from API</button> -->


	<label>
		<span>Beginning</span>
		<input type=text bind:value={settings.policy_period1} on:change={update}>
		<span>Policy Strength</span>
		<input type=range bind:value={settings.policy_strength1} min=0 max=1 step=0.1 on:change={update}>
		<span>{settings.policy_strength1}</span>
	</label>

	<!-- <label>
		<span>Policy Intervention 1</span>
		<input type=text bind:value={settings.policy_period2} on:change={update}>
		<span>Policy Strength</span>
		<input type=range bind:value={settings.policy_strength2} min=0 max=1 step=0.1 on:change={update}>
		<span>{settings.policy_strength2}</span>
	</label> -->


	<!-- <div>{JSON.stringify(data)}</div> -->

	<!-- {#if data}
		<div>{JSON.stringify(data)}</div>
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