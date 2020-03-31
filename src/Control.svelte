<script>

	export let label;
	export let small;
	export let end;
	export let date;
	export let strength;

	import { requestAPI } from './store.js';
	import { params } from './store.js';
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


</script>

{#if small}

	<div class="ctrl">
		<div class="date date-small">
			{label}
			<input type=range bind:value={settings.policy_strength1} min=0 max=1 step=0.1 on:change={update}>
			{settings.policy_strength1}
		</div>
	<div class="spacer"></div>
	<div class="strength"></div>

	</div>

{:else if end}


<div class="ctrl">
		<div class="date">
			<span>{label}</span>
			<input type=text bind:value={settings.policy_period1} on:change={update}>
		</div>
		<div class="spacer"></div>

		<div class="strength"></div>	

	</div>

{:else}

	<div class="ctrl">
		<div class="date">
			<span>{label}</span>
			<input type=text bind:value={settings.policy_period1} on:change={update}>
		</div>
		<div class="spacer"></div>

		<div class="strength">
			<span>Policy Strength</span>
			<input type=range bind:value={settings.policy_strength1} min=0 max=1 step=0.1 on:change={update}>
			<span>{settings.policy_strength1}</span>
		</div>	

	</div>

{/if }


<style type="text/scss">

.ctrl {
	display: flex;
	align-items: center;
	
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




