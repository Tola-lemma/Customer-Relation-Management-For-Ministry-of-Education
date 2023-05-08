import mongoose from "mongoose";

export const connectDatabase = (connectionString) => mongoose.connect(connectionString);
