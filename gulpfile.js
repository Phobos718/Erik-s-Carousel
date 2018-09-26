var gulp        = require('gulp');
var sass        = require('gulp-sass');
var jshint      = require('gulp-jshint');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

//Build Sass to CSS and move to dist folder
gulp.task('styles', function() {
    gulp.src('src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/'))
});

//Compress and move .js from src to dist
gulp.task('compress', function() {
  gulp.src('src/JS/*.js')
    .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
});

//Lint .js
gulp.task('lint', function() {
    return gulp.src(['src/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


//watch scss changes
gulp.task('watch',function() {
gulp.watch('src/**/*.scss',['styles'])
gulp.watch('src/JS/*.js',['lint', 'compress'])
});

//Run default tasks
gulp.task('default', function() {
        gulp.start('lint', 'compress', 'styles');
});