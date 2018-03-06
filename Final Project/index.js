const express = require('express')
const app = express()
app.use(express.static('src'))
app.listen(3000, () => console.log('Serving "src" directory at http://localhost:3000.'))

