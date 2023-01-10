"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Task_1 = require("./entities/Task");
const task_1 = require("./resolvers/task");
const express = require("express");
const app = express();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const AppDataSource = new typeorm_1.DataSource({
        type: "postgres",
        entities: [Task_1.Task],
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
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield (0, type_graphql_1.buildSchema)({
            resolvers: [task_1.TypeResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            orm: AppDataSource,
            req,
            res,
        }),
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({
        app,
    });
    app.listen(4000, () => {
        console.log("Server started on port 4000");
    });
});
main();
//# sourceMappingURL=index.js.map