<script>

	import { requestAPI } from './store.js';
	import { params } from './store.js';
	import { params2 } from './store.js';
	import SvelteTooltip from 'svelte-tooltip';
	import { API_ENDPOINT } from './store.js';

	let settings = $params;
	let API;
	let general = params2[0]["General"];
	let incubation = params2[1]["Incubation"];
	let duration = params2[2]["Illness duration"];
	let groupSizes = params2[3]["Group sizes"];
	

	function update(){

		API= `${API_ENDPOINT}
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

<div class="ctrl">
	<div class="ctrl-group">
		<div class="ctrl-name">General</div>
		{#each general as item, i}
			<div class="date">
			<SvelteTooltip tip={item.descr} top >
				<span class="var-name">{item.name}</span>
			</SvelteTooltip>
			<input 
				type=range 
				bind:value={settings[item.name]} 
				min={item.min} 
				max={item.max} 
				step=0.01 
				on:change={update}
			>
			<SvelteTooltip tip={item.unit} top >
				<span class="var-value">{settings[item.name]}</span>
			</SvelteTooltip>
			</div>
		{/each}
	</div>

	<div class="ctrl-group">
		<div class="ctrl-name">Incubation</div>
		{#each incubation as item, i}
			<div class="date">
			<SvelteTooltip tip={item.descr} top >
				<span class="var-name">{item.name}</span>
			</SvelteTooltip>
			<input 
				type=range 
				bind:value={settings[item.name]} 
				min={item.min} 
				max={item.max} 
				step=0.01 
				on:change={update}
			>
			<SvelteTooltip tip={item.unit} top >
				<span class="var-value">{settings[item.name]}</span>
			</SvelteTooltip>
			</div>
		{/each}
	</div>

	<div class="ctrl-group">
		<div class="ctrl-name">Illness duration</div>
		{#each duration as item, i}
		<div class="date">
			<SvelteTooltip tip={item.descr} top >
				<span class="var-name">{item.alias}</span>
			</SvelteTooltip>
			<input 
				type=range 
				bind:value={settings[item.name]} 
				min={item.min} 
				max={item.max} 
				step=1 
				on:change={update}
			>
			<SvelteTooltip tip={item.unit} top >
				<span class="var-value">{settings[item.name]}</span>
			</SvelteTooltip>
			</div>
		{/each}
	</div>

	<div class="ctrl-group">
		<div class="ctrl-name">Group sizes</div>
		{#each groupSizes as item, i}
			<div class="date">
			<SvelteTooltip tip={item.descr} top >
				<span class="var-name">{item.name}</span>
			</SvelteTooltip>
			<input 
				type=range 
				bind:value={settings[item.name]} 
				min={item.min} 
				max={item.max} 
				step=0.01 
				on:change={update}
			>
			<SvelteTooltip tip={item.unit} top >
				<span class="var-value">{settings[item.name]}</span>
			</SvelteTooltip>
			</div>
		{/each}
	</div>

	<!-- <SvelteTooltip tip="view on github" top >
			<button>Click me</button>
	</SvelteTooltip> -->
	
</div>


<style type="text/scss">

.ctrl {
	display: flex;
	
	.ctrl-name {
		margin-bottom: 20px;
		border-bottom: 1px solid #e2e2e2;
  	padding: 0px 0 10px 0;
		margin: 0 40px 20px 40px;
		font-weight: 600;
	}

	div {
		flex: 1;
		text-align: center;
	}

	.var-name {
		
		min-width: 120px;
		display: flex;
    align-items: center;
    justify-content: flex-end;
	} 

	.var-value {
		display: flex;
    align-items: center;
		justify-content: flex-start;
		flex: 1;
		margin: 0;
	} 

	span {
		font-family: 'IBM Plex Mono';
		font-size: 12px !important;
		align-items: center;
		flex: 1;

		&:nth-of-type(2){
			text-align: left;
		}
	}
	
	.date {
		flex: 1;
		text-align: right;
		display: flex;
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

@media (max-width: 670px) {
	.ctrl {
		display: block !important;

		.ctrl-group {
			margin: 30px 0;

			input[type="range"] {
				width: 170px;
				margin-right: 5px;
			}

			.ctrl-name {
				margin: 0;
			}

			.date {
				margin-top: 5px;
			}
		}
	}
}	

</style>




