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
let UseCase = class UseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async getAllMovies() {
        const movies = await this.repository.getAllMovies();
        return movies;
    }
    async getOneMovie(title, release_year) {
        const movie = await this.repository.getOneMovie(title, release_year);
        return movie;
    }
    async addMovie(title, release_year, director, rating) {
        const result = await this.repository.addMovie(title, release_year, director, rating);
        return result;
    }
    async editMovie(title, release_year, director, rating) {
        const result = await this.repository.editMovie(title, release_year, director, rating);
        return result;
    }
    async deleteMovie(title, release_year) {
        const result = await this.repository.deleteMovie(title, release_year);
        return result;
    }
};
UseCase = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('repository')),
    __metadata("design:paramtypes", [Object])
], UseCase);
exports.default = UseCase;
