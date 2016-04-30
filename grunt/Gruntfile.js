module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        htmlmin: {                                  
            dist: {                                      
                options: {                                 
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   
                    '../index.html'         : '../index.html',
                    '../download.html'      : '../download.html',
                    '../documentation.html' : '../documentation.html',
                    '../contact.html'       : '../contact.html',
                    '../404.html'           : '../404.html',

                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.registerTask('default', ['htmlmin']);

};