var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var open = require('open');
var del = require('del');

var SRC_HTML = './src/**/*.html';
var SRC_CSS = './src/**/*.css';
var SRC_JS = './src/**/*.js';
var SRC_LIB_JS = './bower_components/**/*.min.js';
var SRC_LIB_CSS = './bower_components/**/*.min.css';
var SRC_LIB_CSS_MAP = './bower_components/**/*.min.css.map';
var SRC_LIB_JS_MAP = './bower_components/**/*.min.js.map';
var SRC_IMAGES = './src/images/**/*.png';
var SRC_FONT_EOT = './bower_components/**/dist/**/*.eot';
var SRC_FONT_SVG = './bower_components/**/dist/**/*.svg';
var SRC_FONT_TTF = './bower_components/**/dist/**/*.ttf';
var SRC_FONT_WOFF = './bower_components/**/dist/**/*.woff';
var SRC_FONT_WOFF2 = './bower_components/**/dist/**/*.woff2';

var BUILD = './build';
var BUILD_LIB = BUILD + '/lib';
var BUILD_IMAGES = BUILD + '/images';

var SRC_ALL = [SRC_JS, SRC_CSS, SRC_HTML, SRC_IMAGES, SRC_FONT_EOT,
  SRC_FONT_SVG, SRC_FONT_TTF, SRC_FONT_WOFF, SRC_FONT_WOFF2, SRC_LIB_JS,
  SRC_LIB_CSS, SRC_LIB_JS_MAP, SRC_LIB_CSS_MAP];

gulp.task('clean', function(done) {
  del(BUILD).then(function() {
    return done();
  });
});

gulp.task('build:images', ['clean'], function(done) {
  gulp.src(SRC_IMAGES)
    .pipe(gulp.dest(BUILD_IMAGES))
    .on('end', done);
});

gulp.task('build:lib', ['clean'], function(done) {
  gulp.src([SRC_LIB_JS, SRC_LIB_JS_MAP, SRC_LIB_CSS, SRC_LIB_CSS_MAP, SRC_FONT_TTF, SRC_FONT_SVG, SRC_FONT_WOFF, SRC_FONT_EOT, SRC_FONT_WOFF2])
  .pipe(gulp.dest(BUILD_LIB))
  .on('end', done);
});

gulp.task('build:html', ['clean'], function(done) {
  gulp.src(SRC_HTML)
  .pipe(plugins.htmlhint({'tag-pair': true}))
  .pipe(plugins.htmlhint.reporter('htmlhint-stylish'))
  //.pipe(plugins.htmlhint.failReporter({ suppress: true }))
  //.pipe(plugins.htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest(BUILD))
  .on('end', done);
});

gulp.task('build:css', ['clean'], function(done) {
  gulp.src(SRC_CSS)
  .pipe(gulp.dest(BUILD))
  .on('end', done);
});

gulp.task('build:js', ['clean'], function(done) {
  gulp.src(SRC_JS)
  .pipe(plugins.jshint())
  .pipe(plugins.jshint.reporter('jshint-stylish'))
//  .pipe(plugins.jshint.reporter('fail'))
//.pipe(plugins.uglify())
  .pipe(plugins.concat('app.min.js'))
  .pipe(gulp.dest(BUILD))
  .on('end', done);
});

gulp.task('build', ['build:lib', 'build:html', 'build:css', 'build:js', 'build:images']);

gulp.task('test', ['build'], function() {
  // TODO tests
});

gulp.task('start', ['test'], function() {
  plugins.nodemon({
    watch: './build/',
    script: './index.js',
    delay: 1000

    //nodeArgs: '--debug',
    //tasks: ['test']
  }).on('restart', function() {
    console.log('opening browser...');
    setTimeout(function() {
      //open('http://127.0.0.1:8080/');
    }, 300);
  });
});

gulp.task('watch', ['start'], function() {
  gulp.watch(SRC_ALL, ['test']);
});

gulp.task('default', ['watch']);
