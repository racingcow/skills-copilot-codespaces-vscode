// Create web server
// Create database connection
// Create routes
// Start web server
// End

// Import modules
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

// Create web server
var app = express();

// Create database connection
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'reddit'
});

// Create routes
app.get('/hello', function(request, response) {
	response.send('<h1>Hello World!</h1>');
});

app.get('/hello/:name', function(request, response) {
	response.send('<h1>Hello ' + request.params.name + '!</h1>');
});

app.post('/hello', function(request, response) {
	response.send('<h1>You just called the post method at "/hello"!\n</h1>');
});

app.get('/calculator/:operation', function(request, response) {
	var operation = request.params.operation;
	var operationString = '';

	switch(operation) {
		case 'add':
			operationString = '+';
			break;
		case 'sub':
			operationString = '-';
			break;
		case 'mult':
			operationString = '*';
			break;
		case 'div':
			operationString = '/';
			break;
		case 'exp':
			operationString = '**';
			break;
		default:
			response.status(400).send('<h1>Error! Please enter a valid operation!</h1>');
			return;
	}

	var num1 = parseFloat(request.query.num1);
	var num2 = parseFloat(request.query.num2);

	if(isNaN(num1) || isNaN(num2)) {
		response.status(400).send('<h1>Error! Please enter a valid number!</h1>');
		return;
	}

	var result = eval(num1 + operationString + num2);

	response.send('<h1>' + num1 + ' ' + operationString + ' ' + num2 + ' = ' + result + '</h1>');
});

app.get('/posts', function(request, response) {
	connection.query('SELECT * FROM posts', function(err, rows) {
		if(err) {
			console.log(err.toString());
			response.status(500).send('Database error');
			return;
		}

		var html = '<ul>';

		for(var i = 0; i < rows.length; i++) {
			html += '<li><a href="' +