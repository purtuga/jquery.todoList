'use strict';

module.exports = function(grunt) {

    /**
     * includeFile() - embeds a file content within another. Meant to be
     * used from the copy task as a 'processContent' function. The following
     * tokens can be used in files: <br>
     *
     *  -   BUILD_INCLUDE('file')
     *  -   /* BUILD_INCLUDE('file') *\x47
     *  -   &lt;!-- BUILD_INCLUDE("file") --&gt;
     *
     * In addition, options can be added to the token above that further
     * process the file being included:
     *
     *  -   BUILD_INCLUDE('file')[option1,option2,option3]
     *
     * Supported options:
     *
     *  -   asJsString : Escapes all double-quotes and new line characters
     *                   in the file
     *
     * @param {String} fileContent
     * @param {String} filePath
     *
     * @return {String} fileContent
     *
     * @see https://gist.github.com/purtuga/85ee689f0d3d90484ce3
     *
     * @example
     *
     *  ...
     *  copy: {
     *      options: {
     *          expand: true,
     *          process: includeFile
     *      }
     *  }
     *  ...
     *
     */
    function includeFile(fileContent, filePath){

        if (fileContent.indexOf("BUILD_INCLUDE") > -1) {

            grunt.log.write("includeFile(): [" + filePath + "] has BUILD_INCLUDE: ");

            // Match:
            //      // BUILD_INCLUDE('file')
            //      /* BUILD_INCLUDE('file') */
            //      <!-- BUILD_INCLUDE("file") -->
            //
            //  Token OPtions:
            //      // BUILD_INCLUDE('file')[options,here,as,array]
            //
            //      asJsString
            //
            var re = /(?:(?:\/\/)|(?:<\!\-\-)|(?:\/\*)) {0,}BUILD_INCLUDE\(['"](.*)['"]\)(?:\[(.*)\])?/i,
                match, file, fileIncludeOptions;

            while ((match = re.exec(fileContent)) !== null) {

                grunt.log.write(".");
                grunt.verbose.writeln("    Match array: " + match );

                file = grunt.template.process( match[1] );

                grunt.verbose.writeln("    File to embed: " + file );

                file = grunt.file.read( file );

                // If options were set, then parse them
                if (match[2]) {

                    fileIncludeOptions = match[2].split(',');

                    // If option: asJsString
                    if (
                        fileIncludeOptions.some(function(option){
                            return String(option).toLowerCase() === "asjsstring";
                        })
                    ) {

                        file = file
                                .replace(/\"/g, '\\x22')
                                .replace(/\'/g, '\\x27')
                                .replace(/\r\n|\n/g, "\\n");

                    }


                }

                fileContent = fileContent.replace(match[0], function(){ return file; });

            }
            grunt.log.writeln("");
            return fileContent;

        }

        return fileContent;

    } //end: includeFile()

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg : grunt.file.readJSON('todoList.jquery.json'),
        banner : '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        clean : {
            files : [
                'dist'
            ],
            tmp: [
                'dist/jquery.<%= pkg.name %>.css'
            ]
        },
        concat : {
            options : {
                banner : '<%= banner %>',
                stripBanners : true
            },
            dist : {
                src : ['src/jquery.<%= pkg.name %>.js'],
                dest : 'dist/jquery.<%= pkg.name %>.js'
            },
        },
        less: {
            dist: {
                options: {
                    compress: true
                },
                files: {
                    'dist/jquery.<%= pkg.name %>.css': 'src/jquery.<%= pkg.name %>.less'
                }
            }
        },
        copy: {
            build: {
                options: {
                    expand: true,
                    process: includeFile
                },
                files: {
                    "<%= concat.dist.dest %>": "<%= concat.dist.dest %>"
                }
            }
        },
        uglify : {
            options : {
                banner : '<%= banner %>'
            },
            dist : {
                src : '<%= concat.dist.dest %>',
                dest : 'dist/jquery.<%= pkg.name %>.min.js'
            },
        },
        qunit : {
            files : ['test/**/*.html']
        },
        jshint : {
            options : {
                jshintrc : ".jshintrc"
            },
            gruntfile : {
                src : 'Gruntfile.js'
            },
            src : {
                src : ['src/**/*.js']
            },
            test : {
                src : ['test/**/*.js']
            },
        },
        watch : {
            gruntfile : {
                files : '<%= jshint.gruntfile.src %>',
                tasks : ['jshint:gruntfile']
            },
            src : {
                files : [
                    'src/**/*'
                ],
                tasks : ['jshint:src', 'build', 'qunit']
            },
            test : {
                files : '<%= jshint.test.src %>',
                tasks : ['jshint:test', 'qunit']
            }
        },
        connect: {
            server: {
                options: {
                    keepalive: true
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task.
    grunt.registerTask('default', [
        'jshint',
        /* 'qunit', */
        'clean',
        'build',
        'uglify',
        'clean:tmp'
    ]);


    // build
    grunt.registerTask('build', [
        'concat',
        'less',
        'copy'
    ]);

};
