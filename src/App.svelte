<script>
// Inspiration: http://gabgoh.github.io/COVID/
// Current: https://covid19-simulation.herokuapp.com/
// Svelte tabs: https://svelte.dev/repl/8e68120858e5322272dc9136c4bb79cc?version=3.5.1

// Issues
// Update charts not per re-render but just data update

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
	import { explanations } from './store.js';
	import { dataLoaded } from './store.js';
	import { dataset } from './store.js';
	import { CWIDTHBIG } from './store.js';
	import { CWIDTHSMALL } from './store.js';
	import { API_ENDPOINT } from './store.js';
	

	let settings = $params;
	let data;

	let API= `${API_ENDPOINT}
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


	beforeUpdate(() => {
		requestAPI(API);
		console.log(explanations);
	});



</script>

<div id="app">

	<Header/>

	{#if !$dataLoaded}
		<div class="loader"></div>
	{/if}

	{#if $dataLoaded}
		<section id="charts">
			<div id="highlight">
				<ChartBar id={"chart-0"} 
					width={CWIDTHBIG} 
					height={400} 
					multiple={false}
					data1={"ICU"} 
					data2={"Hospitalized excl. ICU"}
					hide={"Hospitalized excl. ICU"}  
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
						data1={"Infectious"}
						data2={""}  
						hide={""}
						capacity={false}
						capacity1={""} 
						capacity2={""} 
					/>
					<ChartBar id={"chart-4"} 
						width={CWIDTHSMALL} 
						height={200} 
						multiple={true} 
						data1={"Recovered"} 
						data2={"Deceased"}
						hide={""}    
						capacity={false} 
						capacity1={""} 
						capacity2={""}
					/>
				</div>
			</div>
		</section>
	{/if}	

	<section id="controls">

		<Tabs>
		<TabList>
			<Tab>Policy intervention</Tab>
			<Tab>Model parameters</Tab>
		</TabList>

		<TabPanel>
			<div class="tab-wrapper">
				<Control id={1} label={"Beginning of simulation"}/>
				<Control id={2} label={"First intervention"}/>
				<Control id={3} label={"Lockdown"}/>
				<Control id={4} label={"Post-lockdown"}/>
				<Control id={5} label={"self_quar_strength"}/>
				<Control id={6} label={"End of simulation"}/>
				<div class ="footnote">* Policy strength: Percentage decrease in new infections per period, eg. through social distancing or fast testing and isolation</div>
			</div>
		</TabPanel>

		<TabPanel>
			<div class="tab-wrapper">
				<Parameter/>
			</div>
		</TabPanel>		
	</Tabs>
		
	</section>

	<section id="explanation">

	<div style="overflow-x:auto;">

		<table>
				<tr>
					<th>Variable</th>
					<th>Meaning (German)</th>
					<th>Our value</th>
					<th>Estimate in literature</th>
					<th>Comments</th>
					<th>Source</th>
					<th>Url</th>
				</tr>

				{#each explanations as item}
					<tr>
						<td>{item["Variable"]}</td>
						<td>{item["Meaning (German)"]}</td>
						<td>{item["Our value"]}</td>
						<td>{item["Estimate in literature"]}</td>
						<td>{item["Comments"]}</td>
						<td>{item["Source"]}</td>
						<td><a target="_blank" href="{item["Link"]}">Link</a></td>
					</tr>
				{/each}
			</table>
	
	
	</div>

		

	</section>

	<section id="credits">
		<div>
			<a href="https://github.com/maximilianeber/covid">Model & calculations</a>: 
			<a href="https://github.com/maximilianeber">Maximilian Eber</a>, 
			<a href="https://sites.google.com/view/friedrichgeiecke/">Friedrich Geiecke</a>, 
			<a href="http://www.lse.ac.uk/economics/phd-job-market/job-market-candidates/wolfgang-ridinger">Wolfgang Ridinger</a>
		</div>
		<div>In collaboration with: Dominic Ponattu (BMF)</div>
		<div>Design & development: <a target="_blank" href="https://alsino.io/">Alsino Skowronnek</a></div>
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
				margin: 2em 0;
			}
		}

		#explanation {
			padding-top: 2em;

			table {
				table-layout: auto;
				width: 100%;  

				th, td {
					text-align: left;
					padding: 5px 10px;
					border-bottom: 1px solid #f0f0f0;
				}
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
