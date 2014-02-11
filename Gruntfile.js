/*global module:false*/
module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    
    // Project configuration.
    grunt.initConfig({
        // pkg: grunt.file.readJSON('package.json'),
        currentBase: 'new-year-2014', //项目路径 read-burned-quiz 
        srcBase: 'src',
        modBase: 'module',
        pageBase: 'page',
        imageBase: 'image',
        buildBase: 'build',
        sass: 'css',
        css: 'css',
        dest: 'build',
        src: 'src',

        //监听变化
        watch: {
            livereload: {
                options: {
                    livereload: 35729,
                    debounceDelay: 250
                },
                files: [
                    '<%= opt.src %>/**/*.{js,css,html}'
                ]
            }
        },
        //服务器
        /*connect: {
            options: {
                port : 9000,
                hostname : '0.0.0.0'
            },
            server: {
                options: {
                    base : '.'
                }
            }
        },

        open: {
            server : {
                path : 'http://localhost:9000'
            }
        },

        // SCSS -> CSS
        compass: {
            options: {
                outputStyle: 'nested',
                noLineComments: true,
                importPath: [ '<%= srcBase %>/<%= pageBase %>' ],
                trace: true,
                relativeAssets: true
            },
            build: {
                options: {
                    sassDir: '<%= srcBase %>/<%= pageBase %>',
                    cssDir: '<%= srcBase %>/<%= pageBase %>'
                }
            }
        },*/

        uglify: {
            options: {
                beautify: {
                    beautify: false,
                    ascii_only: true
                }
            },
            common: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= buildBase %>/<%= modBase %>',
                        src: ['**/*.js', '!*-min.js'],
                        dest: '<%= buildBase %>/<%= modBase %>'
                        //ext: '-min.js'
                    }
                ]
            },
            pages : {
                files: [
                    {
                        expand: true,
                        cwd: '<%= buildBase %>/<%= pageBase %>/<%= currentBase %>',
                        src: ['**/*.js', '!*-min.js'],
                        dest: '<%= buildBase %>/<%= pageBase %>/<%= currentBase %>'
                    }
                ]
            }
            /*test: {
                src: ['<%= concat.test.dest %>'],
                dest: 'build/test/test.js'
            }*/
        },

        clean : {
            build: {
                src: ['<%= buildBase %>/<%= pageBase %>/<%= currentBase %>'] //, '<%= buildBase %>/<%= modBase %>'
            }
        },
        //transport to CMD or AMD
        transport: {
            options : {
                paths : [
                    '<%= srcBase %>'
                ],
                // 非当前Sea_Module目录的模块
                alias : {
                    'zepto' : 'zepto',
                    'iScroll' : 'iScroll',
                    'api/bridge/launch' : 'api/bridge/launch'
                },
                debug: false
            },
            all : {
                files : [
                    {
                        expand: true,
                        cwd: '<%= srcBase %>',
                        src : ['<%= pageBase %>/<%= currentBase %>/**/*.js'], //, '<%= modBase %>/**/*.js'
                        dest: '<%= buildBase %>'
                    }
                ]
            }
        },

        concat: {
            /*module: {
                files : [
                    {
                        src : ['<%= srcBase %>/<%= modBase %>/native-bridge.js'],
                        dest : '<%= buildBase %>/<%= modBase %>/native-bridge.js'
                    },{
                        src : ['<%= srcBase %>/<%= modBase %>/shake.js'],
                        dest : '<%= buildBase %>/<%= modBase %>/shake.js'
                    }
                ]
            },*/
            page: {
                options: {
                    include: 'relative'
                },
                files : [
                    {
                        expand : true,
                        cwd : '<%= buildBase %>/',
                        src : '<%= pageBase %>/<%= currentBase %>/**/*.js',
                        dest : '<%= buildBase %>'
                    }
                ]
            }
            /*test: {
                src: [ './src/test/test.js' ],
                dest: './build/test/test.source.js'
            }*/
        },

        cssmin: {
            /*readburned : {
                files:{
                    '<%= buildBase %>/<%= pageBase %>/<%= currentBase %>/read-burned-quiz.css' : ['<%= srcBase %>/<%= pageBase %>/<%= currentBase %>/read-burned-quiz.css']
                }
            },*/
            year2014 : {
                files:{
                    '<%= buildBase %>/<%= pageBase %>/<%= currentBase %>/new-year-2014.css' : ['<%= srcBase %>/<%= pageBase %>/<%= currentBase %>/new-year-2014.css']
                }
            }
            /*test: {
                src: './src/test/test.css',
                dest: './build/test/test.css'
            }*/
        },

        copy: {
            /*all: {
                files:[
                    {
                        src : '<%= srcBase %>/*',
                        dest : '<%= buildBase %>/'
                    }
                ]
            },*/
            image: {
                files:[
                    {
                        expand : true,
                        cwd : '<%= srcBase %>/',
                        src : '<%= imageBase %>/**',
                        dest : '<%= buildBase %>/'
                    }
                ]
            }
        }

    });

    // concat single task.
    grunt.registerTask('default',[ 'clean'] );
    grunt.registerTask('mod',[ 'concat:mod'] );
    // grunt.registerTask('css',[ 'compass:build', 'cssmin'] );

    // Default task., build all task
    grunt.registerTask('build',[ 'clean', 'transport', 'concat', 'uglify', 'cssmin', 'copy:image' ] );
    grunt.registerTask('build-d',[ 'clean', 'transport', 'concat:page'] );
    
    // Default task., build all task
    grunt.registerTask('page',[ 'concat', 'uglify', 'cssmin:combine' ] );
    grunt.registerTask('dev', ['watch']);

    // grunt.registerTask('server',[ 'connect', 'open' ] );
    // grunt.loadNpmTasks("assemble-less");

};