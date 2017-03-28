var gulp           = require('gulp');
var jshint         = require('gulp-jshint');
var uglify         = require('gulp-uglify');
var concat         = require('gulp-concat');
var stylus         = require('gulp-stylus');
var pug            = require('gulp-pug');
var minifyCSS      = require('gulp-csso');
//var autoprefixer   = require('autoprefixer-stylus');
var prefix      = require('gulp-autoprefixer');
var del            = require('del');
var bSync          = require('browser-sync');
var mainBowerFiles = require('main-bower-files');

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('test', function() {
  return gulp.src(['public/javascripts/**/*.js', '!public/plugins/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});


gulp.task('scripts',
  gulp.series('test', function scriptsInternal() {
	  var glob = mainBowerFiles('*.js');
	  glob.push('public/javascripts/**/*.js');
	  return gulp.src(glob)
	      .pipe(concat('main.min.js'))
	      .pipe(uglify())
	      .pipe(gulp.dest('dist/scripts'));
  })
);

gulp.task('html', function() {
  return gulp.src('views/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist/html'))
});

gulp.task('styles', function() {
  return gulp.src('public/stylesheets/styles.styl')
    .pipe(stylus())
    .pipe(minifyCSS())
      //.pipe(autoprefixer())
      .pipe(prefix())
    .pipe(gulp.dest('dist/styles'));
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
