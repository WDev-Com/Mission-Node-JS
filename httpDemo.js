const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: "hello",
      })
    );
  } else if (req.url === "/demo") {
    res.writeHead(200, { "content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: "Demo ",
      })
    );
  }
});

server.listen(8081, () => {
  console.log("Server Is Listing 8081");
});

module.exports = server;
