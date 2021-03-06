## Intro

A quick visualization for a corona impact analysis. 

A continous live demo can be found here: [https://covid19-scenarios.netlify.com/](https://covid19-scenarios.netlify.com/)

The App uses the framework [Svelte.js](http://svelte.dev/). You will find the JavaScript code in the ***src*** folder. The data can be found in the ***public*** folder. If you just need to make changes to the data or add new ***PDFs*** to the ***public/pdf folder***, you will not have to install anything. Simply update the folder on your server and repository. 

## Setup / Installation

If you want to make changes to the code, you need to have Node.js installed on you machine. We recommend to install Node with NVM, which is a Node Version Manager: https://github.com/creationix/nvm

Before development, you will need to clone this repository to your target directory:
```bash 
git clone https://github.com/alsino/corona-impact-analysis.git
```

Open your terminal and navigate to the repository: 
```bash
cd Path_To_Target_Directory
```

Then install the necessary JavaScript dependencies with: 
```bash
npm install
```

## Data access

If you want to run the app locally, you will have to request access to the API_ENDPOINT and the API_KEY from us and add them to a .env file in the root directory, i.e. 
```
API_URL='API_URL'
API_KEY='MY_API_KEY'
```


## Development
Open your terminal and navigate to the repository. Then run the following command in your terminal:
```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in the `src` folder, then save it. The page will automatically reload and you should see your changes.

If you want to have a live preview of your app on the web, you can connect your repository to [Netlify](https://www.netlify.com/). Once this is done, the website will update each time you make changes to your repository.


##  Troubleshooting
If the dev server fails, you might need to re-install the sirv cli again:
```bash
npm install --save sirv-cli
```

## Deploying to the web
When you are ready to deploy the app, you will need to run the following command to ***build*** it
```bash
npm run build
```
Then copy the content of the ***public*** folder to the location where you want you website to be on your server.


## Libraries in use

* Charts: http://c3js.org/

## Some practical links 
* Set up SASS for Svelte: https://daveceddia.com/svelte-with-sass-in-vscode/
