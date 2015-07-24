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
      '<%= paths.private %>js/*.js',
      '<%= paths.temp %>js/templates.js'
    ],
    css: [
      '<%= paths.private %>css/*.css'
    ],

    dependencies : {
      js: [
        'node_modules/angular/angular.js',
        'node_modules/angular-route/angular-route.js',
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
            src: 'partials/*.html',
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
            src: 'src/index.html',
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

//Everything else -------------------------------------------------------

    connect: {
  	  server: {
  	    options: {
  	      port: 8080,
  	      //open: true,
  	      base: paths.public
  	    }
  	  }
  	},

     //watching the files for change, then reloading with LiveReload
    watch: {
      src: {
      files: [files.js, files.css, 'src/partials/*.html', 'src/index.html'],
      tasks:['clean:start', 'ngtemplates', 'concat', 'clean:end', 'copy']}
    },

    karma: {
      options: {
        // point all tasks to karma config file
        configFile: 'src/test/client/karma.conf.js',
      },
      unit: {
        // run tests once instead of continuously
        singleRun: true
      }
    }

  });

  grunt.registerTask('default', ['karma', 'clean:start', 'ngtemplates', 'concat', 'clean:end', 'copy', 'connect', 'watch']);

}