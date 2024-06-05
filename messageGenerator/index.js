const { Kafka } = require('kafkajs');

// Kafka configuration
const kafka = new Kafka({
  clientId: 'Shyam-logs',
  brokers: ['localhost:9094'] 
});

const producer = kafka.producer();

// Function to generate dynamic log payload
const generateLogPayload = () => {
  const loggingModes = ['ERROR', 'INFO', 'WARN'];
  const randomLogText = [
    'this is some random log text',
    'an error occurred in the system',
    'operation completed successfully',
    'user logged in',
    'unexpected input received'
  ];

  return {
    thread: `thread-${Math.floor(Math.random() * 10) + 1}`,
    loggingMode: loggingModes[Math.floor(Math.random() * loggingModes.length)],
    class: `com.shyam.demo${Math.floor(Math.random() * 10) + 1}`,
    message: randomLogText[Math.floor(Math.random() * randomLogText.length)],
    memoryUsage: Math.floor(Math.random() * 256) + 64,
    timestampInEpoch: Date.now()
  };
};

// Function to send log messages to Kafka
const sendMessage = async () => {
  await producer.connect();
  setInterval(async () => {
    const message = generateLogPayload();
    console.log('Sending message:', message);

    await producer.send({
      topic: 'logs-topic', 
      messages: [
        { value: JSON.stringify(message) }
      ],
    });
  }, 3000); // Send a message every 10 seconds
};

sendMessage().catch(console.error);
