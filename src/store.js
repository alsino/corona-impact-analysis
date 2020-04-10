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
  "policy_period3": "2020-04-20",
  "policy_period4": "2020-12-31",
  "policy_strength1": 0.2,
  "policy_strength2": 0.65,
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
  "p_icu_given_hospital": 0.48,
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
      "descr": "Share of hospitalized requiring intensive care",
      "name": "p_icu_given_hospital",
      "alias": "p_icu_given_hosp",
      "min" : 0,
      "max" : 1,
      "unit": "share",
      "apiRequest" : true
    },
    {
      "descr": "Share of ind. with asymptomatic course",
      "name": "p_asy",
      "alias": "p_asy",
      "min" : 0,
      "max" : 1,
      "unit": "share"
    },
    {
      "descr": "Share of ind. hospitalized (severe course) recovering",
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
},
{
  "Incubation": [
    {
      "descr": "Non-infectious incub. period",
      "name": "t_e_inc",
      "alias": "t_e_inc",
      "min" : 0.01,
      "max" : 10,
      "unit": "days"
    },
    {
      "descr": "Infectious incub. period",
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
      "descr": "Illness duration before hospital/ICU admission",
      "name": "t_sev_pre_hos",
      "alias": "t_sev_pre_hos",
      "min" : 1,
      "max" : 30,
      "unit": "initial days at home"
    },
    {
    "descr": "Illness duration (severe cases) in hospital/ICU until recovery",
    "name": "t_sev_hos_rec",
    "alias": "t_hosp_sev_rec",
    "min" : 0.01,
    "max" : 30,
    "unit": "days in hospital if recovered"
    },
    {
    "descr": "Illness duration (severe cases) in hospital/ICU until death",
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
    
  ]
}
]



