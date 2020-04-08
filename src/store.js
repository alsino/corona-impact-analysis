import { writable } from 'svelte/store';
import * as d3 from "d3";

export const dataset = writable(undefined);
export const dataLoaded = writable(false);
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

const API_KEY = process.env.API_KEY;
export const API_ENDPOINT = process.env.API_URL;

export const COLORS = {
    "Reduction in new infections through policy": '#00CBDB',
    "Hospitalized excl. ICU": "#00CBDB",
    "ICU": "#FFBB00",
    "Deceased" : "#FFBB00",
    "Hypothetical R0": "#00CBDB",
    "Infectious": "#00CBDB",
    "Recovered": "#00CBDB"  
}

params.set({
  "policy_period0": "2020-01-12",
  "policy_period1": "2020-03-14",
  "policy_period2": "2020-03-21",
  "policy_period3": "2020-04-14",
  "policy_period4": "2020-12-31",
  "policy_strength1": 0.2,
  "policy_strength2": 0.7,
  "policy_strength3": 0.63,
  "r0": 2.6,
  "t_e_inc": 4.6,
  "t_i_inc": 0.5,
  "t_asy": 6,
  "t_mild": 7,
  "t_sev_pre_hos": 5,
  "t_sev_hos_rec": 25.5,
  "t_sev_hos_dec": 9,
  "p_asy": 0.3,
  "p_sev_rec": 0.044,
  "p_sev_dec": 0.009,
  "self_quar_strength": 0.0,
  "p_icu_given_hospital": 0.4,
  "population_size": 82790000,
  "hospital_capacity": 200000,
  "icu_capacity": 14000,
  "T": 0,
  "S": 0.9999994,
  "E": 0.0000006,
  "I_inc": 0,
  "I_asy": 0,
  "I_mild": 0,
  "I_sev_pre_hos": 0,
  "I_sev_hos_rec": 0,
  "I_sev_hos_dec": 0,
  "R_asy": 0,
  "R_mild": 0,
  "R_sev": 0,
  "D_sev": 0,
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
    "apiRequest" : true
    },
    {
      "descr": "Number of Intensive Care Units",
      "name": "icu_capacity",
      "alias": "icu_capacity",
      "min" : 5000,
      "max" : 60000,
      "unit": "ICUs",
      "apiRequest" : false
    },
    {
      "descr": "Number of hospital beds",
      "name": "hospital_capacity",
      "alias": "hospital_capacity",
      "min" : 50000,
      "max" : 500000,
      "unit": "beds",
      "apiRequest" : false
    },
    {
      "descr": "Hospitalized patients require intensive care",
      "name": "p_icu_given_hospital",
      "alias": "p_icu_given_hosp",
      "min" : 0,
      "max" : 1,
      "unit": "share",
      "apiRequest" : true
    }
  ]
},
{
  "Incubation": [
    {
      "descr": "Non-infectious incubation period",
      "name": "t_e_inc",
      "alias": "t_e_inc",
      "min" : 0.01,
      "max" : 10,
      "unit": "days"
    },
    {
      "descr": "Infectious incubation period",
      "name": "t_i_inc",
      "alias": "t_i_inc",
      "min" : 0.01,
      "max" : 10,
      "unit": "days"
    }
  ]
},
{
  "Illness duration": [
    {
      "descr": "Illness duration asymptomatic course",
      "name": "t_asy",
      "alias": "t_recov_asymp",
      "min" : 1,
      "max" : 30,
      "unit": "days"
    },
    {
      "descr": "Illness duration mild course",
      "name": "t_mild",
      "alias": "t_mild",
      "min" : 1,
      "max" : 30,
      "unit": "days"
    },
    {
      "descr": "Illness duration severe course",
      "name": "t_sev_pre_hos",
      "alias": "t_sev_pre_hos",
      "min" : 1,
      "max" : 30,
      "unit": "initial days at home"
    },
    {
    "descr": "Illness duration severe course",
    "name": "t_sev_hos_rec",
    "alias": "t_hosp_sev_rec",
    "min" : 0.01,
    "max" : 30,
    "unit": "days in hospital if recovered"
    },
    {
    "descr": "Illness duration severe course",
    "name": "t_sev_hos_dec",
    "alias": "t_hosp_sev_dec",
    "min" : 0.01,
    "max" : 30,
    "unit": "days in hospital if deceased"
    }
  ]
},
{
  "Group sizes" : [
    {
      "descr": "Fraction of individuals with asymptomatic course",
      "name": "p_asy",
      "alias": "p_asy",
      "min" : 0,
      "max" : 1,
      "unit": "share"
    },
    {
      "descr": "Fraction of individuals hospitalized / severe course",
      "name": "p_sev_rec",
      "alias": "p_sev_rec",
      "min" : 0,
      "max" : 1,
      "unit": "share"
    },
    {
      "descr": "Mortality rate",
      "name": "p_sev_dec",
      "alias": "p_sev_dec",
      "min" : 0,
      "max" : 1,
      "unit": "share"
    }
  ]
}
]


	
export async function requestAPI(endpoint){

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "X-API-KEY": API_KEY,
    }
  };
  
  const res = await fetch(endpoint, requestOptions)
    .then(response => response.json())
    .then(function(data) {
      dataset.set(data);
      dataLoaded.set(true);
      // console.log(data);
    })
    .catch(error => console.log('error', error));

}
