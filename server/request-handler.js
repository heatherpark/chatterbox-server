
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var headers = defaultCorsHeaders;
headers['Content-Type'] = "application/json";

var sendResponse = function(res, data, statusCode) {
  statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(data));
};

var messages = [];
var messageId = 1;

var methods = {
  GET: function(req, res) {
    sendResponse(res, {results: messages});
  },
  POST: function(req, res) {
    collectData(req, function(data) {
      data.messageId = messageId++;
      messages.push(data);
      sendResponse(res, {messageId: data.messageId}, 201);
    });
  },
  OPTIONS: function(req, res) {
    sendResponse(res, null);
  }
};

var collectData = function(req, cb) {
  var data = '';
  req.on('data', function(chunk) {
    data += chunk;
  });
  req.on('end', function() {
    cb(JSON.parse(data));
  });
};




module.exports = function(request, response) {
  //console.log("Serving request type " + request.method + " for url " + request.url);
  if (methods[request.method]) {
    var method = methods[request.method];
    method(request, response);
  } else {
    sendResponse(response, {error: 'NOT FOUND'}, 404);
  }
};






