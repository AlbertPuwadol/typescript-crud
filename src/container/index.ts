import Container from "typedi";

import { config } from "../config";
import MongoAdapter from "../adapter/mongo";
import Repository from "../repository/repository";

const InitContainer = (): void => {
  const mongoAdapter = new MongoAdapter(
    config.db.mongo.username,
    config.db.mongo.password,
    config.db.mongo.host,
    config.db.mongo.port,
    config.db.mongo.name,
    config.db.mongo.collection,
    config.db.mongo.auth
  );

  Container.set("mongoAdapter", mongoAdapter);
  Container.set("repository", Container.get(Repository));
  console.log("Container initialized");
};

export default InitContainer;
