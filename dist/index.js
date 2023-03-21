"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const fastify_1 = require("fastify");
const config_1 = require("./config");
const container_1 = __importDefault(require("./container"));
const route_1 = __importDefault(require("./route/route"));
(0, container_1.default)();
const server = (0, fastify_1.fastify)();
server.get("/ping", async (request, reply) => {
    return "pong\n";
});
server.register(route_1.default);
server.listen({ port: config_1.config.app.port }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
