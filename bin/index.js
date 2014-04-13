// Generated by CoffeeScript 1.7.1
(function() {
  var browserSync, cache, filter, gulp, livereload, notify, once, path, pipe, serving, shouldServe, source, subdir,
    __slice = [].slice;

  path = require('path');

  gulp = require('gulp');

  cache = require('gulp-cached');

  notify = require('gulp-notify');

  filter = require('gulp-filter');

  once = require('once');

  subdir = require('subdir');

  browserSync = require('browser-sync');

  serving = void 0;

  source = function(src) {
    switch (false) {
      case !(typeof src === 'string' || Array.isArray(src)):
        return gulp.src(src);
      case typeof src !== 'function':
        return src();
      default:
        return src;
    }
  };

  pipe = function(stream, pipes, dest) {
    var step, _i, _len;
    for (_i = 0, _len = pipes.length; _i < _len; _i++) {
      step = pipes[_i];
      stream = stream.pipe(step());
    }
    if (dest !== '') {
      stream = stream.pipe(gulp.dest(dest));
    }
    return stream;
  };

  exports.task = function() {
    var dest, name, pipes, src, _i;
    name = arguments[0], src = arguments[1], pipes = 4 <= arguments.length ? __slice.call(arguments, 2, _i = arguments.length - 1) : (_i = 2, []), dest = arguments[_i++];
    if ((dest != null) && typeof dest === 'string') {
      return gulp.task(name, function() {
        return pipe(source(src), pipes, dest);
      });
    } else {
      return gulp.task(name, src, dest);
    }
  };

  shouldServe = function(file) {
    if (serving != null) {
      return subdir(serving.dir, file.path);
    }
  };

  livereload = function(file) {
    serving.instance.changeFile(file.path, {
      injectFileTypes: ['css', 'png', 'jpg', 'jpeg', 'svg', 'gif', 'webp']
    });
    return true;
  };

  exports.watch = function() {
    var dest, name, pipes, src, _i;
    name = arguments[0], src = arguments[1], pipes = 4 <= arguments.length ? __slice.call(arguments, 2, _i = arguments.length - 1) : (_i = 2, []), dest = arguments[_i++];
    return gulp.task(name, function() {
      var stream;
      once(function() {
        return gulp.watch(src, [name]);
      })();
      stream = source(src).pipe(cache(name));
      return pipe(stream, pipes, dest).pipe(filter(shouldServe)).pipe(notify('Compiled <%= file.relative %>')).pipe(filter(livereload));
    });
  };

  exports.serve = function(baseDir) {
    if (baseDir == null) {
      baseDir = './';
    }
    return serving = {
      dir: baseDir,
      instance: browserSync.init([], {
        server: {
          baseDir: baseDir
        },
        notify: false
      })
    };
  };

}).call(this);
