import { writable, readable, derived } from 'svelte/store';
import * as d3 from "d3";

export const dataLoaded = writable(false);
export const dataset = writable(undefined);
export const params = writable(undefined);

export let WWIDTH = window.innerWidth;
export let WHEIGHT = window.innerHeight;

export let CWIDTHBIG = WWIDTH < 640 ? WWIDTH - 40 : 460;
export let CWIDTHSMALL = WWIDTH < 640 ? WWIDTH - 40 : 390;

export const RPOINT = 2;

export const formatBarchart = d3.format(".0f");
export const formatStepchart = d3.format(".1f");
export const formatTime = d3.timeFormat("%d %B %Y");
export const formatYAxis = d3.format(",.0f");




export const COLORS = {
    "Reduction in new infections through policy": '#00CBDB',
    "HospitalizedExclICU": "#00CBDB",
    "ICU": "#FFBB00",
    "Hypothetical R0": "#00CBDB",
    "Currently_infected": "#00CBDB",
    "R_combined": "#00CBDB"  
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


export let params2 = [
{
  "General": [
    {
    "descr": "R0",
    "name": "r0",
    "alias": "r0",
    "min": 0,
    "max": 10,
    "unit": "individuals infected on average",
    "group": "General"
    }
  ]
},
{
  "Incubation": [
    {
      "descr": "Non-infectious incubation period",
      "name": "t_incubation",
      "alias": "t_incubation",
      "min" : 0,
      "max" : 10,
      "unit": "days"
    },
    {
      "descr": "Infectious incubation period",
      "name": "t_presymptomatic",
      "alias": "t_presymptomatic",
      "min" : 0,
      "max" : 10,
      "unit": "days"
    }
  ]
},
{
  "Illness duration": [
    {
      "descr": "Illness duration asymptomatic course",
      "name": "t_recovery_asymptomatic",
      "alias": "t_recov_asymp",
      "min" : 0,
      "max" : 30,
      "unit": "days"
    },
    {
      "descr": "Illness duration mild course",
      "name": "t_recovery_mild",
      "alias": "t_recovery_mild",
      "min" : 0,
      "max" : 30,
      "unit": "days"
    },
    {
      "descr": "Illness duration severe course",
      "name": "t_home_severe",
      "alias": "t_home_severe",
      "min" : 0,
      "max" : 30,
      "unit": "initial days at home"
    },
    {
    "descr": "Illness duration severe course",
    "name": "t_hospital_severe_recovered",
    "alias": "t_hosp_sev_rec",
    "min" : 0,
    "max" : 30,
    "unit": "days in hospital if recovered"
    },
    {
    "descr": "Illness duration severe course",
    "name": "t_hospital_severe_deceased",
    "alias": "t_hosp_sev_dec",
    "min" : 0,
    "max" : 30,
    "unit": "days in hospital if deceased"
    }
  ]
},
{
  "Group sizes" : [
    {
      "descr": "Fraction of individuals with asymptomatic course",
      "name": "p_asymptomatic",
      "alias": "p_asymptomatic",
      "min" : 0,
      "max" : 1,
      "unit": "share"
    },
    {
      "descr": "Fraction of individuals hospitalized / severe course",
      "name": "p_severe",
      "alias": "p_severe",
      "min" : 0,
      "max" : 1,
      "unit": "share"
    },
    {
      "descr": "Mortality rate",
      "name": "p_fatal",
      "alias": "p_fatal",
      "min" : 0,
      "max" : 1,
      "unit": "share"
    }
  ]
}
]


	
export async function requestAPI(endpoint){
  const res = await fetch(endpoint);
  let data = await res.json();
  dataset.set(data)
  dataLoaded.set(true);
  // console.log(dataLoaded);
  // console.log(res);
  // console.log(data);
}