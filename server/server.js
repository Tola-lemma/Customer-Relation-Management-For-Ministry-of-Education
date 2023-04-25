import express from "express";
import { routeNotFoundMiddleware } from "./middleware/notfound.js";
import { errorHandlerMiddleware } from "./middleware/errorHandler.js";
import { connectDatabase } from "./db/connection.js";
import {authRouter} from "./routes/auth.js"

const server = express();
const port = 3000 || process.env.PORT;

server.use(express.json());

server.use('/api/v1/auth', authRouter)

// Add the error handling middlewares
server.use(errorHandlerMiddleware);
server.use(routeNotFoundMiddleware);

const start = async () => {
  try {
    await connectDatabase(process.env.MONGO_CONNECTION_STRING);
    server.listen(port, () =>
      console.log(`server is listening on port ${port} ...`)
    );
  } catch (error) {}
};

start();
