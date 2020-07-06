const express   = require('express');
const Mailgun   = require('mailgun-js');
const Recaptcha = require('node-recaptcha2').Recaptcha;

const router = express.Router();

//Your api key, from Mailgun’s Control Panel
const mg_api_key = process.env.MG_KEY;
//Your domain, from the Mailgun Control Panel
const domain = 'mail.sunflowergenome.org';
//Your sending email address
const from_who = '"SGD website" <contact@mail.sunflowergenome.org>';
const recipient = 'statonse@protonmail.com';

const PUBLIC_KEY  = process.env.GRA_KEY_PUB,
    PRIVATE_KEY = process.env.GRA_KEY_PRIV;

router.get('/contact', function(req, res, next) {
	var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);

	 res.render('contact', { title: 'Sunflower Genome Database',
	 	layout: false,
		locals: { recaptcha_form: recaptcha.toHTML() }
	 });
});

router.post('/', function(req, res) {
    var data = {
        remoteip:  req.connection.remoteAddress,
        response:  req.body['g-recaptcha-response']
    };
    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY, data);

    recaptcha.verify(function(success, error_code) {
        if (success) {
            res.send('Recaptcha response valid.');
        }
        else {
            // Redisplay the form.
            res.render('error', {
                layout: false,
                locals: {
                    recaptcha_form: recaptcha.toHTML()
                }
            });
        }
    });
});

// Send a message to the specified email address when you navigate to /submit/someaddr@email.com
// The index redirects here
router.get('/submit/', function(req, res) {
    //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
    var mailgun = new Mailgun({apiKey: mg_api_key, domain: domain});

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
