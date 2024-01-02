import mongoose from "mongoose";

const connectMongoDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGODB_URI) {
      return;
    }

    // @ts-ignore
    const options = {
      // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000, // 20 seconds timeout for server selection
    socketTimeoutMS: 60000, // 60 seco// 다른 옵션들...
    };

    // @ts-ignore
    await mongoose.connect(process.env.MONGODB_URI, options);
  } catch (error) {
    console.error(error);
  }
};

export default connectMongoDB;
