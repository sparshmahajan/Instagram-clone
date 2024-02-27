import { kafkaWrapper } from "../utils/kafkaWrapper";

interface Event {
  topic: string;
  data: any;
  prefix: string;
}

export abstract class Producer<T extends Event> {
  abstract topic: T["topic"];
  abstract prefix: T["prefix"];

  async publish(data: T["data"]) {
    console.log("Publishing to topic", `${this.prefix}${this.topic}`);

    const producer = kafkaWrapper.producer();
    await producer.connect();

    await producer.send({
      topic: `${this.prefix}${this.topic}`,
      acks: 1,
      messages: [{ value: JSON.stringify(data) }],
    });

    await producer.disconnect();
  }
}
