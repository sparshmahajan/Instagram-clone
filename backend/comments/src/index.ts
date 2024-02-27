import { app } from "./config/app";
import { config } from "dotenv";
import { sequelizeConnect } from "./config/sequelize";
import { envConfig } from "./config/envConfig";
import { kafkaWrapper } from "@instagram-clone/common";
import { UserCreatedConsumer } from "./events/consumers/userCreatedConsumer";
import { UserFollowedConsumer } from "./events/consumers/userFollowedConsumer";
import { UserUnfollowedConsumer } from "./events/consumers/userUnfollowedConsumer";
import { PostCreatedConsumer } from "./events/consumers/postCreatedConsumer";
config();

const start = async () => {
  const port = process.env.PORT || 3000;
  envConfig();
  try {
    await sequelizeConnect();
    await kafkaWrapper.connect("comments", [process.env.KAFKA_HOST!]);

    new UserCreatedConsumer().listen();
    new UserFollowedConsumer().listen();
    new UserUnfollowedConsumer().listen();
    new PostCreatedConsumer().listen();

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
