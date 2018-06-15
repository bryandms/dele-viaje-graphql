import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const database = process.env.DB_DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(database, username, password, {
  dialect: "postgres",
  operatorsAliases: false,
  define: {
    underscored: true
  }
});

const models = {
  User: sequelize.import("./user"),
  Place: sequelize.import("./place"),
  Role: sequelize.import("./role"),
  Service: sequelize.import("./service")
};

Object.keys(models).forEach(modelName => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
