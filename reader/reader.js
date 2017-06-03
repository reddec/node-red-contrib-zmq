var lib = require('../common');

module.exports = function (RED) {
    function Reader(config) {
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

        if (config.mode === "sub") {
            var topics = lib.asList(config.topics);
            if (topics.length > 0) {
                topics.forEach(function (x) {
                    sock.subscribe(x);
                });
            } else {
                // to all
                sock.subscribe("");
            }
        }
        sock.on('message', function () {
            var parts = [];
            var msg = {};
            for (var i = 0; i < arguments.length; ++i) {
                parts.push(arguments[i].toString());
            }
            if (config.mode === 'sub') {
                msg.topic = parts.shift();
            }
            msg.payload = parts;
            node.send(msg);
        });
        sock.on('error', function (err) {
            node.error(err);
        });
        node.on('close', function () {
            sock.close();
        });
    }

    RED.nodes.registerType("zmq-reader", Reader);
};