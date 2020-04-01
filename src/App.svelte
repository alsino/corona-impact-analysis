<script>
// Inspiration: http://gabgoh.github.io/COVID/
// Current: https://covid19-simulation.herokuapp.com/
// Svelte tabs: https://svelte.dev/repl/8e68120858e5322272dc9136c4bb79cc?version=3.5.1

// Issues
// Data loading per promise not per timeout
// Update charts not per re-render but just data update

// ToDos
// API key

	import axios from 'axios';
	import { onMount, beforeUpdate } from 'svelte';
	import Header from './Header.svelte';
	import ChartSteps from './charts/chartSteps.svelte';
	import ChartBar from './charts/chartBar.svelte';
	import Control from './Control.svelte';
	import Parameter from './Parameter.svelte';
	import { Tabs, TabList, TabPanel, Tab } from './tabs.js';
	import { requestAPI } from './store.js';
	import { params } from './store.js';
	import { dataLoaded } from './store.js';
	import { dataset } from './store.js';
	import { CWIDTHBIG } from './store.js';
	import { CWIDTHSMALL } from './store.js';

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

	<Header/>

	<section id="charts">
		<div id="highlight">
			<ChartBar id={"chart-0"} 
				width={CWIDTHBIG} 
				height={400} 
				multiple={true} 
				data1={"HospitalizedExclICU"} 
				data2={"ICU"} 
				capacity={true} 
				capacity1={"IcuCapacity"} 
				capacity2={"HospitalCapacity"}
			/>
		</div>
		<div id="multiple">
			<div class="row">
				<ChartSteps id={"chart-1"} width={CWIDTHSMALL} height={200} data={"Reduction in new infections through policy"}/>
				<ChartSteps id={"chart-2"} width={CWIDTHSMALL} height={200} data={"Hypothetical R0"}/>
			</div>
			<div class="row">
				<ChartBar id={"chart-3"} 
					width={CWIDTHSMALL} 
					height={200} 
					multiple={false} 
					data1={"Currently_infected"}
					data2={""}  
					capacity={false}
					capacity1={""} 
					capacity2={""} 
				/>
				<ChartBar id={"chart-4"} 
					width={CWIDTHSMALL} 
					height={200} 
					multiple={false} 
					data1={"R_combined"} 
					data2={""}  
					capacity={false} 
					capacity1={""} 
					capacity2={""}
				/>
			</div>
		</div>
	</section>

	<section id="controls">

		<Tabs>
		<TabList>
			<Tab>Policy intervention</Tab>
			<Tab>Model parameters</Tab>
		</TabList>

		<TabPanel>
			<div class="tab-wrapper">
				<Control id={1} label={"Beginning"}/>
				<Control id={2} label={"Policy intervention 1"}/>
				<Control id={3} label={"Policy intervention 2"}/>
				<Control id={4} label={"Policy intervention 3"}/>
				<Control id={5} label={"P_self_quarantine"}/>
				<Control id={6} label={"End of simulation"}/>
				<div class ="footnote">* Policy intervention 1-3: Percentage decrease in new infections per period, eg. through social distancing or fast testing and isolation</div>

			</div>
		</TabPanel>

		<TabPanel>
			<div class="tab-wrapper">
				<Parameter id={1} label={"Beginning"}/>
			</div>
		</TabPanel>		
	</Tabs>
		
	</section>

	<section id="credits">
		<div>Model & calculations: Maximilian Eber, Friedrich Geiecke, Wolfgang Ridinger</div>
		<div>Design & development: <a target="_blank" href="https:alsino.io/">Alsino Skowronnek</a></div>
	</section>
</div>



<style type="text/scss">

	#app {
		margin: 2em 6em 2em 6em;

		#charts {
			display: flex;

			.cChart {
				margin: 0 10px;
			}

			#highlight {
				flex: 0.9;
			}

			#multiple {
				flex: 1;

				.row {
					display: flex;
					justify-content: space-between;
				}
			}
		}

		#controls {
			margin: 2em 0 3em 0;

			.tab-wrapper {
				margin-top: 2em;
			}
		}

		.footnote {
			font-family: 'IBM Plex Mono';
			font-size: 12px;
			text-align: left;
			margin-top: 5em;
			width: 40%;
		}

		#credits {
			font-family: 'IBM Plex Mono';
			font-size: 10px;
			text-align: right;
		}


	}

	@media (max-width: 670px) {
		#app {
			margin: 1em;

			#charts {
				flex-direction: column;

				.row {
					flex-direction: column;
				}
			}
		}
	}

</style>