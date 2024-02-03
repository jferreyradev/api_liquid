const http = require('http');
const https = require('https');
const express = require('express');
const webServerConfig = require('../config/web_server.js');
const router = require('./router.js');
const fs = require("fs");

let httpServer;
let httpsServer;

const keypem = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAs7LWPRZabHNJpul8Z7GbORePGmxRQqB/wNwCCXW0yQiPv89M
9Ji6RLcg6mAOpaznSMoDYom73HBMvAezLbZmp9r8J5rTHodVIZndSNP1IqR6+Dqj
tLyYNaf0pGRbpz1ySDIyGZZl1s9kLUIxfNNzPpbDB3gnVa0mJXt21ajaDQnkHBYY
ugltgCtezPsDJRrZN/8EIBiAiHXSXJyzloKC7MFvqBpbK5NAEMrl/g8lkKKlxOkU
iakf68za8tocXPzryysBANQkEGDMhmKHr13wh77QoIxr2nD0VmSWtBcR/X7nWPNL
XchV8PHg1Zwdn6HPUrjcMz6ahFonKtCXVECciQIDAQABAoIBAEqlh4lot7dFTNsh
MqSAitJ0juWTCU58DZW3zsDPPIImJFCxdG5G41mYGPxDWtJHuOvrvuw3+unfXIDf
UfczRgGEXiq1je2omhyTJfES20nAubRT5500mqXvVxjS95/JTqfe8iDe8P8Ct8J1
NMl9rOnbBrkbmHtmqen4F605rxqqxoHQxGvZG/5qMfs1AO/RhORyKoObiiqL9kAY
yDfpWWmdEKioh13fmYq6aeEQ3xbPrBSvOIX6OJ+t2zIlpUrp187dZWSttugQaHG8
MFOVss1qRNt+iADtG0pSOEnVzkxgfSTK8oZw/7je0WM85KxGBURahmK66FhSfnls
CFKTJAECgYEA5t4JolIyLlCHLqu+noQbKgQRVK66VrPHhfFoQ7bCJC2MbDfXFfps
WyAxd2KyuCqF93fK6fqr0O3G5lY/lITozeqgMTQsYXFn6slT5Byq92TWuJhl/RM8
DEF7Zh/L+H5YGcax4+zmq1vyjAohGg6tLXiDjNXZvPpTsVc6bIO1btECgYEAx0LL
e3pLeaR8sJFo9tOHWdanqHe0i7hWbM3DJBz42os9MR+IQP6Ii59kM+WCfbntaSBA
RUpuY5Y5KJgVAbUuWHkOHosaTGJFFSyTjAdlWnOnTSnlQKsshEKFttKZj5VuLgnx
JHmmZ3YXrwx+UyVuCQrh7pKRXw0Llkm+7J1H8DkCgYApCTSLLrMOum+c4xgp0u+F
I131QG2Mtb30V/mhd53AknwQTEil9nJGLE2+m8OKqrxPRXLC7jSWGX2uOYxpmMpM
t7SrqkttMpw3Bnwr4tCc0sa73xLZzg5xWz5U47f8vnBofIHoMpa5xMkzDSXfHNa5
a19urCBcz94Keqe+3BZm0QKBgQCwsRhC/CTlTuiKocaT6OrCzUeKaeudYe6xOJxr
74z0Ljgq0S0/hPWL6eEu67uUxUQyzjhvuRq+ED3LM2CdTQ41wdK1XuAJD7L2nbqQ
lxZW6OtXz2jMuX0WIu7zOTiWTAmRpZtBnuXiJKPHw6pZDH3QYugJZ8qkoKq/r9Ev
fCCIcQKBgQCu7BeaoEJ3YGD+gjRL6qLZvjEKkdu0JXQjlEPpd+xl23RZ9+t2euXE
ai/rEQz+RvXm/ISzZOUhKp8Em9SQW/pIgFmzdbHlLGhNGhKdImWXQRX/Fabn4hN2
OOIfAm1Sxl4g1vkNbJLW+lyEPecSscvqa97+KYKshNlXsg5zmbpn7g==
-----END RSA PRIVATE KEY-----`;

const certpem = `-----BEGIN CERTIFICATE-----
MIIDyzCCArOgAwIBAgIUe7W+o/9H9l4SjR7XRQ0ODZV4M/QwDQYJKoZIhvcNAQEL
BQAwdTELMAkGA1UEBhMCQVIxEDAOBgNVBAgMB1R1Y3VtYW4xEzARBgNVBAcMClNh
biBNaWd1ZWwxITAfBgNVBAoMGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDEcMBoG
A1UEAwwTSm9zw4PCqSBSLiBGZXJyZXlyYTAeFw0yNDAyMDExNjU0NTBaFw0yNTAx
MzExNjU0NTBaMHUxCzAJBgNVBAYTAkFSMRAwDgYDVQQIDAdUdWN1bWFuMRMwEQYD
VQQHDApTYW4gTWlndWVsMSEwHwYDVQQKDBhJbnRlcm5ldCBXaWRnaXRzIFB0eSBM
dGQxHDAaBgNVBAMME0pvc8ODwqkgUi4gRmVycmV5cmEwggEiMA0GCSqGSIb3DQEB
AQUAA4IBDwAwggEKAoIBAQCzstY9Flpsc0mm6XxnsZs5F48abFFCoH/A3AIJdbTJ
CI+/z0z0mLpEtyDqYA6lrOdIygNiibvccEy8B7Mttman2vwnmtMeh1Uhmd1I0/Ui
pHr4OqO0vJg1p/SkZFunPXJIMjIZlmXWz2QtQjF803M+lsMHeCdVrSYle3bVqNoN
CeQcFhi6CW2AK17M+wMlGtk3/wQgGICIddJcnLOWgoLswW+oGlsrk0AQyuX+DyWQ
oqXE6RSJqR/rzNry2hxc/OvLKwEA1CQQYMyGYoevXfCHvtCgjGvacPRWZJa0FxH9
fudY80tdyFXw8eDVnB2foc9SuNwzPpqEWicq0JdUQJyJAgMBAAGjUzBRMB0GA1Ud
DgQWBBR0NNCAkQGrdhhGf6Zb3k8sbWMGyDAfBgNVHSMEGDAWgBR0NNCAkQGrdhhG
f6Zb3k8sbWMGyDAPBgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQCs
x5ZFwVDvLpni3+s0aOvUH98fFH8nIqAZi2gYBanzA4He9hesGPY2IiZweEW5Tn23
Kc3HRkyex9ZnqDsRvoYxm+o7qtSr75Uav//IW1XIeUeqOvn5ZtMbzGPupLp3XLSX
b2FhLlTJ4EXItbw0Pn8Pnn51Mw0tJXHtCOTO1xrLri8D3bP4AUFBJI2RWEU32oPY
hAOIHowjZ0b3Bw3mVJu+N1636/lOowjsqDPfQ1VdC9KSFTOp7m8JrY5URuqQg8ys
0pdzmUbKQs7EAT2RcgLH+65E0FU2N4m8/aJccHHJsenpq+R5sQN/AWtCEHQX31Sj
fm3ugQuHq/ljeus/f0Fw
-----END CERTIFICATE-----`

function initialize() {
    return new Promise((resolve, reject) => {

        //const key = fs.readFileSync('../key.pem', 'utf8');
        //const cert = fs.readFileSync('../cert.pem', 'utf8');

        //const privateKey = fs.readFileSync('server.key', 'utf8').toString();
        //const certificate = fs.readFileSync('server.crt', 'utf8').toString();

        const credentials = {key: keypem, cert: certpem};

        const app = express();
        httpServer = http.createServer(app);

        httpsServer = https.createServer(credentials, app);

        app.use('/api', router);

        
        httpServer.listen(webServerConfig.port, webServerConfig.host)
            .on('listening', () => {
                console.log(`Web http server listening on ${process.env.CONNECTIONSTRING}:${process.env.HTTP_PORT}`);
                resolve();
            })
            .on('error', err => {
                reject(err);
            });
            

        httpsServer.listen(webServerConfig.port_https, webServerConfig.host)
            .on('listening', () => {
                console.log(`Web https server listening on ${process.env.CONNECTIONSTRING}:${process.env.HTTPS_PORT}`);
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
        httpsServer.close((err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

module.exports.close = close;