var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var data = '';


module.exports = function(request, response) {
  //console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;

  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "application/json";

  var sendResponse = function(res, data, statusCode) {
    statusCode = statusCode || 200;
    res.writeHead(statusCode, headers);
    res.end(JSON.stringify(data));
  }

  var methods = {
    GET: function(req, res) {
      var data = {result: 'GET request made'};
      sendResponse(data, headers);
    },
    POST: function(req, res) {
      var successData = {result: 'POST request made'};
      sendResponse(successData, headers, 201);
    },
    OPTIONS: function(req, res) {
      sendResponse(res, null);
    }
  };
};






