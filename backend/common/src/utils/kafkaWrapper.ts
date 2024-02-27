import {
  Kafka,
  KafkaConfig,
  PartitionAssigners,
  Partitioners,
  logLevel,
} from "kafkajs";
import { config } from "dotenv";
config();

class KafkaWrapper {
  private _kafka: Kafka | undefined;

  get kafka() {
    if (!this._kafka) {
      throw new Error("Kafka cannot be accessed before connecting");
    }
    return this._kafka;
  }

  connect(clientId: string, brokers: string[]) {
    const kafkaConfig: KafkaConfig = {
      clientId,
      brokers,
      ssl: true,
      sasl: {
        mechanism: "scram-sha-512",
        username: process.env.KAFKA_USER!,
        password: process.env.KAFKA_PASS!,
      },
      logLevel:
        process.env.LOG_LEVEL === "DEBUG"
          ? logLevel.DEBUG
          : process.env.LOG_LEVEL === "INFO"
          ? logLevel.INFO
          : logLevel.NOTHING,
    };
    this._kafka = new Kafka(kafkaConfig);

    return new Promise((resolve, reject) => {
      this._kafka!.admin({})
        .connect()
        .then(async () => {
          console.log(`Connected to Kafka with client ID: ${clientId}`);
          resolve(true);
        })
        .catch((err) => {
          console.error("Error connecting to Kafka", err);
          reject(false);
        });
    });
  }

  admin() {
    return this.kafka.admin();
  }

  consumer(groupId: string) {
    return this.kafka.consumer({
      groupId,
      allowAutoTopicCreation: true,
      partitionAssigners: [PartitionAssigners.roundRobin],
      heartbeatInterval: 3000,
      rebalanceTimeout: 6000,
    });
  }

  producer() {
    return this.kafka.producer({
      allowAutoTopicCreation: true,
      createPartitioner: Partitioners.DefaultPartitioner,
    });
  }

  async disconnect() {
    await this.kafka.admin().disconnect();
    console.log("Kafka disconnected");
    process.exit(0);
  }

  onDisconnect() {
    this.kafka.admin().on(this.kafka.admin().events.DISCONNECT, async () => {
      await this.disconnect();
    });
  }

  onClose() {
    this.kafka.admin().on(this.kafka.admin().events.REQUEST, async () => {
      await this.disconnect();
    });
  }

  onSigInt() {
    process.on("SIGINT", async () => {
      await this.disconnect();
    });
  }

  onSigTerm() {
    process.on("SIGTERM", async () => {
      await this.disconnect();
    });
  }

  onExit() {
    process.on("exit", async () => {
      await this.disconnect();
    });
  }
}

export const kafkaWrapper = new KafkaWrapper();
