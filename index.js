var app = require('express')();
var cors = require('cors');
app.use(cors());
var port = process.env.PORT || 3000;

// const Sequelize = require('sequelize');
// const database = require('./database');

bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

var routes = require('./api/userListRoutes')
routes(app)


app.listen(port, function() {
	console.log('Starting node.js on port ' + port);
});