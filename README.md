sgd-website
===========
sunflower genome database website (https://sunflowergenome.org/)

**Install**

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

There are a number of ENV vars relating to API keys that have to be set, but I'll document that later.

## In production with Apache server

This will build a static site in the 'sgd-static' directory:

    bash prepare-static.sh

That will prepare the site to be used in place. If you wish to move the document root you will need to run one more command to convert absolute links to relative links.

    perl fixlns.pl -i sgd-static

You should then be able to move that directory to some place of your choosing and point your `http.conf` document root to it. That's it, other than configuring access and other applications, which I won't document here since it is rather specific.

## For development

You can compile the assets, run the tests, start a development server, and open a browser with one command:

    gulp

That command will also watch all the assets, and if any files change, it will re-run the tests and reload the browser. This process can be overly complicated if you just want to view the site on a development server. 

In most cases, it is easier to just use `nodemon` to watch for changes, which allows you to skip all the `gulp` stuff. The following command will start the server and log the port that is open to the console.

    npm start

# License/Author

MIT @ Evan Staton