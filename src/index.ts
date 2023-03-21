import "reflect-metadata";
import { fastify } from "fastify";
import { config } from "./config";
import InitContainer from "./container";
import route from "./route/route";

InitContainer();

const server = fastify();

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.register(route);

server.listen({ port: config.app.port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
