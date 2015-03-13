#!/usr/bin/env node

var directory = process.cwd();
var prompt = require('prompt');
var fs = require('fs');
var read = fs.readFileSync;
var mkdirp = require('mkdirp');

var template = read(__dirname + '/componentTemplate.js', 'utf8');
var filename; 
var styleExists = false;

var init = function(){
    prompt.start();

    var schema = {
        properties: {
            name : {
                description: 'What would you like to name your component?',
                type: 'string',
                pattern: /^[$A-Z_][0-9A-Z_$]*$/i,
                message: 'Name must start with a letter and have no spaces',
                default: 'main',
                required: true
            },
        }
    };

    prompt.get(schema, function (err, result) {
        if (err) { return onErr(err) }
        filename = result.name;
        write(filename);
    });

    function onErr(err){
        console.log(err);
        return 1;
    }


    function capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    }

    function write(filename){
        mkdirp(directory + '/style', function (err) {
            if (err) console.error(err)
            else console.log('writing style directory');
            fs.writeFile('styles/' + capitalize(filename) + '.scss', '', function (err) {
                if (err) return console.log(err);
                console.log(filename + ' > style/' + capitalize(filename) + '.scss');
            });
        });

        template = template.replace(/{{displayName}}/g,capitalize(filename));

        fs.writeFile(capitalize(filename) + '.js', template, function (err) {
            if (err) return console.log(err);
            console.log(filename + ' > ' + filename + '.js');
        });
    }
}

module.exports = init(); 
