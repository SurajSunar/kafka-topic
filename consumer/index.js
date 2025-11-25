// worker.js
import { Kafka } from "kafkajs";
const kafka = new Kafka({
  brokers: ["localhost:9092", "localhost:9093", "localhost:9094"],
  clientId: "worker",
});
const consumer = kafka.consumer({ groupId: "queue-workers" });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ message }) => {
      const payload = JSON.parse(message.value.toString());
      console.log("Consumed", payload.seq);
    },
  });
}

run().catch(console.error);
