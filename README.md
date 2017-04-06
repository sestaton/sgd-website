sgd-website
===========
sunflower genome database website

**Install**

Download the package:

    git clone https://github.com/sestaton/sgd-website.git
    cd sgd-website

Install the server dependencies:

    npm i -g gulp bower
    npm install

Install the browser dependencies:

    bower install

## In production

First, you need to compile the assets and run some tests:
  
    gulp --env prod --outDir dist

Then, start the server:

    npm serve

There are a number of ENV vars relating to API keys that have to be set, but I'll document that later.

## For development

You can compile the assets, run the tests, start a development server, and open a browser with one command:

    gulp

That command will also watch all the assets, and if any files change, it will re-run the tests and reload the browser. This process can be overly complicated if you just want to view the site on a development server. In most cases, it is easier to just use `nodemon` to open a DEV port and watch for changes, which allows you to skip all the gulp stuff. The following command will start the server and log the port that is open to the console.

    npm start

# Author

Evan Staton