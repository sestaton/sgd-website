(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      
ga('create', 'UA-82384679-1', 'auto');
ga('send', 'pageview');

//http://netnix.org/2014/04/27/tracking-downloads-with-google-analytics/
window.onload = function() {
  var a = document.getElementsByTagName('a');
  for (i = 0; i < a.length; i++) {
    if (a[i].hostname === location.hostname) {
	if (a[i].href.match(/^https?:\/\/.+.(gz|bz2|md5|ppt|pptx)$/i)) {
	    (function(url) {
		a[i].onclick = function() {
		    ga('send', 'event', 'Downloads', 'Click', this.getAttribute('href'), {
			'hitCallback': function() {
			    document.location = url;
			}
		    });
		    return false;
		};
            })(a[i].href);   
	}
    }
  }
}
