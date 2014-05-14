module.exports = function(grunt) {
  var port = grunt.option('port') || 8000;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      main: {
        files: {
          'css/jfco.css': 'css/sass/jfco.sass'
        }
      }
    },

    cssmin: {
      compress: {
        files: {
          'css/jfco.min.css': ['css/jfco.css']
        }
      }
    },

    connect: {
      server: {
        options: {
          port: port,
          base: '.'
        }
      }
    },

    watch: {
      main: {
        files: ['css/sass/*.sass'],
        tasks: 'theme'
      },
      html: {
        files: ['src/*.src.html'],
        tasks: 'html'
      }

    },

    htmlcompressor: {
      compile: {
        files: [{
          src: 'src/page.src.html',
          dest: 'page.html'
        }, {
          src: 'src/post.src.html',
          dest: 'post.html'
        }, {
          src: 'src/comment.src.html',
          dest: 'comment.html'
        }],
        options: {
          type: 'html',
          preserveServerScript: true,
          preserveLineBreaks: true,
          compressJs: true
        }
      }
    },

    lineremover: {
      noOptions: {
        'page.html': 'page.html',
        'post.html': 'post.html',
        'comment.html': 'comment.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-htmlcompressor' );
  grunt.loadNpmTasks( 'grunt-line-remover' );

  // Serve
  grunt.registerTask('serve', ['htmlcompressor', 'lineremover', 'connect', 'watch']);

  // Theme task
  grunt.registerTask('theme', ['sass', 'cssmin']);

  // Theme task
  grunt.registerTask('html', ['htmlcompressor', 'lineremover']);
};
