// Generated by CoffeeScript 1.7.1
(function() {
  var browserSync, cache, catchGumpErrors, clean, filter, gulp, handleDeletion, livereload, map, mark, memory, notify, once, parseArguments, path, pipe, plumber, reloadIfServed, rememberMarked, reportWrongUseOfWatch, serving, shouldServe, subdir, _ref,
    __slice = [].slice;

  path = require('path');

  gulp = require('gulp');

  cache = require('gulp-cached');

  notify = require('gulp-notify');

  filter = require('gulp-filter');

  plumber = require('gulp-plumber');

  clean = require('gulp-clean');

  once = require('once');

  subdir = require('subdir');

  browserSync = require('browser-sync');

  _ref = require('./errors'), reportWrongUseOfWatch = _ref.reportWrongUseOfWatch, catchGumpErrors = _ref.catchGumpErrors;

  parseArguments = require('./argumentparsing').parseArguments;

  map = function(fn) {
    return filter(function(file) {
      fn(file);
      return true;
    });
  };

  pipe = function(stream, pipes, dest) {
    var step, _i, _len;
    for (_i = 0, _len = pipes.length; _i < _len; _i++) {
      step = pipes[_i];
      stream = stream.pipe(step());
    }
    if (dest) {
      stream = stream.pipe(gulp.dest(dest));
    }
    return stream;
  };

  exports.task = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return catchGumpErrors(function() {
      var callback, deps, dest, name, pipes, src, _ref1;
      _ref1 = parseArguments(args), name = _ref1.name, deps = _ref1.deps, callback = _ref1.callback, src = _ref1.src, pipes = _ref1.pipes, dest = _ref1.dest;
      return gulp.task(name, deps, callback || function() {
        return pipe(src(), pipes, dest);
      });
    });
  };

  serving = void 0;

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

  reloadIfServed = function(stream, message) {
    return stream.pipe(filter(shouldServe)).pipe(notify("" + message + " <%= file.relative %>")).pipe(filter(livereload));
  };

  mark = function(file) {
    return file.__original = file.path;
  };

  memory = {};

  rememberMarked = function(file) {
    return memory[file.__original] = file.path;
  };

  handleDeletion = function(_arg) {
    var path, stream, type;
    type = _arg.type, path = _arg.path;
    if (type === 'deleted') {
      stream = gulp.src(memory[path]).pipe(clean());
      return reloadIfServed(stream, 'Deleted');
    }
  };

  exports.watch = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return catchGumpErrors(function() {
      var callback, deps, dest, name, pipes, src, srcs, _ref1;
      _ref1 = parseArguments(args), name = _ref1.name, deps = _ref1.deps, callback = _ref1.callback, src = _ref1.src, srcs = _ref1.srcs, pipes = _ref1.pipes, dest = _ref1.dest;
      if (callback) {
        reportWrongUseOfWatch(name);
      }
      return gulp.task(name, deps, function() {
        var stream;
        once(function() {
          return gulp.watch(srcs, [name]).on('change', handleDeletion);
        })();
        stream = src().pipe(cache(name)).pipe(plumber()).pipe(map(mark));
        stream = pipe(stream, pipes, dest).pipe(map(rememberMarked));
        return reloadIfServed(stream, 'Compiled');
      });
    });
  };

  exports.serve = function(baseDir) {
    if (baseDir == null) {
      baseDir = './';
    }
    return catchGumpErrors(function() {
      return serving = {
        dir: baseDir,
        instance: browserSync.init([], {
          server: {
            baseDir: baseDir
          },
          notify: false
        })
      };
    });
  };

}).call(this);
