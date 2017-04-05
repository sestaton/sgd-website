var gulp    = require('gulp');
var del     = require('del');
var bSync   = require('browser-sync');
var through = require('through2');

var plugins = require("gulp-load-plugins")({
        pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
        replaceString: /\bgulp[\-.]/
});

var arguments = require('yargs').argv;
var isProd = (arguments.env === 'prod');
var destination  = arguments.outDir ? arguments.outDir : 'dist';

var noop = function() {
  return through.obj();
};

var dev = function(task) {
  return isProd ? noop() : task;
};

var prod = function(task) {
  return isProd ? task : noop();
};

gulp.task('clean', function() {
   return del([destination]);
});

gulp.task('compile-styles', function() {
   return gulp.src('public/stylesheets/*.styl')
       .pipe(dev(plugins.sourcemaps.init()))
       .pipe(plugins.cached('sty-ugly'))
       .pipe(plugins.stylus())
       .pipe(plugins.remember('sty-ugly'))
       .pipe(dev(plugins.sourcemaps.write())) //'.', { sourceRoot: 'css-source' })))
       .pipe(gulp.dest(destination + '/css'));
});

// passthrough not rendering correctly. debug needed 4/5/17
//gulp.task('css', function() {
//   return gulp.src('public/stylesheets/*.styl')
//       .pipe(plugins.stylus())
//       .pipe(gulp.src(plugins.mainBowerFiles('**/*.css'), {passthrough: true}))
//       .pipe(dev(plugins.debug()))
//       .pipe(dev(plugins.sourcemaps.init()))
//    	 .pipe(plugins.autoprefixer())
//       .pipe(plugins.cached('css-ugly'))
//       .pipe(plugins.csso())
//       .pipe(plugins.remember('css-ugly'))
//       .pipe(plugins.concat('main.min.css'))
//       .pipe(dev(plugins.sourcemaps.write())) //'.', { sourceRoot = 'css-source'})))
//    	 .pipe(gulp.dest(destination + '/css'));
//});
gulp.task('css',
   gulp.series('compile-styles', function cssTask() {
	   var cssFiles = [destination + '/css/*.css'];

	   return gulp.src(plugins.mainBowerFiles('**/*.css').concat(cssFiles))
	       //.pipe(plugins.filter('**/*.css'))
	       .pipe(dev(plugins.debug()))
         .pipe(dev(plugins.sourcemaps.init()))
	       .pipe(plugins.autoprefixer())
         .pipe(plugins.cached('css-ugly'))
  	     .pipe(plugins.csso())
         .pipe(plugins.remember('css-ugly'))
         .pipe(plugins.concat('main.min.css'))
         .pipe(dev(plugins.sourcemaps.write())) //'.', { sourceRoot = 'css-source'})))
	       .pipe(gulp.dest(destination + '/css'));

   })
);

gulp.task('fonts-fa-bs', function() {
   var fontFiles = ['bower_components/font-awesome/fonts/*', 'bower_components/bootstrap/fonts/*'];

   return gulp.src(fontFiles)
       .pipe(plugins.copy(destination + '/fonts', { prefix: 3 }))
       .pipe(gulp.dest(destination + '/fonts'));
});

gulp.task('fonts-fs', function() {
   var fontFiles = ['bower_components/flexslider/fonts/*'];

   return gulp.src(fontFiles)
       .pipe(plugins.copy(destination + '/css/fonts', { prefix: 3 }))
       .pipe(gulp.dest(destination + '/css/fonts'));
});

gulp.task('fonts', gulp.parallel('fonts-fa-bs', 'fonts-fs'));

gulp.task('test', function() {
   return gulp.src(['public/javascripts/**/*.js', '!public/javascripts/mail.js', '!public/plugins/**/*.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('scripts',
   gulp.series('test', function scriptsTask() {
      var jsFiles = ['public/javascripts/back-to-top.js', 'public/javascripts/main.js',
        'public/javascripts/sgd_ga.js', 'bower_components/jflickrfeed/jflickrfeed.js'];

      return gulp.src(plugins.mainBowerFiles('**/*.js').concat(jsFiles))
	       .pipe(dev(plugins.debug()))
         .pipe(dev(plugins.sourcemaps.init()))
         .pipe(plugins.cached('js-ugly'))
	       .pipe(plugins.uglify())
         .pipe(plugins.remember('js-ugly'))
         .pipe(plugins.concat('main.min.js'))
         .pipe(dev(plugins.sourcemaps.write())) //'.', { sourceRoot = 'js-source'})))
	       .pipe(gulp.dest(destination + '/js'));
   })
);

//gulp.task('scripts-contact',
//   gulp.series('test', function scriptsTask() {
//      var jsFiles = ['public/javascripts/map.js', 'public/javascripts/mail.js'];
//
//      return gulp.src(plugins.mainBowerFiles('**/*.js').concat(jsFiles))
//         //.pipe(plugins.filter('**/*.js'))
//	       .pipe(dev(plugins.debug()))
//         .pipe(dev(plugins.sourcemaps.init()))
//         .pipe(plugins.cached('js-ugly'))
//	       .pipe(plugins.uglify())
//         .pipe(plugins.remember('js-ugly'))
//         .pipe(plugins.concat('contact.min.js'))
//         .pipe(dev(plugins.sourcemaps.write())) //'.', { sourceRoot = 'js-source'})))
//	       .pipe(gulp.dest(destination + '/js'));
//   })
//);

gulp.task('html', function() {
   return gulp.src('views/**/*.pug')
       .pipe(plugins.pug({ doctype: 'html', pretty: false }))
       .pipe(gulp.dest(destination + '/html'))
});

gulp.task('images', function() {
   return gulp.src('public/images/**/*')
       .pipe(plugins.imagemin())
       .pipe(gulp.dest(destination + '/images'))
});

// the browser-sync recipe below is modified for gulp v4 from:
// https://github.com/sogko/gulp-recipes/tree/master/browser-sync-nodemon-expressjs
gulp.task('nodemon', function (cb) {
   var started = false;

   return plugins.nodemon({
	script: './bin/www'
	    }).on('start', function () {
            // ensure start only got called once
	    if (!started) {
		cb();
		started = true;
	    }
   });
});

gulp.task('browser-sync',
   gulp.series('nodemon', function nodemonTask(done) {
     if(!isProd) {
       return bSync.init(null, {
	        proxy: 'http://localhost:3000',
	        files: [destination + '/**/*.*'],
	        browser: 'google chrome',
	        port: 4000,
       });
    }
    done();
   })
);
//browser-sync

gulp.task('default',
   gulp.series('clean', gulp.parallel('html', 'css', 'images', 'scripts', 'fonts'), 'browser-sync',
        function watcher(done) {
          if(!isProd) {
            gulp.watch('views/**/*.pug', gulp.parallel('html'));
            gulp.watch('public/javascripts/**/*.js', gulp.parallel('scripts'));
            gulp.watch('public/stylesheets/**/*.styl', gulp.parallel('css'));
            gulp.watch(destination + '/**/*', bSync.reload);
          }
        done();
   })
);
