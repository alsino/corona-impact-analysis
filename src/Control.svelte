<script>

	export let id;
	export let label;

	import SvelteTooltip from 'svelte-tooltip';
	import { requestAPI } from './store.js';
	import { params } from './store.js';
	import { API_ENDPOINT } from './store.js';

	let settings = $params;
	let API;


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
		I_fatal_hospital=${settings.I_fatal_hospital}&
		R_asy=${settings.R_asy}&
		R_mild=${settings.R_mild}&
		R_sev=${settings.R_sev}&
		D_sev=${settings.D_sev}&
		Hypothetical%20R0=${settings["Hypothetical%20R0"]}`

		requestAPI(API);
	}


</script>

{#if id == 1}

	<div class="ctrl">
			<div class="date">
				<span>{label}</span>
				<input type=text bind:value={settings.policy_period0} on:change={update}>
			</div>
			<div class="spacer"></div>
			<div class="strength"></div>	
	</div>

{:else if id == 2}

	<div class="ctrl">
		<div class="date">
			<span>{label}<span style="font-family:'IBM Plex Sans'; margin-right: 0;">*</span></span>
			<input type=text bind:value={settings.policy_period1} on:change={update}>
		</div>
		<div class="spacer"></div>

		<div class="strength">
			<span>Policy strength</span>
			<input type=range bind:value={settings.policy_strength1} min=0 max=1 step=0.01 on:change={update}>
			<span>{settings.policy_strength1}</span>
		</div>	
	</div>

{:else if id == 3}

	<div class="ctrl">
		<div class="date">
			<span>{label}<span style="font-family:'IBM Plex Sans'; margin-right: 0;">*</span></span>
			<input type=text bind:value={settings.policy_period2} on:change={update}>
		</div>
		<div class="spacer"></div>

		<div class="strength">
			<span>Policy strength</span>
			<input type=range bind:value={settings.policy_strength2} min=0 max=1 step=0.01 on:change={update}>
			<span>{settings.policy_strength2}</span>
		</div>	
	</div>

{:else if id == 4}

	<div class="ctrl">
		<div class="date">
			<span>{label}<span style="font-family:'IBM Plex Sans'; margin-right: 0;">*</span></span>
			<input type=text bind:value={settings.policy_period3} on:change={update}>
		</div>
		<div class="spacer"></div>

		<div class="strength">
			<span>Policy strength</span>
			<input type=range bind:value={settings.policy_strength3} min=0 max=1 step=0.01 on:change={update}>
			<span>{settings.policy_strength3}</span>
		</div>	
	</div>

{:else if id == 5}

	<!-- <div class="ctrl">
		<div class="date date-small">
			<span>{label}</span>
			<input type=range bind:value={settings.self_quar_strength} min=0 max=1 step=0.01 on:change={update}>
			<span style="width: 21px;">{settings.self_quar_strength}</span>
		</div>
	<div class="spacer"></div>
	<div class="strength"></div>
	</div> -->

{:else if id == 6}

	<div class="ctrl">
		<div class="date">
			<span>{label}</span>
			<input type=text bind:value={settings.policy_period4} on:change={update}>
		</div>
		<div class="spacer"></div>
		<div class="strength"></div>
	</div>
	
{/if }


<style type="text/scss">

.ctrl {
	display: flex;
	align-items: center;

	span {
		font-family: 'IBM Plex Mono';
		font-size: 12px;
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

@media (max-width: 670px) {

	.ctrl {
		margin: 20px 0;
		flex-direction: column;
		align-items: flex-start;

		input[type="range"] {
			width: 150px;
			margin-right: 5px;
		}

		.date {
			text-align: left;
			display: inline-flex;
		}
	}

}

</style>
