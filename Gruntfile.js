'use strict';

module.exports = function (grunt) {
  var env = process.env.CI ? 'continuous' : 'unit';


  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);


  grunt.initConfig({
    readme: 'README.md',
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      options: {
        configFile: 'test/karma.conf.js'
      },
      unit: {
      },
      continuous: {
        browsers: ['PhantomJS'],
        autoWatch: false,
        singleRun: true
      }
    },
    uglify: {
      build: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['src/*.js']
        }
      }
    },

    ngdocs: {
      options: {
        dest: 'docs',
        html5Mode: false
      },
      api: ['src/**/*.js' ]
    },
    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc'

      },
      all: [
        'Gruntfile.js',
        'src/*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },
    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        middleware: function (connect, options) {
          var optBase = (typeof options.base === 'string') ? [options.base] : options.base;
          return [require('connect-modrewrite')(['!(\\..+)$ / [L]'])].concat(
            optBase.map(function (path) {
              return connect.static(path);
            }));
        }
      },
      demo: {
        options: {
          open: true,
          base: 'demo'
        }
      },
      ngdocs: {
        options: {
          port: 8000,
          open: true,
          base: 'docs'
        }
      }
    },
    copy: {
      dist: {
        files: [
          { expand: true, flatten: true, src: ['src/**/*.js'], dest: 'dist/', filter: 'isFile' }
        ]
      },
      demo: {
        files: [
          {src: ['src/**/*.js'], dest: 'demo/scripts/' },
          {src: ['bower_components/angular/angular.js'], dest: 'demo/scripts/' }


        ]
      }
    },
    clean: {
      dist: {
        src: ['dist']
      },
      server: {
        src: ['.tmp']
      },
      demo: {
        src: 'demo/scripts'
      }
    }
  });

  //dispay/generate documentation
  grunt.registerTask('showDoc', function () {
    grunt.task.run([
      'clean:server',
      'ngdocs',
      'connect:ngdocs:keepalive'
    ]);
  });

  //display demo
  grunt.registerTask('serve', function () {
    grunt.task.run([
      'jshint:all',
      'clean:demo',
      'copy:demo',
      'connect:demo:keepalive'

    ]);
  });

  grunt.registerTask('test', ['karma:' + env]);
  grunt.registerTask('dist', ['clean:dist', 'clean:demo', 'uglify', 'copy:dist', 'copy:demo', 'ngdocs']);
  grunt.registerTask('default', ['test', 'jshint:all']);
};