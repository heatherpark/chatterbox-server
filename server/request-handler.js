var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;

  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "application/json";

  var data = '';

  if (request.method === 'GET') {

    response.writeHead(statusCode, headers);
    response.end(JSON.stringify({results: [data]}));

  } else if (request.method === 'POST') {
    request.on('data', function(chunk) {
      data += chunk;
    });
    request.on('end', function() {
      data = JSON.parse(data);
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(headers));
    });
  }
};






