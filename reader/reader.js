var zmq = require('zmq');

module.exports = function(RED) {
  function Reader(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    var sock = zmq.socket(config.mode);

    if (config.server) {
      sock.bindSync(config.uri);
    } else {
      sock.connect(config.uri);
    }
    if (config.mode === "sub") {
      var tps = config.topics.split(",").map(function(x) {
        return x.trim();
      }).filter(function(x) {
        return x.length > 0;
      }).map(function(x) {
        sock.subscribe(x);
      });
      if (tps.length == 0)
        sock.subscribe("");
    }
    sock.on('message', function() {
      var parts = [];
      for (var i = 0; i < arguments.length; ++i) {
        parts.push(arguments[i].toString());
      }
      node.send({
        payload: parts
      });
    });
    sock.on('error', function(err) {
      node.error(err);
    });
    node.on('close', function() {
      sock.close();
    });
  }
  RED.nodes.registerType("zmq-reader", Reader);
}