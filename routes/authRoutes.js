const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bodyParser = require('body-parser');

module.exports = (app) => {
	app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email']
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'),
		(req, res) => {
			res.redirect('/');
		});

	app.get('/api/logout', (req, res) =>{
		req.logout();
		//res.send(req.user);
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});

	app.get('/api/my_coins', (req, res) => {
		res.send(req.user);
	});

	app.post('/api/add_coins', (req, res) => {
		console.log('add coins route good');
		console.log(req);
		User.update({
			googleId: req.body.googleId
		}, {
			coins: req.body.coins
		}, function(err, result){
			if(err){
				console.log(err);
			}else{
				console.log('post', result);
			}
		});

		res.send('testing');
	});
	
};