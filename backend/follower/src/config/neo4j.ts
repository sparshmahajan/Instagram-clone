import { driver, auth, Driver } from "neo4j-driver";
import { config } from "dotenv";
config();

class Neo4jDriver {
  private _driver: Driver;

  constructor() {
    this._driver = driver(
      process.env.NEO4J_URI!,
      auth.basic(process.env.NEO4J_USER!, process.env.NEO4J_PASSWORD!)
    );
  }

  get driver() {
    return this._driver;
  }

  async close() {
    await this._driver.close();
  }

  async connect() {
    try {
      await this._driver.verifyAuthentication();
      console.log("Neo4j connected");
    } catch (err) {
      console.error("Error connecting to Neo4j", err);
      process.exit(-1);
    }
  }
}

export const neo4jDriver = new Neo4jDriver();
