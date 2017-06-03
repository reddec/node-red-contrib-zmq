var lib = require('../common');

module.exports = function (RED) {
    function Writer(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var sock;
        try {
            sock = lib.createSocket(config.mode, lib.asList(config.uri), config.server);
        } catch (e) {
            console.error(e);
            node.status({fill: "red", text: e + ''});
            return;
        }

        if (config.server) {
            node.status({fill: "green", text: "bound"});
        } else {
            node.status({fill: "green", text: "connected"});
        }

        sock.on('error', function (err) {
            node.error(err);
        });
        node.on('close', function () {
            sock.close();
        });

        node.on('input', function (msg) {

            var payload = msg.payload;
            if (!payload) return;
            if (!Array.isArray(payload)) {
                payload = [payload];
            }
            if (config.mode === 'pub') {
                payload = [msg.topic || config.topic].concat(payload);
            }
            sock.send(payload);
        });
    }

    RED.nodes.registerType("zmq-writer", Writer);
};