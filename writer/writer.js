var zmq = require('zmq');

module.exports = function(RED) {
  function Writer(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    var sock = zmq.socket(config.mode);

    if (config.server) {
      sock.bindSync(config.uri);
    } else {
      sock.connect(config.uri);
    }
    sock.on('error', function(err) {
      node.error(err);
    });
    node.on('close', function() {
      sock.close();
    });
    node.on('input', function(msg) {
      var payload = msg.payload;
      if (!payload) return;
      if (!Array.isArray(payload)) {
        payload = [payload];
      }
      sock.send(payload);
    });
  }
  RED.nodes.registerType("zmq-writer", Writer);
}