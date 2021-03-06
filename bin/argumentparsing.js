// Generated by CoffeeScript 1.7.1
(function() {
  var gulp, gulpSrcForArgs, reportMissingSource, reportMissingStyle, _ref,
    __slice = [].slice;

  gulp = require('gulp');

  _ref = require('./errors'), reportMissingSource = _ref.reportMissingSource, reportMissingStyle = _ref.reportMissingStyle;

  gulpSrcForArgs = function(args) {
    var opts, potentialOpts, srcs, _ref1;
    srcs = [];
    while (args.length > 0 && typeof args[0] === 'string') {
      srcs.push(args[0]);
      args = args.slice(1);
    }
    if (args.length > 0) {
      potentialOpts = args[0];
      if (potentialOpts && ((_ref1 = typeof potentialOpts) !== 'function' && _ref1 !== 'string')) {
        opts = potentialOpts;
        args = args.slice(1);
      }
    }
    return [
      (function() {
        return gulp.src(srcs, opts);
      }), srcs, args
    ];
  };

  exports.parseArguments = function(_arg) {
    var args, callback, deps, dest, lastArg, name, pipes, potentialDeps, src, srcs, _i, _ref1, _ref2;
    name = _arg[0], args = 2 <= _arg.length ? __slice.call(_arg, 1) : [];
    if (args.length > 0) {
      potentialDeps = args[0];
      if (Array.isArray(potentialDeps)) {
        deps = potentialDeps;
        args = args.slice(1);
      }
    }
    if (!((deps != null) || args.length > 0)) {
      reportMissingStyle(name);
    }
    lastArg = args[args.length - 1];
    if (args.length <= 1 && (!lastArg || typeof lastArg === 'function')) {
      callback = lastArg != null ? lastArg : function() {};
    } else {
      if (args.length < 2) {
        reportMissingSource(name);
      }
      lastArg = args[args.length - 1];
      if (typeof lastArg === 'string') {
        _ref1 = args, args = 2 <= _ref1.length ? __slice.call(_ref1, 0, _i = _ref1.length - 1) : (_i = 0, []), dest = _ref1[_i++];
      }
      src = args[0];
      if (typeof src === 'function') {
        pipes = args.slice(1);
      } else {
        _ref2 = gulpSrcForArgs(args), src = _ref2[0], srcs = _ref2[1], pipes = _ref2[2];
      }
    }
    return {
      name: name,
      deps: deps,
      callback: callback,
      src: src,
      srcs: srcs,
      pipes: pipes,
      dest: dest
    };
  };

}).call(this);
