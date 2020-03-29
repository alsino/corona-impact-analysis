import { writable, readable, derived } from 'svelte/store';
import axios from "axios";

export const id = writable(undefined);

export const dataLoaded = writable(false);
export const dataset = writable(undefined);



// export const subjectVal = writable('s1');
// export const subjects = readable([
//    {name: "Demografie",value: 's1', icon: 'icon-users'},
//    {name: "Beschäftigung",value: 's2', icon: 'icon-cog'},
//    {name: "Soziales",value: 's3', icon: 'icon-attitude'},
//    {name: "Flächennutzung",value: 's4', icon: 'icon-layers'}
// ]);

// export const colors = readable({
//    umland: "#d0e6a0",
//    kerne: "#ffa32b",
//    "Stadtregion": "#d31517",
//    "Deutschland": "#000000",
//    "StadtRegionen Gesamt": "#000000",
//    "Kernstadt": "#818181",
//    "Umland": "#B3B3B3",
//    "Umland ohne Kernstädte":"#B3B3B3"
// });



// Promise.all([
//   csv('./data/demografie.csv'),
//   csv('./data/beschaeftigte.csv'),
//   csv('./data/soziales.csv'),
//   csv('./data/flaechennutzung.csv')
// ])
// .then(([demografie, beschaeftigte, soziales, flaechennutzung]) =>  {

// 	// setTimeout(()=>{
// 	datasets.set({
// 		"s1": demografie,
// 		"s2": beschaeftigte,
// 		"s3": soziales,
// 		"s4": flaechennutzung
// 	});
// 	dataLoaded.set(true)
// 	// },2000)
// });