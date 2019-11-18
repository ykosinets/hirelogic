"use strict";
// Gulp module imports
import {src, dest, watch, parallel, series} from "gulp";
import babel from "gulp-babel";
import webpack from "webpack";
import webpackStream from "webpack-stream";
import webpackConfig from "./webpack.config.js";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import fileinclude from "gulp-file-include";
import image from "gulp-image";
import webp from "gulp-webp";
import del from "del";
import flatten from "gulp-flatten";
import livereload from "gulp-livereload";
import plumber from "gulp-plumber";

// Recognise `production`
const production = process.env.NODE_ENV.trim() === "production";

// Build Directories
// ----
const PATH = {
	src: "src",
	build: production ? "public" : "live",
	assets: {
		images: "src/assets",
		fonts: "src/fonts",
		audio: "src/assets",
		video: "src/assets",
		data: "src/assets",
	}
};

// File Sources
// ----
const sources = {
	styles: {toWatch: `${PATH.src}/**/*.scss`, toCompile: `${PATH.src}/main.scss`},
	views: {toWatch: `${PATH.src}/**/*.html`, toCompile: `${PATH.src}/pages/**/*.html`},
	scripts: {toWatch: `${PATH.src}/**/*.js`, toCompile: `${PATH.src}/app.js`},
	fonts: {toWatch: `${PATH.src}/assets/fonts/*`, toCompile: `${PATH.src}/assets/fonts/**/*`},
	images: {toWatch: `${PATH.src}/assets/images/**/*`, toCompile: `${PATH.src}/assets/**/*`},
	video: {toWatch: `${PATH.src}/assets/video/*`, toCompile: `${PATH.src}/assets/video/**/*`},
	audio: {toWatch: `${PATH.src}/assets/video/*`, toCompile: `${PATH.src}/assets/audio/**/*`},
	data: {toWatch: `${PATH.src}/assets/data/*`, toCompile: `${PATH.src}/assets/data/**/*`},
};

// Main Tasks
// ----

// Styles
export const buildStyles = () => src(sources.styles.toCompile, {nodir: true})
	.pipe(sourcemaps.init())
	.pipe(sass.sync({
		outputStyle: production ? 'compressed' : 'expanded',
		includePaths: ['node_modules']
	}).on('error', sass.logError))
	.pipe(sourcemaps.write())
	.pipe(dest(PATH.build))
	.pipe(livereload());

// Views
export const buildViews = () => src(sources.views.toCompile)
	.pipe(plumber())
	.pipe(fileinclude({
		prefix: '@@',
		basepath: './src',
		context: {env: production ? 'public' : 'live'}
	}))
	.pipe(flatten())
	.pipe(dest(PATH.build))
	.pipe(livereload());

// Scripts
export const buildScripts = () => src(sources.scripts.toCompile)
	.pipe(plumber())
	.pipe(babel({presets: ['@babel/preset-env']}))
	.pipe(dest(PATH.build))
	.pipe(livereload());

// Webpack
export const buildWebpack = () => src(sources.scripts.toCompile)
	.pipe(webpackStream(webpackConfig), webpack)
	.pipe(dest(PATH.build))
	.pipe(livereload());

// Images
export const convertImages = () => src([sources.images.toCompile, '!' + `${PATH.src}` + '/assets/images/favicon/*'], {nodir: true})
	.pipe(webp())
	.pipe(dest(PATH.build));

export const buildImages = () => src(sources.images.toCompile, {nodir: true})
	.pipe(image({
		pngquant: true,
		optipng: false,
		zopflipng: true,
		jpegRecompress: false,
		mozjpeg: true,
		guetzli: false,
		gifsicle: true,
		svgo: true,
		concurrent: 10,
		quiet: true // defaults to false
	}))
	.pipe(dest(PATH.build))
	.pipe(livereload());

// Fonts TODO: simplify converting(fontforge?)
export const buildFonts = () => src(sources.fonts.toCompile)
	.pipe(dest(PATH.build))
	.pipe(livereload());

// Data
export const buildData = () => src(sources.data.toCompile, {nodir: true})
	.pipe(dest(PATH.build))
	.pipe(livereload());

// Audio TODO: add ffmpeg converting
export const buildAudio = () => src(sources.audio.toCompile, {nodir: true})
	.pipe(dest(PATH.build))
	.pipe(livereload());

// Video TODO: add ffmpeg converting
export const buildVideo = () => src(sources.video.toCompile, {nodir: true})
	.pipe(dest(PATH.build))
	.pipe(livereload());

// Clean
export const clean = () => del([PATH.build]);

// Watch Task
export const devWatch = () => {
	livereload.listen();
	watch(sources.styles.toWatch, buildStyles);
	watch(sources.views.toWatch, buildViews);
	watch(sources.scripts.toWatch, buildWebpack);
	watch(sources.images.toWatch, buildImages);
	watch(sources.fonts.toWatch, buildFonts);
	watch(sources.data.toWatch, buildData);
	watch(sources.audio.toWatch, buildAudio);
	watch(sources.video.toWatch, buildVideo);
};

// Default task
export default production
	// Development Task
	? series(clean, parallel(buildImages, convertImages, parallel(buildStyles, buildViews, buildWebpack)))
	// Production Task
	: series(clean, parallel(buildImages, convertImages, parallel(buildStyles, buildViews, buildWebpack)), devWatch);

