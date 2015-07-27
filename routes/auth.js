var http = require('http');
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'xfDdk29Fa';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

module.exports = function (passport, LocalStrategy, router) {


	//configure passport authentication
	passport.use(new LocalStrategy(
		function(username, password, done) {
	    // asynchronous verification, for effect...
	    process.nextTick(function () {
	    	var encUsername = encrypt(username),
	    		encPassword = encrypt(password);

	    	var url = 'http://localhost:8080/api/user/fetchuser?username=' + encUsername + '&password='+ encPassword; 
	    	http.get(url, function(response) {
		        // Continuously update stream with data
		        var body = '';
		        response.on('data', function(d) {
		        	body += d;
		        });
		        response.on('end', function() {
		            var jsonData = JSON.parse(body);
		            if(jsonData.data.length == 1){
		            	done(null,jsonData.data);
		            }
		            else{
		            	done(null, false, { message: 'Unknown user '});
		            }
		        });
		    });
	    });
	}
	));


	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	router.post('/login', loginPost);
	function loginPost(req, res, next) {
	  // ask passport to authenticate
	  passport.authenticate('local', function(err, user, info) {  	
	  	if (err) {
	  		return next(err);
	  	}
	  	if (!user) {
	  		return res.redirect('/login_failed');
	  	}
	  	req.logIn(user, function(err) {
	  		if (req.body.remember) {
	  			req.session.cookie.maxAge = 10000 * 60 * 3;
	  		} 
	  		else {
	  			req.session.cookie.expires = false;
	  		}
	  		if (err) {
	  			return next(err);
	  		}
	  		return res.redirect('/');
	  	});

	  })(req, res, next);
	}

	router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	router.get('/api/userdata', function(req, res) {
		if (req.user === undefined) {
			res.json({});
		} else {
			res.json({
				userdata: req.user
			});
		}

	});


};


