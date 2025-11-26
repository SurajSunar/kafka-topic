import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "fanout-A-client",
  brokers: ["localhost:9092", "localhost:9093", "localhost:9094"],
});

const consumer = kafka.consumer({ groupId: "fanout-group-A" });

async function run() {
  await consumer.connect();
  console.log("🟢 Consumer A connected");

  await consumer.subscribe({ topic: "fanout-topic", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = message.value.toString();
      console.log(`🟦 [A] Received: ${data}`);
    },
  });
}

run().catch(console.error);
