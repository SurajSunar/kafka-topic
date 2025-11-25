// createTopic.js
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "admin",
  brokers: ["localhost:9092", "localhost:9093", "localhost:9094"],
});

const admin = kafka.admin();

async function run() {
  await admin.connect();
  const created = await admin.createTopics({
    topics: [{ topic: "test-topic", numPartitions: 3, replicationFactor: 3 }],
    waitForLeaders: true,
  });
  console.log("Topics created?", created);
  await admin.disconnect();
}

run().catch(console.error);
