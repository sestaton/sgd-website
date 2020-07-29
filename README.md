[![SGD website](public/images/logo.png)](https://sunflowergenome.org)

## About

This is the code for the [sunflower genome website](https://sunflowergenome.org) that I developed
and maintained from 2016-2020. This is now being maintained by the Rieseberg lab at UBC, so please
contact them concerning the current live website, but feel free to contact me about this code or projects.

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

There are a number of ENV vars relating to API keys that have to be set, but I'll document that later.

## In production with Apache server

This will build a static site in the 'sgd-static' directory:

    bash prepare-static.sh /data/raid5part4/rushmore_rieseberg1/sgd-website-data/

The argument to the script is the location of the data for the downloads (nothing will be touched, but the location has to be known to handle the links properly). The above is just an example from an old iteration of this site, so use whatever is appropriate on your machine.

The above script will prepare the site to be used in place. If you wish to move the document root you will need to run one more command to convert absolute links to relative links.

    perl fixlns.pl -i sgd-static

You should then be able to move that directory to some place of your choosing and point your `http.conf` document root to it. That's it, other than configuring access and other applications, which I won't document here since it is rather specific.

## For development

You can compile the assets, run the tests, start a development server, and open a browser with one command:

    gulp

That command will also watch all the assets, and if any files change, it will re-run the tests and reload the browser. This process can be overly complicated if you just want to view the site on a development server. 

In most cases, it is easier to just use `nodemon` to watch for changes, which allows you to skip all the `gulp` stuff. The following command will start the server and log the port that is open to the console.

    npm start

The web fonts and browser dependencies are all on github and handled by the build process to avoid issues with library versions. If you have issues with these libraries or specific problems on certain browsers or platforms (e.g., mobile devices), you may want to update these dependencies:

    bower install

Be sure to test these changes to make sure everything is working, and also update the changes in the package files (bower.json and package.json) and lockfile before pushing any updates to github.

# License/Author

MIT @ Evan Staton