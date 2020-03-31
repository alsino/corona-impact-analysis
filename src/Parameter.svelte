<script>


// Object.filter = (obj, predicate) => 
//     Object.keys(obj)
//           .filter( key => predicate(obj[key]) )
//           .reduce( (res, key) => (res[key] = obj[key], res), {} );

// // Example use:
// var scores = {
//     John: 2, Sarah: 3, Janet: 1
// };
// var filtered = Object.filter(scores, score => score > 1); 
// console.log(filtered);

	// export let id;
	

	import { requestAPI } from './store.js';
	import { params } from './store.js';
	import { params2 } from './store.js';
	import { onMount, beforeUpdate } from 'svelte';
	let settings = $params;
	let API;

	


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

	onMount(async () => {
		console.log(params2[0]);
	});


</script>

{#each params2 as par, i}
	<div class="ctrl">
		<div class="date">
			<span>{par.name}</span>
			<input 
				type=range 
				bind:value={settings[par.name]} 
				min={par.min} 
				max={par.max} 
				step=0.1 
				on:change={update}
			>
			<span>{settings[par.name]}</span>
		</div>
		<div class="spacer"></div>
		<div class="strength"></div>	
	</div>
{/each}


<style type="text/scss">

.ctrl {
	display: flex;
	align-items: center;

	span {
		font-family: 'IBM Plex Mono';
		font-size: 12px !important;
		min-height: 20px;
  	display: inline-flex;
		align-items: center;
	}
	
	.date {
		flex: 1;
		text-align: right;
	}

	.date-small {

		display: flex;
		align-items: center;
		justify-content: flex-end;

		input{
			margin-right: 0;
			margin: 10px 16px;
		}
	}

	.spacer {
		flex: 0.1;
	}

	.strength {
		display: flex;
		flex: 1;
	}
}

</style>




