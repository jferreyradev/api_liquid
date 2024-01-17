const http = require('http');
const express = require('express');
const webServerConfig = require('../config/web_server.js');
const router = require('./router.js');

let httpServer;

function initialize() {
    return new Promise((resolve, reject) => {
        const app = express();
        httpServer = http.createServer(app);
        app.use('/api', router);

        httpServer.listen(webServerConfig.port, webServerConfig.host)
            .on('listening', () => {
                console.log(`Web server listening on ${process.env.DB || "localhost"}:${process.env.PORT || 3000}`);
                resolve();
            })
            .on('error', err => {
                reject(err);
            });
    });
}

module.exports.initialize = initialize;

function close() {
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
}

module.exports.close = close;