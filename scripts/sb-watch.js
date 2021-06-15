'use strict';

const _ = require('lodash');
const chokidar = require('chokidar');
const upath = require('upath');
const renderAssets = require('./render-assets');
const renderHTML = require('./render-html');
// const renderPug = require('./render-pug');
const renderSCSS = require('./render-scss');
const renderScripts = require('./render-scripts');

const watcher = chokidar.watch('src', {
    persistent: true,
});

let READY = false;

process.title = 'pug-watch';
process.stdout.write('Loading');
// let allPugFiles = {};

watcher.on('add', filePath => _processFile(upath.normalize(filePath), 'add'));
watcher.on('change', filePath => _processFile(upath.normalize(filePath), 'change'));
watcher.on('ready', () => {
    READY = true;
    console.log(' READY TO ROLL!');
});

_handleSCSS();
_handleHTML();

function _processFile(filePath, watchEvent) {

    // if (!READY) {
    //     if (filePath.match(/\.pug$/)) {
    //         if (!filePath.match(/includes/) && !filePath.match(/mixins/) && !filePath.match(/\/pug\/layouts\//)) {
    //             allPugFiles[filePath] = true;
    //         }    
    //     }    
    //     process.stdout.write('.');
    //     return;
    // }

    console.log(`### INFO: File event: ${watchEvent}: ${filePath}`);

    if (filePath.match(/\.html/)) {
        if (watchEvent === 'change') {
            return _handleHTML(filePath, watchEvent);
        }
        return
    }

    if (filePath.match(/\.scss$/)) {
        if (watchEvent === 'change') {
            return _handleSCSS(filePath, watchEvent);
        }
        return;
    }

    if (filePath.match(/\.js/)) {
        if (watchEvent === 'change') {
            return _handleScripts(filePath, watchEvent);
        }
        return;
    }

    if (filePath.match(/src\/assets\//)) {
        return renderAssets();
    }

}

// function _handlePug(filePath, watchEvent) {
//     if (watchEvent === 'change') {
//         if (filePath.match(/includes/) || filePath.match(/mixins/) || filePath.match(/\/pug\/layouts\//)) {
//             return _renderAllPug();
//         }
//         return renderPug(filePath);
//     }
//     if (!filePath.match(/includes/) && !filePath.match(/mixins/) && !filePath.match(/\/pug\/layouts\//)) {
//         return renderPug(filePath);
//     }
// }

// function _renderAllPug() {
//     console.log('### INFO: Rendering All');
//     _.each(allPugFiles, (value, filePath) => {
//         renderPug(filePath);
//     });
// }

function _handleHTML(){
    renderHTML();
}

function _handleSCSS() {
    renderSCSS();
}

function _handleScripts() {
    renderScripts();
}