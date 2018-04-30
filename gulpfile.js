const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const livereload = require('gulp-livereload');

gulp.task('miniJS', function () {
    gulp.src("source/js/*.js")
        .pipe(uglify())
        .on('error', errorLog)
        .pipe(gulp.dest("build/js"))
        .pipe(livereload())
})

gulp.task('miniCSS', function () {
    gulp.src("source/styles/*.css")
        .pipe(cleanCSS())
        .on('error', errorLog)
        .pipe(gulp.dest("build/styles"))
        .pipe(livereload())
})

gulp.task('html', function () {
    gulp.src("source/*.html")
        .pipe(gulp.dest("build"))
        .on('error', errorLog);

    gulp.src("source/images/*")
        .pipe(gulp.dest("images"))
        .on('error', errorLog);      
        
    gulp.src("source/CNAME")
        .pipe(gulp.dest(""))
        .on("error", errorLog)  
    
    gulp.src("source/Thumbs.db")
        .pipe(gulp.dest(""))
        .on("error", errorLog)  
})

gulp.task('watch', function () {
    var server = livereload();
    gulp.watch("source/js/*.js", ["miniJS"])
    gulp.watch("source/styles/*.css", ["miniCSS"])
});

gulp.task('live', ['miniCSS', 'miniJS', 'html', 'watch'])

gulp.task('build', ['miniCSS', 'miniJS', 'html']);


function errorLog(error){
    console.error.bind(error);
    this.emit('end');
}