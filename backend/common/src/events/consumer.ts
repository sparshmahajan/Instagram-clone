import { kafkaWrapper } from "../utils/kafkaWrapper";
import { topics } from "./enums/topics";

interface Event {
  consumer: string;
  topic: string;
  prefix: string;
  data: any;
}

export abstract class Consumer<T extends Event> {
  abstract topic: T["topic"];
  abstract consumer: T["consumer"];
  abstract data: T["data"];
  abstract prefix: T["prefix"];

  abstract run(): void;

  async listen() {
    const consumer = kafkaWrapper.consumer(`${this.prefix}${this.consumer}`);
    await consumer.connect();

    await consumer.subscribe({
      topic: `${this.prefix}${this.topic}`,
    });

    await consumer.run({
      eachMessage: async ({ topic, message, partition, heartbeat }) => {
        console.log("Received message", {
          topic,
          value: message.value ? message.value.toString() : null,
          partition,
        });

        heartbeat();
        //do something with the message
        const data = JSON.parse(message.value!.toString());

        this.data = data;
        this.run();

        //acknowledge the message
        consumer.commitOffsets([{ topic, partition, offset: message.offset }]);
      },
    });
  }
}
