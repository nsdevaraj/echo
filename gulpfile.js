const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const watch = require('gulp-watch');
const uglify = require('gulp-uglify');
const log = require('fancy-log');
const del = require('del');


gulp.task("vdtDeps", () => watch(["com.visualbi.vdt/res/js/vdt-component-calculation.js",
    "com.visualbi.vdt/res/js/vdt-component-events.js",
    "com.visualbi.vdt/res/js/vdt-component-export-excel.js",
    "com.visualbi.vdt/res/js/vdt-component-node-detail.js",
    "com.visualbi.vdt/res/js/vdt-component-render-tree.js",
    "com.visualbi.vdt/res/js/vdt-component-scenarios.js",
    "com.visualbi.vdt/res/js/vdt-component-simulations.js",
    "com.visualbi.vdt/res/js/vdt-component-support.js"], () => {
        del(['com.visualbi.vdt/res/build/vdtDeps.js']).then(() => {
            gulp.src(["com.visualbi.vdt/res/js/vdt-component-calculation.js",
                "com.visualbi.vdt/res/js/vdt-component-events.js",
                "com.visualbi.vdt/res/js/vdt-component-export-excel.js",
                "com.visualbi.vdt/res/js/vdt-component-node-detail.js",
                "com.visualbi.vdt/res/js/vdt-component-render-tree.js",
                "com.visualbi.vdt/res/js/vdt-component-scenarios.js",
                "com.visualbi.vdt/res/js/vdt-component-simulations.js",
                "com.visualbi.vdt/res/js/vdt-component-support.js"])
                .pipe(sourcemaps.init())
                .pipe(babel())
                .pipe(concat("vdtDeps.js"))
                .pipe(gulp.dest('com.visualbi.vdt/res/build/'))
                .on('end', () => log('vdtDeps generated'))
        });
    }));

gulp.task("core", () => watch(["com.visualbi.vdt/res/js/core.js",
    "com.visualbi.vdt/res/js/trialLib.js"], () => {
        gulp.src(["com.visualbi.vdt/res/js/core.js",
            "com.visualbi.vdt/res/js/trialLib.js"])
            .pipe(sourcemaps.init())
            .pipe(babel())
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("com.visualbi.vdt/res/build/"))
            .on('end', () => { log('Files Re-generated'); });
    }));

gulp.task("coreProd", () => gulp.src(["com.visualbi.vdt/res/js/core.js",
    "com.visualbi.vdt/res/js/trialLib.js",])
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest("com.visualbi.vdt/res/build/")));

gulp.task("vdtDepsProd", () => del(['com.visualbi.vdt/res/build/vdtDeps.js']).then(() => {
    gulp.src(["com.visualbi.vdt/res/js/vdt-component-calculation.js",
        "com.visualbi.vdt/res/js/vdt-component-events.js",
        "com.visualbi.vdt/res/js/vdt-component-export-excel.js",
        "com.visualbi.vdt/res/js/vdt-component-node-detail.js",
        "com.visualbi.vdt/res/js/vdt-component-render-tree.js",
        "com.visualbi.vdt/res/js/vdt-component-scenarios.js",
        "com.visualbi.vdt/res/js/vdt-component-simulations.js",
        "com.visualbi.vdt/res/js/vdt-component-support.js"])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat("vdtDeps.js"))
        .pipe(gulp.dest('com.visualbi.vdt/res/build/'))
        .on('end', () => log('vdtDeps generated'))
}));