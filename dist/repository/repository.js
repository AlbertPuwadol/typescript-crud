"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
let Repository = class Repository {
    constructor(mongoAdapter) {
        this.mongoAdapter = mongoAdapter;
    }
    async getAllMovies() {
        try {
            await this.mongoAdapter.connect();
            let movies = await this.mongoAdapter.getAllMovies();
            movies = movies.map((movie) => {
                const { _id, ...result } = movie;
                return result;
            });
            return movies;
        }
        finally {
            await this.mongoAdapter.close();
        }
    }
    async getOneMovie(title, release_year) {
        try {
            await this.mongoAdapter.connect();
            const movie = await this.mongoAdapter.getOneMovie(title, release_year);
            const { _id, ...result } = movie[0] || {};
            return result;
        }
        finally {
            await this.mongoAdapter.close();
        }
    }
    async addMovie(title, release_year, director, rating) {
        try {
            const _id = `${title.replaceAll(" ", "-")}_${release_year}`;
            const filter = { _id };
            const update = {
                _id,
                title,
                release_year,
                director,
                rating,
            };
            await this.mongoAdapter.connect();
            const result = await this.mongoAdapter.updateMovie(filter, update, true);
            return result;
        }
        finally {
            await this.mongoAdapter.close();
        }
    }
    async editMovie(title, release_year, director, rating) {
        try {
            const _id = `${title.replaceAll(" ", "-")}_${release_year}`;
            const filter = { _id };
            let update = {};
            if (director) {
                update = { ...update, director };
            }
            if (rating) {
                update = { ...update, rating };
            }
            await this.mongoAdapter.connect();
            const result = await this.mongoAdapter.updateMovie(filter, update, false);
            return result;
        }
        finally {
            await this.mongoAdapter.close();
        }
    }
    async deleteMovie(title, release_year) {
        try {
            await this.mongoAdapter.connect();
            const result = await this.mongoAdapter.deleteMovie(title, release_year);
            return result;
        }
        finally {
            await this.mongoAdapter.close();
        }
    }
};
Repository = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("mongoAdapter")),
    __metadata("design:paramtypes", [Object])
], Repository);
exports.default = Repository;
