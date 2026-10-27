import {RateLimiter } from "./rateLimiter.js";
import http from "http";
const fooLimiter = new RateLimiter(5,10000);
const barLimiter = new RateLimiter(2,5000);
const server = http.createServer((request, response) => {
    console.log(request.url);
    const ipAdress= request.socket.remoteAddress;
   
    if(request.url === "/favicon.ico"){
        response.end("");
        return;
    }
    const key = `${request.url}-${ipAdress}`;
    if(request.url === "/foo")
    {
        if(!fooLimiter.isAllowed(key))
        {
             response.writeHead(429);
             response.end("429 too many requests");
             return;   
        }
        response.end("foo ok");
        return;
    }
    if(request.url === "/bar")
    {
        if(!barLimiter.isAllowed(key))
        {
            response.writeHead(429);
            response.end("429 too many requests");
            return;
        }
        response.end("bar ok");
        return;
    }
  response.writeHead(404)
  response.end("not found");   
}).listen(8080);