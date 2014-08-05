module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*',
        noAdvanced: true
      },
      minify: {
    		expand: true,
    		cwd: 'dist/',
    		src: ['*.css', '!*.min.css'],
    		dest: 'dist/min/',
    		ext: '.min.css'
 			}
    },
    csscomb: {
      options: {
        config: 'scss/.csscomb.json'
      },
      dist: {
        expand: true,
        cwd: 'dist/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/'
      }
    },
		sass: {
			dist: {                            // Target
      	options: {                       // Target options
      	 	style: 'expanded',
      	 	banner: '/*!\n' +
            ' * laySCSS v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
      	},
      	files: {                         // Dictionary of files
        	'dist/<%= pkg.name %>.css': 'scss/<%= pkg.name %>.scss'
      	}
   		}
		},
		watch: {
			css: {
				files: 'scss/**/*.scss',
				tasks: ['sass', 'csscomb', 'cssmin']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-csscomb');

	grunt.registerTask('default',['watch']);
}