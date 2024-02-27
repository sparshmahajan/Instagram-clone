require("dotenv").config();
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { join } from "path";

const sequelizeOptions: SequelizeOptions = {
  models: [join(__dirname, "..", "models") + "**/*.sequelize.*"],
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  retry: {
    match: [
      /ETIMEDOUT/,
      /EHOSTUNREACH/,
      /ECONNRESET/,
      /ECONNREFUSED/,
      /ETIMEDOUT/,
      /ESOCKETTIMEDOUT/,
      /EHOSTUNREACH/,
      /EPIPE/,
      /EAI_AGAIN/,
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
    ],
    max: 3,
  },
};

export const sequelize = new Sequelize(process.env.DB_URL!, sequelizeOptions);

export const sequelizeConnect = async () => {
  try {
    //drop all tables
    // await sequelize.drop();
    //sync all tables
    await sequelize.sync({ alter: true });
    //print all tables
    await sequelize.authenticate();
    console.log("Database Connected successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    throw err;
  }
};
