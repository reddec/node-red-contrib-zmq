/**
 * Created by baryshnikov on 03.06.17.
 */
var zmq = require('zeromq');
/**
 * Convert comma-separated text to array with trimming and removing empty items
 * @param {String} text
 * @return {Array.<String>}
 */
function asList(text) {
    return text.split(",").map(function (x) {
        return x.trim();
    }).filter(function (x) {
        return x.length > 0;
    });
}

/**
 * Create ZMQ socket and bind/connect to multiple endpoints
 * @param {String} mode ZMQ socket type
 * @param {Array.<String>} endpoints list of ZMQ endpoints
 * @param {Boolean} isServer Bind if server, else connect (default - connect)
 * @return {zmq.socket}
 */
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