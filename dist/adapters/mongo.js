"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class MongoAdapter {
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
    async getOneMovie(id) {
        const movie = await this.collection.find({ id }).toArray();
        return movie;
    }
}
