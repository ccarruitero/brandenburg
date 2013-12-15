module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dom_munger: {
      readcss: {
        options: {
          read: {
            selector: 'link', attribute: 'href', writeto: 'cssRefs',
            isPath: true
          },
        },
        src: 'client/index.html'
      },
      readjs: {
        options: {
          read: { 
            selector: 'script', attribute: 'src', writeto: 'jsRefs',
            isPath: true 
          },
        },
        src: 'client/index.html'
      },
      cleancss: {
        options: {
            remove: 'link[href]'
        },
        src: 'server/public/index.html'
      },
      cleanjs: {
        options: {
          remove: 'script[src]'
        },
        src: 'server/public/index.html'
      },
      updatecss: {
        options: {
          append: {selector:'head',html:'<link rel="stylesheet" href="style/app.min.css">'}
        },
        src:'server/public/index.html'
      },
      updatejs: {
        options: {
          append: {selector:'body',html:'<script src="js/app.min.js"></script>'}
        },
        src: 'server/public/index.html'
      }
    },
    cssmin: {
      main: {
        src:'<%= dom_munger.data.cssRefs %>',
        dest:'server/public/style/app.min.css'
      }
    },
    uglify: {
      main: {
        src: 'server/public/js/app.min.js',
        dest: 'server/public/js/app.min.js'
      }
    },
    copy: {
      main: {
        files:[{
          src: ['client/index.html'],
          dest: 'server/public/index.html'
        }]
      }
    },
    concat: {
      main: {
        src: ['<%= dom_munger.data.jsRefs %>'],
        dest: 'server/public/js/app.min.js'
      }
    },
    zip: {
      dist: {
        cwd: 'dist/',
        src: 'dist/**',
        dest: 'dist/app.zip'
      }
    },
    clean: {
      dist: ['server/public/']
    },
    jshint: {
      all: ['Gruntfile.js', 'client/js/**/*.js', 'server/routes/**/*.js']
    },
    emberTemplates: {
      options: {
        templateBasePath: /client\/js\/templates\//
      },
      'compiled/templates.js': ['client/js/templates/**/*.hbs']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-dom-munger');
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-ember-templates');

  grunt.registerTask('default', ['jshint', 'emberTemplates']);
  grunt.registerTask('build_client', ['clean', 'default','copy', 'dom_munger',
                                      'concat', 'cssmin']);
  //grunt.registerTask('pack', ['clean', 'default', 'copy', 'dom_munger',
  //                            'concat', 'uglify', 'cssmin', 'zip']);
};
