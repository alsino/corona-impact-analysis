import { writable, readable, derived } from 'svelte/store';

export const dataLoaded = writable(false);
export const dataset = writable(undefined);
export const params = writable(undefined);

export const CWIDTH = 550;
export const CHEIGHT = 250;
export const RPOINT = 2;

export const COLORS = {
    "Reduction in new infections through policy": '#00CBDB',
    "Dead": "#F76906",
    "ICU": "#FFBB00",
    "data4": "#57C494"
}

params.set({
  "policy_period0": "2020-01-12",
  "policy_period1": "2020-03-14",
  "policy_period2": "2020-03-21",
  "policy_period3": "2020-04-14",
  "policy_period4": "2020-12-31",
  "policy_strength1": 0.2,
  "policy_strength2": 0.8,
  "policy_strength3": 0.3,
  "r0": 2.4,
  "t_incubation": 4.6,
  "t_presymptomatic": 0.5,
  "t_recovery_asymptomatic": 6,
  "t_recovery_mild": 6,
  "t_home_severe": 5,
  "t_hospital_severe_recovered": 10.4,
  "t_hospital_severe_deceased": 10.4,
  "p_asymptomatic": 0.3,
  "p_severe": 0.044,
  "p_fatal": 0.009,
  "p_self_quarantine": 0.66,
  "p_icu_given_hospital": 0.3,
  "population_size": 82790000,
  "hospital_capacity": 200000,
  "icu_capacity": 14000,
  "T": 0,
  "S": 0.9999994,
  "E": 0.0000006,
  "I": 0,
  "I_asymptomatic": 0,
  "I_mild": 0,
  "I_severe_home": 0,
  "I_severe_hospital": 0,
  "I_fatal_home": 0,
  "I_fatal_hospital": 0,
  "R_from_asymptomatic": 0,
  "R_from_mild": 0,
  "R_from_severe": 0,
  "Dead": 0,
  "Hypothetical%20R0": 2.4
});



	
	
export async function requestAPI(endpoint){
  const res = await fetch(endpoint);
  let data = await res.json();
  dataset.set(data)
  dataLoaded.set(true);
  // console.log(dataLoaded);
  // console.log(res);
  console.log(data);
}

// export async function getData(API_ENDPOINT){

//   axios.get(API_ENDPOINT)
//     .then(function (response) {
//       // handle success
//       dataset.set(response);
//       // console.log(response);
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     })
//     .then(function (){
//       dataLoaded.set(true)
//     })
// }