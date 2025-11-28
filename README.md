# kafka-topic

This repo to created to understand the concept of Kafka with fanout and queue based flow.

# Workflow

- There is producer which has topic attached to it. It send messages to that topic name.
- The consumers are listener where group name is tagged along with topic to listen to. Whenever there is message sent, its immediately invoked.
