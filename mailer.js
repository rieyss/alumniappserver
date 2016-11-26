var express = require('express');
var nodemailer = require('nodemailer');
var random = require('randomstring');
var router = express.Router();

var memberSchema = require('./memberschema');

router.post('/', function(req, res, next){
	console.log("APi hit at mailer");

	var transporter = nodemailer.createTransport({
		service : 'Gmail',

		 auth: {
            user: 'ashishsurana12345@gmail.com', // Your email id
            pass: 'password' // Your password
        }
	});


	var string = "Hello from Alumni App Admin " + '\n' + "Here is your new password ";
	var email = req.query.email;

	memberSchema.findOne({email : email}, {}, function(err, fetchedValue){
		if (fetchedValue==null) {
			console.log("user not found");
			
			res.json("user not found");	
		}
		else {
			console.log("user  found");	
		
			console.log(fetchedValue);

			var newPassword = random.generate({
				length : 7,
				charset : 'alphabetic'
			});
			console.log(newPassword);

			fetchedValue.password = newPassword;
			fetchedValue.save(function(err, post){
				if (err) {return next(err)}
				else{
					console.log("password chnaged");
					// res.json("Password Changed").end();

					string  += newPassword;




					var mailOptions = {
						from : 'ashishsurana12345@gmail.com',
						to : req.query.email,
						subject : 'Password Reset - Alumni App',
						// text : string,
						// attachments : [{
						// 	filename : 'Resume.pdf',
						// 	path : '/var/www/html/ashishsurana.github.io/Resume.pdf',
						// 	contentType: 'application/pdf' 
						// }
						// ]
						html : string
					};

					sendMail(mailOptions);


				}
			});

			
		}
	});

	

	function sendMail(mailOptions){
		transporter.sendMail(mailOptions, function(error, info){
		 if(error){
        console.log(error);
        res.json("Resetting password Failed ! Retry");
   		}else{
        console.log('Message sent: ' + info.response);
        res.json("Check Mail for password");
    	}
	});

	}


});

module.exports = router;
