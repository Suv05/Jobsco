import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const createConnection = async () => {
  if (!uri) {
    throw new Error("MongoDB URI is missing. Please set MONGODB_URI in your environment variables.");
  }

  const connectWithRetry = async () => {
    try {
      // Attempt to connect to MongoDB
      await mongoose.connect(uri, clientOptions);
      // Ping to ensure connection is established
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error.message);
      console.log("Retrying connection in 5 seconds...");
      // Retry connection after a delay
      setTimeout(connectWithRetry, 5000);
    }
  };

  // Initial connection attempt
  connectWithRetry();

  // Handle process termination and disconnect cleanly
  process.on("SIGINT", async () => {
    await mongoose.disconnect();
    console.log("MongoDB connection closed due to app termination.");
    process.exit(0);
  });
};

export default createConnection;
