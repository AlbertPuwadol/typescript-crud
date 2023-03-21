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
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const mongodb_1 = require("mongodb");
let MongoAdapter = class MongoAdapter {
    constructor(username, password, host, port, databaseName, collectionName, authDatabase) {
        this.username = username;
        this.password = password;
        this.host = host;
        this.port = port;
        this.databaseName = databaseName;
        this.collectionName = collectionName;
        this.authDatabase = authDatabase;
    }
    async connect() {
        const uri = `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.authDatabase}`;
        this.connection = await new mongodb_1.MongoClient(uri).connect();
        this.collection = this.connection
            .db(this.databaseName)
            .collection(this.collectionName);
    }
    async close() {
        if (this.connection) {
            await this.connection.close();
        }
    }
    async getAllMovies() {
        const movies = await this.collection.find({}).toArray();
        return movies;
    }
    async getOneMovie(title, release_year) {
        const movie = await this.collection.find({ title, release_year }).toArray();
        return movie;
    }
    async updateMovie(filter, update, upsert) {
        const result = await this.collection.updateOne(filter, { $set: update }, {
            upsert
        });
        return result;
    }
    async deleteMovie(title, release_year) {
        const result = await this.collection.deleteOne({ title, release_year });
        return result;
    }
};
MongoAdapter = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [String, String, String, Number, String, String, String])
], MongoAdapter);
exports.default = MongoAdapter;
