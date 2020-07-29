[![SGD website](public/images/logo.png)](https://sunflowergenome.org)

## About

This is the code for the [sunflower genome website](https://sunflowergenome.org) that I developed
and maintained from 2016-2020. This is now being maintained by the [Rieseberg lab](https://github.com/rieseberglab) at UBC, so please
contact them concerning the current live website, but feel free to contact me about this code.

## Install

Download the package:

    git clone https://github.com/sestaton/sgd-website.git
    cd sgd-website

Install the server dependencies:

    npm i -g gulp-cli bower nodemon forever
    npm install

Install the browser dependencies:

    bower install

## In production with Node server

First, you need to compile the assets and run some tests:
  
    gulp --env prod --outDir dist

Then, start the server:

    npm start

## In production with Apache/Nginx (or any server other than Node.js)

For complicated sites with numerous apps it can be easier to compile a static version of the main site and let Apache or Nginx handle the traffic, as well as routing for the other apps that are running. This has the added benefit of using the security and support of these other communities. 

The command below will build a static site in the 'sgd-static' directory:

    bash prepare-static.sh /data/raid5part4/rushmore_rieseberg1/sgd-website-data/

The argument to the script is the location of the data for the downloads (nothing will be touched, but the location has to be known to handle the links properly). The above is just an example from an old iteration of this site, so use whatever is appropriate on your machine.

The above script will prepare the site to be used in place. If you wish to move the document root you will need to run one more command to convert absolute links to relative links.

    perl fixlns.pl -i sgd-static

You should then be able to move that directory to some place of your choosing and point your `http.conf` document root to it. That's it, other than configuring access and other applications, which I won't document here since it is rather specific.

## Service configuration

In production, there are a number of ENV vars relating to API keys that have to be set and I'll explain these here. For the email service (contact form), I used a service provider called [mailgun](https://www.mailgun.com/). You will need to register an account and set the following ENV vars for the service to work as expected:

    MAILGUN_API_KEY     # Your API key
    MAILGUN_API_DOMAIN  # Your domain
    RECIPIENT_EMAIL     # Who is getting the mail, i.e., you the developer

If you don't want to set these then the mail form won't work, which is no big deal. See below about the importance of not hard-coding these values. For any person or bots reading this there are no valid keys anywhere in the code or history!

The above is what would be considered a back-end service that can set the rate and location of usage, so these must be kept private. Other servies used here are [Google Analytics](https://analytics.google.com/analytics/web/) (used in [sgd_ga.js](public/javascripts/sgd_ga.js)) and the [Google Maps API](https://developers.google.com/maps/documentation/javascript/get-api-key) (used in [contact.pug](views/contact.pug)).

These front-end services display your tokens in the HTML so anyone can see them. That's okay because they limit the rate and usage of the service by the domain, IP address, and account so it is useless to anyone else. These are also free services and for these reasons it does not make much sense to hid these tokens from your code because they will be displayed anyway. Change them as appropriate so they can be managed properly and use variables for these as well if you prefer.

## For development

You can compile the assets, run the tests, start a development server, and open a browser with one command:

    gulp

That command will also watch all the assets, and if any files change, it will re-run the tests and reload the browser. This process can be overly complicated if you just want to view the site on a development server. 

In most cases, it is easier to just use `nodemon` to watch for changes, which allows you to skip all the `gulp` stuff. The following command will start the server and log the port that is open to the console.

    npm start

The web fonts and browser dependencies are all on github and handled by the build process to avoid issues with library versions. If you have issues with these libraries or specific problems on certain browsers or platforms (e.g., mobile devices), you may want to update these dependencies:

    bower install

Be sure to test these changes to make sure everything is working, and also update the changes in the package files (bower.json and package.json) and lockfile before pushing any updates to github.

## Development advice

- Do your changes in a separate branch so as to not break the main website code. That allows mulitple people to work on the site, and still keep a working copy. After testing that your changes look good, you can then push them to the remote and then pull them on the host machine to make an update.

- DO NOT commit API keys. These will get picked up by bots that scan everything on Github and soon enough you will find out your accounts are being abused (this is true mainly for services like e-mail, not as important for the google tokens which are tied to an account and domain).

# License/Author

MIT @ [Evan Staton](https://evanstaton.com)