var express = require('express');
var Mailgun = require('mailgun-js')

var router = express.Router();

//Your api key, from Mailgun’s Control Panel
var api_key = 'key-e37b7da04b1d31e31cbc574be0ffae07';
//Your domain, from the Mailgun Control Panel
var domain = 'mail.sunflowergenome.org';
//Your sending email address
var from_who = '"SGD website" <contact@mail.sunflowergenome.org>';
var recipient = 'statonse@protonmail.com';

router.get('/contact', function(req, res, next) {
	 res.render('contact', { title: 'Sunflower Genome Database' });
});

// Send a message to the specified email address when you navigate to /submit/someaddr@email.com
// The index redirects here
router.get('/submit/:mail', function(req, res) {
    //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});

    var data = {
      //Specify email data
    	from: from_who,
      //The email to contact
      to: recipient,
      //Subject and text data
      subject: 'Message from SGD database contact form',
			name: req.params.name,
			contact: req.params.email,
			phone: req.params.phone,
      message: req.params.message
    }

    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            res.render('error', { error : err});
            console.log("got an error: ", err);
        }
        //Else we can greet    and leave
        else {
            //Here "submitted.jade" is the view file for this landing page
            //We pass the variable "email" from the url parameter in an object rendered by Jade
            res.render('submitted', { name : req.params.name });
            console.log(body);
        }
    });

});

module.exports = router;
