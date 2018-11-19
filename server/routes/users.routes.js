'use strict';

module.exports = function(app) {

	const bodyParser = require('body-parser');
	const LocalStorage = require('node-localstorage').LocalStorage;
	var localStorage = new LocalStorage('./scratch');
	const token = 'random-token';

	// support parsing of application/json type post data
	app.use('/users', bodyParser.json());

	//support parsing of application/x-www-form-urlencoded post data
	app.use('/users', bodyParser.urlencoded({ extended: true }));

	//authentication
	app.use('/users', function (req, res, next) {
		if (req.headers['authorization'] === 'Bearer'+ ' '+ token || req.path === '/register' || req.path === '/authenticate') {
			req.users = JSON.parse(localStorage.getItem('users')) || [];
			next();
		} else {
			// return 401 not authorised if token is null or invalid
			res.status(401).send({ message: 'Unauthorised' } );
		}
	})

	//log in
	app.post('/users/authenticate', function (req, res) {
		var users = req.users;
		var filteredUsers = users.filter(user => {
			return user.username === req.body.username && user.password === req.body.password;
		});

		if (filteredUsers.length) {
			// if login details are valid return 200 OK with user details and random-token
			var user = filteredUsers[0];
			var body = {
				id: user.id,
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				token: token
			};

			res.status(200).send({ body: body });
		} else {
			// else return 400 bad request
			res.status(400).send({message: 'Username or password is incorrect' });
		}
	})

	//register the user
	app.post('/users/register',  function (req, res) {
	    var newUser = req.body;
		var users = req.users;
		if (newUser && newUser.username != null && newUser.password != null){
			// validation
			var duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
			if (duplicateUser) {
				res.status(401).send({ message: 'Username "' + newUser.username + '" is already taken' } );
			}
			else {
				// save new user
				newUser.id = users.length + 1;
				users.push(newUser);
				localStorage.setItem('users', JSON.stringify(users));

				// respond 200 OK
				res.status(200).send();
			}
		}
		else{
			res.status(401).send({ message: 'User:"' + newUser.username + '" is invalid' });
		}
	})

	//get user list
	app.get('/users', function (req, res) {
		var users = req.users;
		res.status(200).send({ body: users });
	})

	// get the user by id
	app.get('/users/:userId', function (req, res) {
		var users = req.users;
		var id = req.params.id
		for (var i = 0; i < users.length; i++) {
			var user = users[i];
			if (user.id === id) {
				// respond 200 OK
				res.status(200).send({ body: user });
			}
		}
		res.status(401).send({ message: 'invalid user id' });

	})

	// update the user by id
	app.put('/users/:userId', function (req, res) {
		var newUser = req.body;
		var id = req.params.id
		var users = req.users;
		for (var i = 0; i < users.length; i++) {
			var user = users[i];
			if (user.id === id) {
				users.splice(i, 1);
				newUser.id = users.length + 1;
				users.push(newUser);
				localStorage.setItem('users', JSON.stringify(users));
				// respond 200 OK
				res.status(200).send();
			}
		}
		res.status(401).send({ message: 'invalid user id' } );

	})

	// delete the user by id
	app.delete('/users/:userId', function (req, res) {
		var id = parseInt(req.params.userId);
		var users = req.users;
		for (var i = 0; i < users.length; i++) {
			var user = users[i];
			if (parseInt(user.id) === id) {
				// delete user
				users.splice(i, 1);
				localStorage.setItem('users', JSON.stringify(users));
				break;
			}
		}
		// respond 200 OK
		res.status(200).send();

	})

};