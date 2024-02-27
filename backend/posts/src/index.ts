import { app } from "./config/app";
import { config } from "dotenv";
import { sequelizeConnect } from "./config/sequelize";
import { envConfig } from "./config/envConfig";
import { kafkaWrapper } from "@instagram-clone/common";
import { UserCreatedConsumer } from "./events/consumers/userCreatedConsumer";
import { UserFollowedConsumer } from "./events/consumers/userFollowedConsumer";
import { UserUnfollowedConsumer } from "./events/consumers/userUnfollowedConsumer";
import { CommentCreatedConsumer } from "./events/consumers/commentCreatedConsumer";
import { CommentDeletedConsumer } from "./events/consumers/commentDeletedConsumer";
config();

const start = async () => {
  const port = process.env.PORT || 3000;
  envConfig();
  try {
    await sequelizeConnect();
    await kafkaWrapper.connect("posts", [process.env.KAFKA_HOST!]);

    new UserCreatedConsumer().listen();
    new UserFollowedConsumer().listen();
    new UserUnfollowedConsumer().listen();
    new CommentCreatedConsumer().listen();
    new CommentDeletedConsumer().listen();

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
