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

## In production

First, you need to install the browser dependencies and compile the assets:
  
    gulp --env prod --outDir dist

Then, start the server:

    npm serve

There are a number of ENV vars relating to API keys that have to be set, but I'll document that later.

## For development

You can compile the assets, start a development server, and open a browser with one command:

    gulp

That will also watch all the assets and reload the browser when any files have changed. This process can be overly complicated if you just want to view the site on a development server. In most cases, it is easier to just use `nodemon` to open a DEV port and watch for changes, which allows you to skip all the gulp stuff.

    npm start

# Author

Evan Staton