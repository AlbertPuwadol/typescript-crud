"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const config_1 = require("../config");
const mongo_1 = __importDefault(require("../adapter/mongo"));
const repository_1 = __importDefault(require("../repository/repository"));
const InitContainer = () => {
    const mongoAdapter = new mongo_1.default(config_1.config.db.mongo.username, config_1.config.db.mongo.password, config_1.config.db.mongo.host, config_1.config.db.mongo.port, config_1.config.db.mongo.name, config_1.config.db.mongo.collection, config_1.config.db.mongo.auth);
    typedi_1.default.set("mongoAdapter", mongoAdapter);
    typedi_1.default.set("repository", typedi_1.default.get(repository_1.default));
    console.log("Container initialized");
};
exports.default = InitContainer;
