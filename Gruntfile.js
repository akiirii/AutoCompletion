module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    var connect = require('connect');
    var serveStatic = require('serve-static');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            dev: {
                files: {
                    'tmp/css/demo.css': 'src/less/demo.less',
                    'tmp/css/ac-main.css': 'src/less/ac-main.less'
                }
            }
        },
        watch: {
            options: {
                atBegin: true
            },
            less: {
                files: ['src/less/**'],
                tasks: ['less:dev']

            }
        },
        jasmine: {
            dist: {
                src: 'src/**/*.js',
                options: {
                    specs: 'src/**/*.unit.js',
                    vendor: ['node_modules/angular/angular.js',
                        'node_modules/angular-mocks/angular-mocks.js'
                    ],
                    summary: true
                }
            }
        }
    })

    grunt.registerTask('server', function() {
        connect()
            .use('/lib/js', serveStatic('node_modules'))
            .use('/js', serveStatic('src/js'))
            .use('/css', serveStatic('tmp/css'))
            .use('/static/html', serveStatic('src/html'))
            .use('/', serveStatic('src/html'))
            .listen(8888);
    });

    grunt.registerTask('test', ['jasmine']);

    grunt.registerTask('demo', ['server', 'watch'])
}
