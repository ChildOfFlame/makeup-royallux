#!/bin/bash
mkdir -p app/{css,fonts,images,js,libs}
mkdir -p app/scss/{base,modules}
mkdir -p app/scss/modules/common
touch app/js/script.js
touch app/scss/style.scss
echo "@import 'base/index',
        'modules/common/index';" >> app/scss/style.scss
touch app/scss/base/{_base.scss,_icons.scss,_index.scss,_utilities.scss}
echo "@import 'base',
        'icons',
        'utilities';" >> app/scss/base/_index.scss
touch app/scss/modules/common/{_index.scss,_header.scss,_footer.scss,_popup.scss,_breadcrumbs.scss}
echo "@import 'header',
         'popup',
         'breadcrumbs',
         'footer';" >> app/scss/modules/common/_index.scss
touch gulpfile.js
echo "var gulp       = require('gulp'), // Подключаем Gulp
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png  
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    wait         = require('gulp-wait'),
    sourcemaps   = require('gulp-sourcemaps');

//////////////////////////////
gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('app/scss/**/*.scss') // Берем источник
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
    });
/////////////////////////////
gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/libs/node_modules/jquery/dist/jquery.min.js',
        'app/libs/node_modules/swiper/dist/js/swiper.min.js'
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
    });
/////////////////////////////
gulp.task('css-libs', ['sass'], function() {
    return gulp.src(['app/libs/node_modules/swiper/dist/css/swiper.min.css',
        ])
        .pipe(concat('libs.min.css')) // Собираем их в кучу в новом файле libs.min.css
        .pipe(cssnano()) // Сжимаем
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
    });
/////////////////////////////
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});
/////////////////////////////
gulp.task('watch', ['scripts','css-libs','sass', 'browser-sync'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/**/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/css/**/*.css', browserSync.reload); // Наблюдение за CSS файлами в папке css
    gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
    gulp.watch('app/templates/**/*.html', browserSync.reload);
});
/////////////////////////////
gulp.task('default', ['watch']);
/////////////////////////////
gulp.task('clear', function () {
    return cache.clearAll();
})
/////////////////////////////
gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});
/////////////////////////////
gulp.task('images', function() {
    return gulp.src('app/images/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/images')); // Выгружаем на продакшен
    });
/////////////////////////////
gulp.task('build', ['clean', 'images', 'sass', 'scripts'], function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'app/css/style.css',
        'app/css/libs.min.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

});
/////////////////////////////" >> gulpfile.js
npm init
npm install --prefix app/libs jquery
npm install --save-dev gulp
npm install --save-dev gulp-sass
npm install --save-dev gulp-concat
npm install --save-dev browser-sync
npm install --save-dev gulp-uglifyjs
npm install --save-dev gulp-cssnano
npm install --save-dev gulp-rename
npm install --save-dev del
npm install --save-dev gulp-imagemin
npm install --save-dev imagemin-pngquant
npm install --save-dev gulp-cache
npm install --save-dev gulp-autoprefixer
npm install --save-dev gulp-sourcemaps
npm install --save-dev gulp-wait