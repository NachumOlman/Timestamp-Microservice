

function route(pathname, response) {
  console.log("About to route a request for " + pathname);
  
  if (pathname == "/") {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("This is a Timestamp Microservice. Input either a natural language date or a UNIX timestamp.");
    response.end();
  } else {
    pathname = pathname.slice(1);
    if (isNaN(pathname) == false) {
      var  date = new Date(Number(pathname) * 1000);
      var  output = "Natural language: " + date.toDateString() + " UNIX: " + pathname;

      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write(output);
      response.end();
    } else if (new Date(decodeURI(pathname)) !== "Invalid Date") {
      var  date = new Date(decodeURI(pathname));
      var  output = "Natural language: " + date.toDateString() + " UNIX: " + Math.floor(Date.parse(decodeURI(pathname))/1000);

      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write(output);
      response.end();         
    } else {
      console.log("No request handler found for " + pathname);
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("Natural language: " + null + " UNIX: " + null);
      response.end();
    }
  }
}
    
exports.route = route;