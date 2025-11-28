import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "fanout-producer",
  brokers: ["localhost:9092", "localhost:9093", "localhost:9094"],
});

const producer = kafka.producer();

async function run() {
  await producer.connect();
  console.log("🚀Producer connected");

  let counter = 1;

  setInterval(async () => {
    const msg = {
      id: counter,
      ts: new Date().toISOString(),
    };

    await producer.send({
      topic: "fanout-topic",
      messages: [{ value: JSON.stringify(msg) }],
    });

    console.log(`📤 Sent message ${counter}`);
    counter++;
  }, 2000);
}

run().catch(console.error);
