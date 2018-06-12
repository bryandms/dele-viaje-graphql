import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import { makeExecutableSchema } from "graphql-tools";
import path from "path";
import cors from "cors";

import models from "./models";
import auth from "./auth";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./types")));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const CLIENT = process.env.CLIENT;

const app = express();
app.use(
  cors({
    origin: [CLIENT]
  })
);
app.use(auth.checkHeaders);

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(req => {
    return {
      schema,
      context: { models, SECRET, user: req.user }
    };
  })
);
app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

models.sequelize.sync({}).then(() => {
  app.listen(PORT, () => {
    console.log(`Running server`);
  });
});
