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
		t_e_inc=${settings.t_e_inc}&
		t_i_inc=${settings.t_i_inc}&
		t_asy=${settings.t_asy}&
		t_mild=${settings.t_mild}&
		t_sev_pre_hos=${settings.t_sev_pre_hos}&
		t_sev_hos_rec=${settings.t_sev_hos_rec}&
		t_sev_hos_dec=${settings.t_sev_hos_dec}&
		p_asy=${settings.p_asy}&
		p_sev_rec=${settings.p_sev_rec}&
		p_sev_dec=${settings.p_sev_dec}&
		self_quar_strength=${settings.self_quar_strength}&
		p_icu_given_hospital=${settings.p_icu_given_hospital}&
		population_size=${settings.population_size}&
		hospital_capacity=${settings.hospital_capacity}&
		icu_capacity=${settings.icu_capacity}&
		T=${settings["T"]}&
		S=${settings["S"]}&
		E=${settings["E"]}&
		I_inc=${settings["I_inc"]}&
		I_asy=${settings.I_asy}&
		I_mild=${settings.I_mild}&
		I_sev_pre_hos=${settings.I_sev_pre_hos}&
		I_sev_hos_rec=${settings.I_sev_hos_rec}&
		I_sev_hos_dec=${settings.I_sev_hos_dec}&
		R_asy=${settings.R_asy}&
		R_mild=${settings.R_mild}&
		R_sev=${settings.R_sev}&
		D_sev=${settings.D_sev}&
		Hypothetical%20R0=${settings["Hypothetical%20R0"]}`

		requestAPI(API);
	}

</script>

<div class="ctrl">
	<div class="ctrl-group">
		<div class="ctrl-name">General</div>
		{#each general as item, i}
			<div class="date">
			<SvelteTooltip tip={item.name} top >
				<span class="var-name">{item.descr}</span>
			</SvelteTooltip>

			{#if !item.apiRequest}

			<input 
				type=range 
				bind:value={settings[item.name]} 
				min={item.min} 
				max={item.max} 
				step=100 
				on:change={update}
			>


			{:else}

			<input 
				type=range 
				bind:value={settings[item.name]} 
				min={item.min} 
				max={item.max} 
				step=0.01 
				on:change={update}
			>

			{/if}


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
			<SvelteTooltip tip={item.name} top >
				<span class="var-name">{item.descr}</span>
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
			<SvelteTooltip tip={item.name} top >
				<span class="var-name">{item.descr}</span>
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

	<!-- <div class="ctrl-group">
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
	</div> -->

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
		min-width: 44px;
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
		justify-content: flex-end;
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
