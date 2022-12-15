const { src, dest, series, watch } = require('gulp')

const scss          = require('gulp-sass')(require('sass'))
const minifyCss     = require('gulp-clean-css')
const sourcemaps    = require('gulp-sourcemaps')
const rename        = require('gulp-rename')
const minifyJs      = require('gulp-terser')

function styles() {
  return src('./src/scss/*.scss')
    .pipe(scss())
    .pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('./dist/'))
}

function scripts() {
  return src('./src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(minifyJs())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('./dist/'))
}

function watchTasks() {
  watch(
    ['./src/scss/*.scss', './src/js/*.js'],
    series(styles, scripts)
  )
}

exports.default = series(styles, scripts, watchTasks)