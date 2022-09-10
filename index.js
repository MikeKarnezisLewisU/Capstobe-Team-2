//Capstone Project Server Side Code
const express = require('express')
const app = express()
const path = require('path');
var url = require('url');
const port = process.env.PORT || 8080

//Set view for ejs
app.set('view engine', 'ejs')

//Show the homepage
app.get('/', (request, response) => {
	response.render('index.ejs')
})

// Custom 404 page.
app.use((request, response) => {
    response.type('text/plain')
    response.status(404)
    response.send('404 - Not Found')
  })
  
// Custom 500 page.
app.use((err, request, response, next) => {
    console.error(err.message)
    response.type('text/plain')
    response.status(500)
    response.send('500 - Server Error')
  })
  
//Connect to port 
app.listen(port, () => console.log(
    `Express started at \"http://localhost:${port}\"\n` +
    `press Ctrl-C to terminate.`)
  )