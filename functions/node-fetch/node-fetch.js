const fetch = require('node-fetch')

let policy_period1 = "2020-03-21";
let policy_strength1 = 1.0;

let baseURL = `https://f2kayjqpni.execute-api.eu-central-1.amazonaws.com/dev/simulate?policy_period1=${policy_period1}&policy_strength1=${policy_strength1}`;

console.log(baseURL);

exports.handler = async (event, context) => {
  return fetch(baseURL, { headers: { "Accept": "application/json" } })
    .then(function(response) {
      return response.json()
    })
    .then(function(data){
      // console.log(data)
      return {
          statusCode: 200,
          body: data
        }
    })
    .catch(error => ({ statusCode: 422, body: String(error) }));
};






