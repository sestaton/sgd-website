sgd-website
===========
sunflower genome database website

**Install**

Download the package:

```bash
git clone https://github.com/sestaton/sgd-website.git
cd sgd-website
```

Install the deps:

    ```bash
    npm i -g gulp bower
    npm install
    ```

## In production

First, compile the assets:
  
    ```bash
    gulp --env prod --outDir dist
    ```

Then, start the server:

    ```bash
    npm serve
    ```

There are a number of ENV vars relating to API keys that have to be set, but I'll document that later.

## For development

You can compile the assets, start a development server, and open a browser with one command:

    ```bash
    gulp
    ```

That will also watch all the assets and reload the browser when any files have changed. This process can be overly complicated if you just want to view the site on a development server. In most cases, it is easier to just use `nodemon` to open a DEV port and watch for changes, which allows you to skip all the gulp stuff.

    ```bash
    npm start
    ```

# Author

Evan Staton