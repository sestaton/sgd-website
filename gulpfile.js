var gulp  = require('gulp');
var del   = require('del');
var bSync = require('browser-sync');

var plugins = require("gulp-load-plugins")({
        pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
        replaceString: /\bgulp[\-.]/
});

var dest = 'dist/';

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('compile-styles', function() {
   return gulp.src('public/stylesheets/*.styl')
       .pipe(plugins.sourcemaps.init())
       .pipe(plugins.stylus())
       .pipe(plugins.sourcemaps.write())
       .pipe(gulp.dest('dist/css'));
});

gulp.task('css',
   gulp.series('compile-styles', function cssTask() {
	   var cssFiles = ['dist/css/*.css'];

	   return gulp.src(plugins.mainBowerFiles().concat(cssFiles))
	       .pipe(plugins.filter('**/*.css'))
	       .pipe(plugins.debug())
	       .pipe(plugins.concat('main.min.css'))
	       .pipe(plugins.autoprefixer())
	       .pipe(plugins.csso())
	       .pipe(gulp.dest('dist/css'));
	   
   })
);

gulp.task('fonts-fa-bs', function() {
   var fontFiles = ['bower_components/font-awesome/fonts/*', 'bower_components/bootstrap/fonts/*'];

   return gulp.src(fontFiles)
       .pipe(plugins.copy('dist/fonts', { prefix: 3 }))
       .pipe(gulp.dest('dist/fonts'));
});

gulp.task('fonts-fs', function() {
   var fontFiles = ['bower_components/flexslider/fonts/*'];

   return gulp.src(fontFiles)
       .pipe(plugins.copy('dist/css/fonts', { prefix: 3 }))
       .pipe(gulp.dest('dist/css/fonts'));
});

gulp.task('test', function() {
   return gulp.src(['public/javascripts/**/*.js', '!public/plugins/**/*.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('scripts', 
   gulp.series('test', function scriptsTask() {
      var jsFiles = ['public/javascripts/*.js', 'bower_components/jflickrfeed/jflickrfeed.js'];

      return gulp.src(plugins.mainBowerFiles().concat(jsFiles))
	  .pipe(plugins.filter('**/*.js'))
	  .pipe(plugins.debug())
	  .pipe(plugins.concat('main.min.js'))
	  .pipe(plugins.uglify())
	  .pipe(gulp.dest('dist/js'));
   })
);

gulp.task('html', function() {
   return gulp.src('views/**/*.pug')
       .pipe(plugins.pug({ doctype: 'html', pretty: false }))
       .pipe(gulp.dest('dist/html'))
});

gulp.task('images', function() {
   return gulp.src('public/images/**/*')
       .pipe(plugins.imagemin())
       .pipe(gulp.dest('dist/images'))
});

//gulp.task('styles', function() {
//   var styleFiles = ['public/stylesheets/styles.styl'];
//
//   return gulp.src(plugins.mainBowerFiles())
//       .pipe(plugins.filter('**/*.css'))
//       .pipe(plugins.stylus(styleFiles))
//       .pipe(plugins.concat('main.min.css'))
//       .pipe(plugins.autoprefixer())
//       .pipe(plugins.csso())
//       .pipe(gulp.dest('dist/css'));
//});

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
      return bSync.init(null, {
	       proxy: "http://localhost:3000",
	       files: ["dist/**/*.*"],
	       browser: "google chrome",
	       port: 4000,
      });
      done();
   })
);
//browser-sync 

gulp.task('default', 
   gulp.series('clean', gulp.parallel('html', 'css', 'images', 'scripts', 'fonts-fa-bs', 'fonts-fs'), 'browser-sync',
      function watcher(done) {
          gulp.watch('views/**/*.pug', gulp.parallel('html'));
          gulp.watch('public/javascripts/**/*.js', gulp.parallel('scripts'));
          gulp.watch('public/stylesheets/**/*.styl', gulp.parallel('css'));
          gulp.watch('dist/**/*', bSync.reload);
          done();
   })
);
