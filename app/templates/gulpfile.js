var
_ = require('lodash'),
path = require('path'),
bowerFiles = require('main-bower-files'),
gulp = require('gulp'),
sass = require('gulp-sass'),
clean = require('gulp-clean'),
rename = require('gulp-rename'),
inject = require('gulp-inject'),
concat = require("gulp-concat"),
uglify = require("gulp-uglify"),
livereload = require('gulp-livereload'),
replace = require('gulp-replace-task'),
ngHtml2Js = require("gulp-ng-html2js"),
ngAnnotate = require('gulp-ng-annotate'),
minifyHtml = require('gulp-minify-html'),
minifyCss = require('gulp-minify-css'),
angularFilesort = require('gulp-angular-filesort'),
objectDot = require('./common/components/object-dot'),
embedlr = require("gulp-embedlr"),
config = require('./config');

var
watching = false,
liveReloadPort = process.env.LIVERELOAD_PORT || 33733,
pathRoot  = __dirname,
pathSrc   = path.join(pathRoot, 'src'),
pathBuild = path.join(pathRoot, 'build'),
fileTpl   = 'app.tpl.js',
fileCore  = 'app.js';

gulp.task('inject-app-scss', function () {
  var
  srcFile = path.join(pathSrc, 'app.scss'),
  files   = gulp.src([
    path.join(pathSrc, '**/*.scss'),
    '!' + srcFile
  ], { read: false });

  return gulp.src(srcFile)
    .pipe(inject(files, {
      transform: function(filePath, file, i, length) {
        filePath = filePath.replace('/src/', './');
        return '@import \'' + filePath + '\';';
      },
      starttag: '// injector',
      endtag: '// endinjector'
    }))
    .pipe(gulp.dest(pathSrc)); // overwrites source file
});

gulp.task('inject-app-html', function () {
  var
  p = gulp.src(path.join(pathSrc, 'index.html'))
  .pipe(inject(gulp.src(bowerFiles(), { read: false, base: 'bower_components' }), {
    name: 'bower',
    addRootSlash: false
  }))
  .pipe(inject(gulp.src([
    path.join(pathBuild, fileCore.replace('.js','.min.js')),
    path.join(pathBuild, fileTpl.replace('.js','.min.js')),
    path.join(pathBuild, 'app.min.css')
  ], {
    cwd: pathBuild
  }), {
    ignorePath: '/build/',
    addRootSlash: false
  }));

  if (watching) {
    p = p.pipe(embedlr({ port: liveReloadPort }));
  }

  return p
  .pipe(gulp.dest(pathBuild))
  .pipe(livereload({
    reloadPath: path.join(pathBuild, 'index.html')
  }));
});

gulp.task('replace-constants', function () {

  var
  configCopy = _.merge({}, config);

  delete configCopy.mailer.transport;
  delete configCopy.log;

  return gulp.src('./src/app-constants.js')
    .pipe(replace({
      patterns: [
        { match: 'timestamp', replacement: Date.now() },
        { json: configCopy }
      ]
    }))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('build-sass', ['inject-app-scss'], function() {
  return gulp.src([path.join(pathSrc, 'app.scss')])
    .pipe(sass())
    .pipe(minifyCss({ keepSpecialComments: 0 }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(pathBuild))
    .pipe(livereload({ reloadPath: path.join(pathBuild, 'app.min.css') }));
});

gulp.task('build-templates', function() {
  return gulp.src([
      path.join(pathSrc, '**/*.html'),
      '!' + path.join(pathSrc, 'index.html')
    ])
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(ngHtml2Js({
      moduleName: 'cp.tpl'
    }))
    .pipe(concat(fileTpl))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(pathBuild));
});

gulp.task('build-core', ['replace-constants'], function() {
  return gulp.src([
      path.join(pathSrc, '**/*.js'),
      '!' + path.join(pathSrc, 'app-constants.js'),
      path.join('.tmp', '**/*.js')
    ])
    .pipe(angularFilesort())
    .pipe(concat(fileCore))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(pathBuild));
});

gulp.task('watch', function() {
  watching = true;
  livereload.listen({ host: 'localhost', port: liveReloadPort });
  gulp.watch(path.join(pathSrc, '**/*.scss'), ['build-sass',      'inject-app-html']);
  gulp.watch(path.join(pathSrc, '**/*.html'), ['build-templates', 'inject-app-html']);
  gulp.watch(path.join(pathSrc, '**/*.js'),   ['build-core',      'inject-app-html']);
});

gulp.task('build', [
  'build-sass',
  'build-templates',
  'build-core',
  'inject-app-html'
]);

gulp.task('default', [
  'build',
  'watch'
]);
