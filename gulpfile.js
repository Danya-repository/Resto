const { src, dest, watch, parallel, series }  = require('gulp');

const scss          = require('gulp-sass');
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const uglify        = require('gulp-uglify-es').default;
const autoprefixer  = require('gulp-autoprefixer');
const imagemin      = require('gulp-imagemin');
const del           = require('del');

function browsersync() {
  browserSync.init({
    server : {
      baseDir: 'app/'
    }
  });
}

function cleanDist() {
  return del('dist')
}

function images() {
  return src('app/images/**/*')
    .pipe(imagemin(
      [
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
          ]
        })
      ]
    ))
    .pipe(dest('dist/images'))
}

function scripts() {
  return src([

    // libs and plugins

    'node_modules/jquery/dist/jquery.js',
    'node_modules/simplebar/dist/simplebar.js',
    'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
    'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/mixitup/dist/mixitup.js',
    'node_modules/rateyo/src/jquery.rateyo.js',

    // modules

    'app/js/customCarousel.js',
    'app/js/product.js',
    'app/js/filter.js',
    'app/js/review.js',
    'app/js/pagination.js',
    'app/js/paginationItem.js',
    'app/js/indexPage.js',
    'app/js/catalogPage.js',
    'app/js/aboutUsPage.js',
    'app/js/productsBasket.js',
    'app/js/basketButton.js',
    'app/js/vacanciesPage.js',
    'app/js/reviewsPage.js',
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    // .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}


function styles() {
  return src([
          'node_modules/simplebar/dist/simplebar.css',
          'node_modules/jquery-form-styler/dist/jquery.formstyler.css',
          'node_modules/jquery-form-styler/dist/jquery.formstyler.theme.css',
          'node_modules/ion-rangeslider/css/ion.rangeSlider.css',
          'node_modules/slick-carousel/slick/slick.css',
          'node_modules/rateyo/src/jquery.rateyo.css',
          'app/scss/style.scss',
        ])
      .pipe(scss({outputStyle: 'expanded'}))
      .pipe(concat('style.min.css'))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true
      }))
      .pipe(dest('app/css'))
      .pipe(browserSync.stream())
}

function build() {
  return src([
    'app/css/style.min.css',
    'app/fonts/**/*',
    'app/js/main.min.js',
    'app/*.html'
  ], {base: 'app'})
    .pipe(dest('dist'))
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;


exports.build = series(cleanDist, images, build);
exports.default = parallel(styles ,scripts ,browsersync, watching);


