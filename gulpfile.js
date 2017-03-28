var gulp           = require('gulp');
var del            = require('del');
var bSync          = require('browser-sync');

var plugins = require("gulp-load-plugins")({
        pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
        replaceString: /\bgulp[\-.]/
});

gulp.task('clean', function() {
  return del(['dist']);
});


var dest = 'dist/';

gulp.task('css', function() {
   var cssFiles = ['public/stylesheets/*css'];
	
   return gulp.src(plugins.mainBowerFiles().concat(cssFiles))
       .pipe(plugins.filter('**/*.css'))
       .pipe(plugins.concat('main.css'))
       .pipe(plugins.csso())
       .pipe(gulp.dest('dist/css'));
   
});

gulp.task('test', function() {
   return gulp.src(['public/javascripts/**/*.js', '!public/plugins/**/*.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('scripts', 
   gulp.series('test', function scriptsTask() {
      var jsFiles = ['public/javascripts/*.js'];

      return gulp.src(plugins.mainBowerFiles().concat(jsFiles))
	  .pipe(plugins.filter('**/*.js'))
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

gulp.task('styles', function() {
	var styleFiles = ['public/stylesheets/styles.styl'];

        return gulp.src(plugins.mainBowerFiles())
	    .pipe(plugins.filter('**/*.css'))
	    .pipe(plugins.stylus(styleFiles))
	    .pipe(plugins.concat('main.min.css'))
	    .pipe(plugins.autoprefixer())
	    .pipe(plugins.csso())
	    .pipe(gulp.dest('dist/css'));
});

gulp.task('server', function(done) {
     bSync({
          server: {
               baseDir: ['dist', 'app']
          }
     })
     done();
})

gulp.task('default', gulp.series('clean', gulp.parallel('html', 'styles', 'scripts'), 'server',
     function watcher(done) {
          gulp.watch('views/**/*.pug', gulp.parallel('html'));
          gulp.watch('public/javascripts/**/*.js', gulp.parallel('scripts'));
          gulp.watch('public/stylesheets/**/*.styl', gulp.parallel('styles'));
          gulp.watch('dist/**/*', bSync.reload);
          done();
     })
);
