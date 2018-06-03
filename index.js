import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import { makeExecutableSchema } from "graphql-tools";
import path from "path";
import cors from "cors";

import models from "./models";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./types")));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
const PORT = process.env.PORT;

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5000"]
  })
);

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: { models }
  })
);
app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

models.sequelize.sync({}).then(() => {
  app.listen(PORT, () => {
    console.log(`Running server in http://localhost:${PORT}/graphiql`);
  });
});
