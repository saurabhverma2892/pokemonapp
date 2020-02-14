module.exports = function (grunt) {

    var vendors = 'jquery backbone backbone.marionette backbone.localstorage'.split(' ');

    grunt.initConfig({

        browserify: {
            // just the app
            app: {
                src: 'src/app.js',
                dest: 'dist/app.js',
                options: {
                    debug: true,
                    extensions: ['.hbs'],
                    transform: ['hbsfy'],
                    external: vendors
                }
            },
            // just vendors
            vendors: {
                files: {
                    'dist/vendors.js': []
                },
                options: {
                    'require': vendors
                }
            },
            // bundle all in one
            bundle: {
                src: 'src/app.js',
                dest: 'dist/bundle.js',
                options: {
                    extensions: ['.coffee', '.hbs'],
                    transform: ['coffeeify', 'hbsfy']
                }
            }
        },

        // produce index.html by target
        targethtml: {
            dev: {
                src: 'src/index.html',
                dest: 'index.html'
            },
            prod: {
                src: 'src/index.html',
                dest: 'index.html'
            }
        },

        uglify: {
            bundle: {
                src: 'dist/bundle.js',
                dest: 'dist/bundle.js'
            }
        },

        pngmin: {
            options: {
                ext: '.png',
                force: true
            },
            compress: {
                expand: true, 
                src: ['assets/media/**.png', 'assets/media/**/*.png']
            }
        },

        stylus: {
            'dev': {
                options: {
                    compress: false
                },
                src: ['assets/css/app.styl'],
                dest: 'assets/css/app.css'
            },
            'prod': {
                options: {
                    compress: true
                },
                src: ['assets/css/app.styl'],
                dest: 'assets/css/app.css'
            }
        },

        autoprefixer: {
            compile: {
                src: 'assets/css/app.css',
                dest: 'assets/css/app.css'
            }
            
        },

        watch: {
            options: {
                livereload: true,
                spawn: false,
                interrupt: true
            },
            src: {
                files: ['src/**/*', '!src/index.html', 'assets/css/*.styl', 'assets/css/**/*.styl'],
                tasks: ['browserify:app', 'stylus:dev', 'autoprefixer'],
            },
            index: {
                files: ['src/index.html'],
                tasks: ['targethtml:dev']
            },
            assets: {
                files: ['assets/**/*']
            }
        },

        connect: {
            server: {
                options: {
                    hostname: '127.0.0.1',
                    open: true,
                    useAvailablePort: true,
                    livereload: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-pngmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-targethtml');

    grunt.registerTask('builddev', ['browserify:app', 'browserify:vendors', 'targethtml:dev']);
    grunt.registerTask('buildprod', ['browserify:bundle', 'uglify', 'targethtml:prod', 'stylus:prod', 'autoprefixer']);
    grunt.registerTask('run',   ['builddev', 'connect', 'watch']);

};
