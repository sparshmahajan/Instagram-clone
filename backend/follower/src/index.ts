import { app } from "./config/app";
import { config } from "dotenv";
import { envConfig } from "./config/envConfig";
import { neo4jDriver } from "./config/neo4j";
import { kafkaWrapper } from "@instagram-clone/common";
import { UserCreatedConsumer } from "./events/consumers/userCreatedConsumer";
config();

const start = async () => {
  const port = process.env.PORT || 3000;
  envConfig();
  try {
    await kafkaWrapper.connect("followers", [process.env.KAFKA_HOST!]);
    await neo4jDriver.connect();

    new UserCreatedConsumer().listen();

    //on disconnect, close the kafka connection and exit the process
    kafkaWrapper.onDisconnect();
    kafkaWrapper.onClose();
    kafkaWrapper.onSigInt();
    kafkaWrapper.onSigTerm();
    kafkaWrapper.onExit();

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
