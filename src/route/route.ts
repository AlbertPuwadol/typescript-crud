import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import { Container } from 'typedi'
import Usecase from '../usecase/usecase'


const getMovieHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const usecase = Container.get(Usecase);
  let movies
  if (request.query['title'] && request.query['release_year']) {
    movies = await usecase.getOneMovie(request.query['title'], request.query['release_year']);
  } else {
    movies = await usecase.getAllMovies();
  }
  reply.send({ status: "ok", "data" : movies });
};

const addMovieHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const body = request.body
  const usecase = Container.get(Usecase);
  const result = await usecase.addMovie(body['title'], body['release_year'], body['director'], body['rating']);
  reply.send({ status: "ok" , "result" : result });
}

const editMovieHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const body = request.body
  const usecase = Container.get(Usecase);
  const result = await usecase.editMovie(body['title'], body['release_year'], body['director'], body['rating']);
  reply.send({ status: "ok", "result" : result });
}

const deleteMovieHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const usecase = Container.get(Usecase);
  const result = await usecase.deleteMovie(request.query['title'], request.query['release_year']);
  reply.send({ status: "ok", "result" : result });
}

export default (fastify: FastifyInstance, _, done) => {
  fastify.route({
    method: "GET",
    url: "/movies",
    schema: {
      querystring: {
        type: "object",
        properties: {
          title: { type: "string" },
          release_year: { type: "number" },
        },
      },
      },
    handler: getMovieHandler
  });

  fastify.route({
    method: "POST",
    url: "/add-movie",
    schema: {
      body: {
        type: 'object',
        required: ['title', 'release_year', 'director', 'rating'],
        properties: {
          title: { type: "string" },
          release_year: { type: "number" },
          director: { type: "string" },
          rating: { type: "number" },
        }
      }
    },
    handler: addMovieHandler
  });

  fastify.route({
    method: "PATCH",
    url: "/edit-movie",
    schema: {
      body: {
        type: 'object',
        required: ['title', 'release_year'],
        properties: {
          title: { type: "string" },
          release_year: { type: "number" },
          director: { type: "string" },
          rating: { type: "number" },
        }
      }
    },
    handler: editMovieHandler
  });

  fastify.route({
    method: "DELETE",
    url: "/delete-movie",
    schema: {
      querystring: {
        type: "object",
        required: ['title', 'release_year'],
        properties: {
          title: { type: "string" },
          release_year: { type: "number" },
        },
      },
      },
    handler: deleteMovieHandler
  });

  done();
};
