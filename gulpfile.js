var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');

gulp.task('default', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function () {
            console.log('Restarting');
    });
});

gulp.task('test', function(){
    gulp.src('./Tests/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'nyan'}))
});