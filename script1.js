const fs = require('fs')
fs.writeFileSync('./.env', `API_URL=${process.env.API_URL}\nAPI_KEY=${process.env.API_KEY}\n`)