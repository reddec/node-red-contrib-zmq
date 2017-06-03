/**
 * Created by baryshnikov on 03.06.17.
 */
var zmq = require('zeromq');

function asList(text) {
    return text.split(",").map(function (x) {
        return x.trim();
    }).filter(function (x) {
        return x.length > 0;
    });
}

function createSocket(mode, endpoints, isServer) {
    var sock = zmq.socket(mode);
    var action;
    if (isServer) {
        action = sock.bindSync.bind(sock);
    } else {
        action = sock.connect.bind(sock);
    }
    endpoints.forEach(action);
    return sock;
}


module.exports = {
    asList: asList,
    createSocket: createSocket
};