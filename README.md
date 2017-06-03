# node-red-contrib-zmq
Extension module for ZMQ endpoints for Node-Red

## Reader

Supports read messages from SUB or PULL sockets in server or client mode.

Supported properties:

* **Is server** - bind or connect. For reader default is connect
* **URI** - comma separated connection strings for connecting or binding
* **Mode** - socket type: SUB or PULL
* **Topic** - for SUB socket - comma separated topics names (prefix for match messages). Topic name will be written into `topic` field.


## Writer

Supports write messages to PUB or PUSH sockets in server or client mode.
Can send `payload` as single message or as multipart if `payload` is Array.

Supported properties:

* **Is server** - bind or connect. For writer default is bind
* **URI** - comma separated connection strings for connecting or binding
* **Mode** - socket type: PUB or PUSH
* **Topic** - for PUB socket - topic name for messages. Can be override by `topic` field in message.
