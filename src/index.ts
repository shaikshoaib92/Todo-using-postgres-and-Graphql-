import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import { Task } from "./entities/Task";
import { TypeResolver } from "./resolvers/task";

const express = require("express");
const app = express();

const main = async () => {
  const AppDataSource = new DataSource({
    type: "postgres",
    entities: [Task],
    host: "localhost",
    username: "postgres",
    password: "210000ab",
    database: "todo",
    synchronize: true,
    logging: true,
  });

  AppDataSource.initialize()
    .then(() => {
      console.log("Connection established");
    })
    .catch((error) => {
      console.error("Something went wrong", error);
    });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TypeResolver],
      validate: false,
    }),
    context: ({ req, res }: any) => ({
      orm: AppDataSource,
      req,
      res,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
  });

  app.listen(4000, () => {
    console.log("Server started on port 4000");
  });
};

main();
