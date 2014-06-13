module.exports = function(grunt) {

    grunt.registerTask('default', [ 'watch' ]);
    
    grunt.initConfig({
        imagemin: {
            dynamic: {  
                files: [{
                    expand: true,
                    cwd: '../../../uploads',
                    src: '**/*.{png,jpg,jpeg,gif}',
                    dest: '../../../uploads'
                }]
            }
        },
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                src: ['../js/*.js'],
                dest: '../js/concat/main.js'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            js: {
                files: {
                    '../js/compiled/main.min.js' : ['../js/concat/main.js']
                }
            }
        },
        sass: {
            style: {
                options: {
                    style: 'compressed'
                },
                files: {
                    "../css/master.css" : "../scss/master.scss",
                    "../css/ie.css" : "../scss/ie.scss",
                    "../css/login.css" : "../scss/login.scss"
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 4 versions', 'Firefox ESR', 'Opera 12.1']
            },
            no_dest_multiple: {
                src: '../css/*.css'
            },
        },
        watch: {
            options: {
                livereload: true
            },
            files: ['Gruntfile.js'],
            html: {
                files: ['../*.html']
            },
            php: {
                files: ['../*.php']
            },
            images: {
                files: ['../../../uploads/**/*.{png,jpg,jpeg,gif}'],
                tasks: ['newer:imagemin']
            },
            js: {
                files: ['../js/**/*.js'],
                tasks: ['concat:js', 'uglify:js']
            },
            css: {
                files: ['../scss/**/*.scss'],
                tasks: ['sass:style', 'autoprefixer:no_dest_multiple']
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');

};