export let explanations = [{
  "Variable": "Non-infectious incub. period",
  "Meaning (German)": "Inkubationszeit, in der man nicht-infektiös ist",
  "Our value": "4.6 days",
  "Estimate in literature": "4.5-5.5 days",
  "Comments": "",
  "Source": "WHO Situation Report 2/04",
  "Link": "https://www.who.int/docs/default-source/coronaviruse/situation-reports/20200402-sitrep-73-covid-19.pdf?sfvrsn=5ae25bc7_2"
},
{
  "Variable": "Infectious incub. period",
  "Meaning (German)": "Inkubationszeit, in der man infektiös ist",
  "Our value": "0.5 days",
  "Estimate in literature": "1-3 days",
  "Comments": "",
  "Source": "WHO Situation Report 2/04",
  "Link": "https://www.who.int/docs/default-source/coronaviruse/situation-reports/20200402-sitrep-73-covid-19.pdf?sfvrsn=5ae25bc7_2"
},
{
  "Variable": "Share of ind. with asymptomatic course",
  "Meaning (German)": "Anteil der Infizierten mit asymptomatischem Verlauf",
  "Our value": "30%",
  "Estimate in literature": "17.9% (15.5–20.2)",
  "Comments": "Diamond Princess Passengers",
  "Source": "Mizumoto, Kagaya, Zarebski, Chowell 2020 (Eurosurveillance)",
  "Link": "https://eurosurveillance.org/content/10.2807/1560-7917.ES.2020.25.10.2000180#r13"
},
{
  "Variable": "Share of ind. hospitalized (severe course) recovering",
  "Meaning (German)": "Anteil der Infizierten mit schwerem Verlauf, die genesen (mit Krankenhausaufenthalt)",
  "Our value": "4.4%",
  "Estimate in literature": "8.16% (4.86–16.7) -  p_sev_dec",
  "Comments": "8.16% is \"Proportions of infected individuals hospitalised\" for age group 50-59 (overall figure not reported but this age group closest to overall fatality rate)",
  "Source": "Verity et al., Lancet, 30 Mar 2020",
  "Link": "https://www.thelancet.com/action/showPdf?pii=S1473-3099%2820%2930243-7"
},
{
  "Variable": "Mortality rate",
  "Meaning (German)": "Anteil der Infizierten mit tödlichem Krankheitsverlauf",
  "Our value": "0.9%",
  "Estimate in literature": "0.66% (0.39–1.33)",
  "Comments": "Infection Fatality Ratio. Model refers to deaths relative to true number of infected, not to report cases",
  "Source": "Verity et al., Lancet, 30 Mar 2020",
  "Link": "https://www.thelancet.com/action/showPdf?pii=S1473-3099%2820%2930243-7"
},
{
  "Variable": "Illness duration before hospital/ICU admission",
  "Meaning (German)": "Anzahl der Tage zwischen Start der Symptome und Krankenhauseinlieferung",
  "Our value": "5 days",
  "Estimate in literature": "7 days (4-9)",
  "Comments": "This study assumes time of hospital admission to be time of onset of dyspnoea",
  "Source": "Garcia-Basteiro et al",
  "Link": "https://www.thelancet.com/journals/lanres/article/PIIS2213-2600(20)30162-4/fulltext"
},
{
  "Variable": "",
  "Meaning (German)": "",
  "Our value": "",
  "Estimate in literature": "11 days (8-14)",
  "Comments": "Based on hospitalised patients in China",
  "Source": "Zhou et al, Lancet, 28 Mar 2020",
  "Link": "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30566-3/fulltext"
},
{
  "Variable": "Illness duration (severe cases) in hospital/ICU until recovery",
  "Meaning (German)": "Anzahl der Tage im Krankenhaus bis Genesung",
  "Our value": "25.5 days",
  "Estimate in literature": "24.7 days (22.9–28.1) - t_sev_pre_hos",
  "Comments": "",
  "Source": "Verity et al., Lancet, 30 Mar 2020",
  "Link": "https://www.thelancet.com/action/showPdf?pii=S1473-3099%2820%2930243-7"
},
{
  "Variable": "Illness duration (severe cases) in hospital/ICU until death",
  "Meaning (German)": "Anzahl der Tage im Krankenhaus bis Tod",
  "Our value": "9 days",
  "Estimate in literature": "17.8 days (16.9–19.2) - t_sev_pre_hos",
  "Comments": "",
  "Source": "Verity et al., Lancet, 30 Mar 2020",
  "Link": "https://www.thelancet.com/action/showPdf?pii=S1473-3099%2820%2930243-7"
},
{
  "Variable": "Illness duration mild course",
  "Meaning (German)": "Tage der Krankheitsdauer bei mildem Verlauf",
  "Our value": "7 days",
  "Estimate in literature": "10 days (6-12)",
  "Comments": "Based on how long mild cases in a small study from Germany were infectious. Not sure how reliable this is. (discussed in https://www.sciencenews.org/article/coronavirus-most-contagious-before-during-first-week-symptoms)",
  "Source": "Wölfel et al, Working Paper 2020",
  "Link": "https://www.medrxiv.org/content/10.1101/2020.03.05.20030502v1.full.pdf"
},
{
  "Variable": "Illness duration asymptomatic course",
  "Meaning (German)": "Anzahl der Tage Krankheitsdauer bei asymptomatischem Verlauf",
  "Our value": "6 days",
  "Estimate in literature": "10 days (6-12)",
  "Comments": "Same as above",
  "Source": "",
  "Link": ""
},
{
  "Variable": "Share of hospitalized requiring intensive care",
  "Meaning (German)": "Anteil derjenigen im Krankenhaus, die eine Behandlung auf der Intensivstation benötigen.",
  "Our value": "48%",
  "Estimate in literature": "30%",
  "Comments": "This is the assumption in the Ferguson et al. study. As this is a rough estimate, we choose a higher and thus rather conservative share",
  "Source": "",
  "Link": "https://www.imperial.ac.uk/media/imperial-college/medicine/sph/ide/gida-fellowships/Imperial-College-COVID19-NPI-modelling-16-03-2020.pdf"
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
