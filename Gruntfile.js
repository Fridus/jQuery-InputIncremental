
'use strict';

module.exports = function (grunt) {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var conf = {
    sass: 'scss',
    css: 'css',
    js: 'js',
    files: {
      css: 'style.css',
      cssmin: 'style.min.css',
      baThrottleDebounce:     'jquery.ba-throttle-debounce.js',
      baThrottleDebounce_min: 'jquery.ba-throttle-debounce.min.js',
      inputIncremental:       'jquery.inputIncremental.js',
      inputIncremental_min:   'jquery.inputIncremental.min.js',
      inputIncremental_full:      'jquery.inputIncremental.full.js',
      inputIncremental_full_min:  'jquery.inputIncremental.full.min.js'
    },
    connect: {
      port: 8000
    }
  };

  grunt.initConfig({
    conf: conf,
    jshint: {
      options: {
        force: true,
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= conf.js %>/jquery.inputIncremental.js'
      ]
    },
    sass: {
      dist: {
          files: [{
              expand: true,
              cwd: 'scss',
              src: ['*.scss'],
              dest: 'css',
              ext: '.css'
          }]
      },
      dev: {
        options: {
          debugInfo: true
        },
        files: [{
            expand: true,
            cwd: 'scss',
            src: ['*.scss'],
            dest: 'css',
            ext: '.css'
        }]
      }
    },
    clean: {
      css: [
        '<%= conf.css %>'
      ],
      js: [
        '<%= conf.js %>/<%= conf.files.inputIncremental_min %>',
        '<%= conf.js %>/<%= conf.files.inputIncremental_full %>',
        '<%= conf.js %>/<%= conf.files.inputIncremental_full_min %>'
      ],
      dist: [
        '<%= clean.css %>',
        '<%= clean.js %>',
      ],
      server: '.tmp',
      compass: '.sass-cache'
    },
    cssmin: {
      options: {
        noAdvanced: true
      },
      dist: {
        files: {
          '<%= conf.css %>/<%= conf.files.cssmin %>': [
            '<%= conf.css %>/<%= conf.files.css %>'
          ]
        }
      }
    },
    concat: {
      dist: {
        files: {
          '<%= conf.js %>/<%= conf.files.inputIncremental_full %>': [
            '<%= conf.js %>/<%= conf.files.baThrottleDebounce %>',
            '<%= conf.js %>/<%= conf.files.inputIncremental %>'
          ]
        },
      },
    },
    uglify: {
      dist: {
        files: {
          '<%= conf.js %>/<%= conf.files.inputIncremental_min %>': [
            '<%= conf.js %>/<%= conf.files.inputIncremental %>'
          ],
          '<%= conf.js %>/<%= conf.files.inputIncremental_full_min %>': [
            '<%= conf.js %>/<%= conf.files.baThrottleDebounce %>',
            '<%= conf.js %>/<%= conf.files.inputIncremental %>'
          ]
        }
      }
    },
    connect: {
      server: {
        options: {
          port: '<%= conf.connect.port %>',
          hostname: '*',
          keepalive: true,
          debug: true,
          open: 'http://localhost:<%= conf.connect.port %>/examples/demo.html'
        }
      }
    }
  });

  grunt.registerTask('css:dev', [
    'clean:css',
    'sass:dev'
  ]);

  grunt.registerTask('css', [
    'clean:css',
    'sass:dist'
  ]);

  grunt.registerTask('build:css', [
    'css',
    'cssmin'
  ]);

  grunt.registerTask('build:js', [
    'clean:js',
    'jshint',
    'concat',
    'uglify'
  ]);

  grunt.registerTask('build', [
    'build:css',
    'build:js'
  ]);

  grunt.registerTask('default', ['css:dev']);
};
