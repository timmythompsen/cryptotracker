const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

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

	app.post('/add_coins', (req, res) => {
		User.findById(req.user.id, function (err, user) {
			if(err){
				console.log('error in findById');
			}
		    if(!user){
		    	req.flash('error', 'No account found');
		    	return res.redirect('/');
		    }

		    var coins = req.body.coins;

		    user.coins = coins;

		    user.save(function (err) {
		        if(err) {
		            console.error('ERROR!');
		        }
		     	res.redirect('/');
		    });
		});
	});
};