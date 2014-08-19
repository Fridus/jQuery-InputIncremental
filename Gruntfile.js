
'use strict';

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var conf = {
    connect: {
      port: 8000
    }
  };

  grunt.initConfig({
    conf: conf,
    connect: {
      server: {
        options: {
          port: '<%= conf.connect.port %>',
          hostname: '*',
          keepalive: true,
          open: 'http://localhost:<%= conf.connect.port %>'
        }
      }
    }
  });

  grunt.registerTask('default', ['connect']);
};
