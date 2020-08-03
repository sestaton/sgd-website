// code layout for jslint, based on:
// http://code.stephenmorley.org/javascript/understanding-the-google-analytics-tracking-code/
(function(){
  // store the name of the Analytics object
  window.GoogleAnalyticsObject = 'ga';

  // check whether the Analytics object is defined
  if (!('ga' in window)){

    // define the Analytics object
    window.ga = function(){

      // add the tasks to the queue
      window.ga.q.push(arguments);
    };

    // create the queue
    window.ga.q = [];
  }

  // store the current timestamp
  window.ga.l = (new Date()).getTime();

  // create a new script element
  var script   = document.createElement('script');
  script.src   = 'https://www.google-analytics.com/analytics.js';
  script.async = true;

  // insert the script element into the document
  var firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(script, firstScript);
})();

ga('create', GA_API_KEY, 'auto');
ga('send', 'pageview');

// the below is modified for jslint, based on:
// http://netnix.org/2014/04/27/tracking-downloads-with-google-analytics/
var getDownloadEvent = function(url) {
    a[i].onclick = function() {
        ga('send', 'event', 'Downloads', 'Click', this.getAttribute('href'), {
		'hitCallback': function() {
		    document.location = url;
                }
	    });
        return false;
    };
};

window.onload = function() {
  var a = document.getElementsByTagName('a');
  for (i = 0; i < a.length; i++) {
     if (a[i].hostname === location.hostname) {
         if (a[i].href.match(/^https?:\/\/.+.(gz|bz2|md5|ppt|pptx)$/i)) {
	    (getDownloadEvent(url))(a[i].href);
         }
      }
   }
};
