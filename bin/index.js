// Generated by CoffeeScript 1.7.1
(function() {
  var browserSync, cache, destinations, gulp, notify, path, pipe, source, watchedTasks,
    __slice = [].slice;

  path = require('path');

  gulp = require('gulp');

  cache = require('gulp-cached');

  notify = require('gulp-notify');

  browserSync = require('browser-sync');

  watchedTasks = {};

  destinations = [];

  source = function(src) {
    switch (typeof src) {
      case 'string':
        return gulp.src(src);
      case 'function':
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

  exports.watch = function() {
    var dest, files, name, pipes, src, _i;
    name = arguments[0], src = arguments[1], pipes = 5 <= arguments.length ? __slice.call(arguments, 2, _i = arguments.length - 2) : (_i = 2, []), dest = arguments[_i++], files = arguments[_i++];
    watchedTasks[name] = src;
    if (files) {
      destinations.push(path.join(dest, files));
    }
    return gulp.task(name, function() {
      var stream;
      stream = source(src).pipe(cache(name));
      stream = pipe(stream, pipes, dest);
      if (files) {
        return stream.pipe(notify('Compiled <%= file.relative %>'));
      }
    });
  };

  exports.serve = function(baseDir) {
    var task, _results;
    if (baseDir == null) {
      baseDir = './';
    }
    browserSync.init(destinations, {
      server: {
        baseDir: baseDir
      },
      notify: false
    });
    _results = [];
    for (task in watchedTasks) {
      path = watchedTasks[task];
      _results.push(gulp.watch(path, [task]));
    }
    return _results;
  };

}).call(this);