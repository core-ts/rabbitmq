"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var callback_api_1 = require("amqplib/callback_api");
function getChannel(config) {
  return new Promise(function (resolve, reject) {
    var cf;
    if (config.url) {
      cf = config.url;
    }
    else if (config.connect) {
      cf = config.connect;
    }
    else {
      throw new Error('MQ config does not exist');
    }
    callback_api_1.connect(cf, function (er1, conn) {
      if (er1) {
        reject(er1);
      }
      conn.createChannel(function (er2, ch) {
        if (er2) {
          reject(er2);
        }
        ch.assertQueue(config.queue, { durable: false });
        resolve(ch);
      });
    });
  });
}
exports.getChannel = getChannel;
function connect(config) {
  return new Promise(function (resolve, reject) {
    callback_api_1.connect(config, function (err, conn) {
      if (err) {
        reject(err);
      }
      resolve(conn);
    });
  });
}
exports.connect = connect;
function toString(v, attributes) {
  if (attributes) {
    var ks = Object.keys(attributes);
    if (ks.length > 0) {
      if (typeof v === 'string') {
        return v + JSON.stringify(attributes);
      }
      else {
        return JSON.stringify(v) + ' ' + JSON.stringify(attributes);
      }
    }
    else {
      return ts(v);
    }
  }
  else {
    return ts(v);
  }
}
exports.toString = toString;
function ts(v) {
  if (typeof v === 'string') {
    return v;
  }
  else {
    return JSON.stringify(v);
  }
}
