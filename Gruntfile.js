module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var paths = {
    public: 'dist/',
    private: 'src/',
    modules: 'node_modules/',
    temp: 'temp/'
  };
  var files = {
    js: [
      '<%= paths.private %>main/client/js/*.js',
      '<%= paths.temp %>js/templates.js'
    ],
    css: [
      '<%= paths.private %>main/client/css/*.css'
    ],

    dependencies : {
      js: [
        'node_modules/angular/angular.js',
        'node_modules/angular-router/angular-router.js',
        'node_modules/angular-resource/angular-resource.js',
        'node_modules/angular-mocks/angular-mocks.js'
      ]
    }
  };

  grunt.initConfig({
    paths: paths,
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      start: ['<%= paths.public %>', '<%= paths.temp %>'],
      end: ['<%= paths.temp %>']
    },
    ngtemplates: {
      main:{
        options: {
          bootstrap: function(module, script) {
            return 'sampleApp.run([\'$templateCache\', function($templateCache) {\n' + script + '}]);\n';
          }
        },
        files: [
          {
            cwd: '<%=paths.private %>',
            src: 'main/client/partials/*.html',
            dest:'<%= paths.temp %>js/templates.js'
          }
        ]
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: 'src/main/client/index.html',
            dest: '<%= paths.public %>'
          }
        ]
      }
    },
    concat: {
      main: {
        files: [
          {
            src: [files.dependencies.js, files.js],
            dest: '<%= paths.public %>js/app.js'
          },
          {
            src: [files.css],
            dest:'<%= paths.public %>css/styles.css'
          }
        ]
      }
    },

    watch: {
      js: {
        files: files.js,
        tasks: ['concat']
      },
      others: {
        files: files.css,
        tasks: ['copy']
      }
    },

//Everything else -------------------------------------------------------

    connect: {
  	  server: {
  	    options: {
  	      port: 8080,
  	      open: true,
  	      keepalive: true,
  	      base: './'
  	    }
  	  }
  	},

    compass: {
      dev: {
        options: {
          config: 'config.rb',
          force: true
        }
      }
    },

     //watching the files for change, then reloading with LiveReload
    watch: {
      sass: {
        files: ['assets/sass/**/*.scss'],
        tasks: ['compass:dev']
      },

      js: {
        files: ['assets/js/main.js', 'components/**/*.js'],
        tasks: ['uglify']
      },

      livereload: {
        files: ['*.html', '*.css', '*.js', 'partials/*.html', 'src/test/client/unit/*.js', 'src/test/client/*.js'],
        options: {
          livereload: true
        }
      },
    }

  });

  grunt.registerTask('default', ['clean:start', 'ngtemplates', 'concat', 'clean:end', 'copy', 'connect', 'watch']);

}