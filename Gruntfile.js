module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

  	connect: {
	  server: {
	    options: {
	      port: 0,
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

    /* watching the files for change, then reloading with LiveReload */
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
        files: ['*.html', '*.css', '*.js', 'templates/*.html'],
        options: {
          livereload: true
        }
      },
    }

  });

  grunt.registerTask('default', 'watch');

}