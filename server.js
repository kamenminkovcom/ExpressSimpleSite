let http = require('http')
let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let controllers = require('./controllers')
const port = 1111

app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json({ type: 'application/*+json'}))
// app.use(bodyParser.text({ type: 'text/html' }))


controllers.init(app)

http.createServer(app).listen(port, () => {
    console.log(`Server is listening on port ${port}.`)
})
