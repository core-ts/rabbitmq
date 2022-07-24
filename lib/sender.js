"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connect_1 = require("./connect");
function createSender(config) {
  return new Sender(config);
}
exports.createSender = createSender;
exports.createProducer = createSender;
exports.createWriter = createSender;
exports.createPublisher = createSender;
var Sender = /** @class */ (function () {
  function Sender(config) {
    this.config = config;
    this.send = this.send.bind(this);
    this.publish = this.publish.bind(this);
    this.put = this.put.bind(this);
    this.write = this.write.bind(this);
    this.produce = this.produce.bind(this);
  }
  Sender.prototype.send = function (data, attributes) {
    var _this = this;
    return connect_1.getChannel(this.config).then(function (channel) {
      return channel.sendToQueue(_this.config.queue, Buffer.from(connect_1.toString(data)), { headers: attributes });
    });
  };
  Sender.prototype.put = function (data, attributes) {
    return this.send(data, attributes);
  };
  Sender.prototype.write = function (data, attributes) {
    return this.send(data, attributes);
  };
  Sender.prototype.produce = function (data, attributes) {
    return this.send(data, attributes);
  };
  Sender.prototype.publish = function (data, attributes) {
    return this.send(data, attributes);
  };
  return Sender;
}());
exports.Sender = Sender;
