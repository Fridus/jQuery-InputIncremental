
'use strict';

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var conf = {
    sass: 'scss',
    css: 'css',
    files: {
      css: 'style.css',
      cssmin: 'style.min.css',
      inputIncremental: 'jquery.inputIncremental.min.js'
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
        'jquery.inputIncremental.js'
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
        '<%= conf.files.inputIncremental %>'
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
          'css/style.min.css': [
            'css/style.css'
          ]
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
  ]);

  grunt.registerTask('build', [
    'build:css',
    'build:js'
  ]);

  grunt.registerTask('default', ['css:dev']);
};
