module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['app/**/*', 'test/**/*'],
      tasks: ['jshint', 'karma:dev:run']
    },
    jshint: {
      files: ['app/js/**/*.js', 'test/**/*Spec.js'],
      options: {
        strict: false,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: false,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        trailing: true,
        globals: {
          module: false,
          describe: true,
          ddescribe: true,
          xdescribe: true,
          beforeEach: true,
          afterEach: true,
          it: true,
          xit: true,
          iit: true,
          runs: true,
          waitsFor: true,
          waits: true,
          spyOn: true,
          expect: true,
          jasmine: true,
          uitest: true,
          uit: true,
          window: true,
          document: true,
          MockHttpServer: true,
          dump: true
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          base: './',
          hostname: ''
        }
      }
    },
    karma: {
      options: {
        configFile: 'test/config/karma.conf.js',
        autoWatch: false
      },
      dev: {
        options: {
          singleRun: false,
          browsers: ['Chrome']
        },
        background: true
      },
      ci: {
        options: {
          singleRun: true,
          browsers: ['PhantomJS']
        }
      }
    }
  });

  grunt.registerTask('dev', ['connect','karma:dev','watch']);

  grunt.registerTask('default', ['jshint','karma:ci']);

  grunt.registerTask('travis', ['default']);

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
};