import { writable, readable, derived } from 'svelte/store';
import axios from "axios";


export let dataLoaded = writable(false);
export let dataset = writable(undefined);

export const params = writable(undefined);

params.set({
    "policy_period1": "2020-03-21",
    "policy_strength1": 0.2,
    "policy_period2": "2020-03-21",
    "policy_strength2": 1.0,
    "policy_period3": "2020-03-21",
    "policy_strength3": 1.0,
    "policy_period4": "2020-03-21",
    "policy_strength4": 1.0
});

export async function getData(API_ENDPOINT){

  axios.get(API_ENDPOINT)
    .then(function (response) {
      // handle success
      dataset.set(response);
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function (){
      dataLoaded.set(true)
    })
}