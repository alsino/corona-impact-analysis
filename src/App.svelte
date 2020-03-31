<script>

// Inspiration: http://gabgoh.github.io/COVID/
// Current: https://covid19-simulation.herokuapp.com/
// Svelte tabs: https://svelte.dev/repl/8e68120858e5322272dc9136c4bb79cc?version=3.5.1

// Issues
// Data loading per promise not per timeout
// Update charts not per re-render but just data update

// ToDos
// 1. Hook up controls to correct parameters
// 2. Add remaining charts

	import axios from 'axios';
	import { onMount, beforeUpdate } from 'svelte';
	import Intro from './intro.svelte';
	import ChartSteps from './charts/chartSteps.svelte';
	import ChartLine from './charts/chartLine.svelte';
	import Control from './Control.svelte';
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


</script>

<div id="app">

	<Intro/>

	<section id="charts">
		<div id="highlight">
			<ChartLine id={"chart-0"} width={500} height={400}/>
		</div>
		<div id="multiple">
			<div class="row">
				<ChartLine id={"chart-1"} width={360} height={200}/>
				<ChartSteps id={"chart-2"} width={360} height={200}/>
			</div>
			<div class="row">
				<ChartLine id={"chart-3"} width={360} height={200}/>
				<ChartSteps id={"chart-4"} width={360} height={200}/>
			</div>
		</div>
	</section>

	<section id="controls">
		<Control label={"Beginning"} small={false} end={false}/>
		<Control label={"Policy Intervention 1"} small={false} end={false}/>
		<Control label={"Policy Intervention 2"} small={false} end={false}/>
		<Control label={"Policy Intervention 3"} small={false} end={false}/>
		<Control label={"P_self_quarantine"} small={true} end={false}/>
		<Control label={"End of simulation"} small={false} end={true}/>
	</section>

</div>



<style type="text/scss">

	#app {
		margin: 2em 6em 0 6em;

		#charts {
			display: flex;
			// height: 400px;

			#highlight {
				flex: 0.9;
				// background: red;
			}

			#multiple {
				flex: 1;
				// background: blue;

				.row {
					display: flex;
					justify-content: space-between;
				}
			}
		}

		#controls {
			margin-top: 2em;
		}
	}

	@media (max-width: 640px) {
		#app {
			margin: 1em;
		}

		.cChart {
			margin: 0px;
		}
	}

</style>