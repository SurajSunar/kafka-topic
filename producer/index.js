// producer.js
import { Kafka } from "kafkajs";
import { v4 as uuidv4 } from "uuid";

const kafka = new Kafka({
  clientId: "test-producer",
  brokers: ["localhost:9092", "localhost:9093", "localhost:9094"],
});
const producer = kafka.producer();

async function run() {
  await producer.connect();
  console.log("Producer connected");
  for (let i = 0; i < 10; i++) {
    const payload = { id: uuidv4(), seq: i, ts: Date.now() };
    await producer.send({
      topic: "test-topic",
      messages: [{ value: JSON.stringify(payload) }],
    });
    console.log("Produced", payload.seq);
  }
  await producer.disconnect();
}

run().catch(console.error);
