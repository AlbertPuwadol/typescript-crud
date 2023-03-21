"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getMovieHandler = (request, reply) => {
    reply.send({ status: "get movies ok" });
};
exports.default = (fastify, _, done) => {
    fastify.route({
        method: "GET",
        url: "/movies",
        handler: getMovieHandler
    });
    fastify.route({
        method: "POST",
        url: "/add-movie",
        handler: (request, reply) => {
            reply.send({ status: "add movie ok" });
        },
    });
    fastify.route({
        method: "PATCH",
        url: "/edit-movie",
        handler: (request, reply) => {
            reply.send({ status: "edit movie ok" });
        },
    });
    fastify.route({
        method: "DELETE",
        url: "/delete-movie",
        handler: (request, reply) => {
            reply.send({ status: "delete movie ok" });
        },
    });
    done();
};
