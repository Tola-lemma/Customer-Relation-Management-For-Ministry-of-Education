import {} from "dotenv/config";
import "express-async-errors";
import express from "express";
import { routeNotFoundMiddleware } from "./middleware/notfound.js";
import { errorHandlerMiddleware } from "./middleware/errorHandler.js";
import { connectDatabase } from "./db/connection.js";
import { authRoute } from "./routes/auth.js";
import { adminRoute } from "./routes/admin.js";
import { authMiddleware, isAuthorized } from "./middleware/auth.js";
import { Roles } from "./models/roles.js";
import { rateLimiter, speedLimiter} from "./utils/rateLimiters.js"

const server = express();
const port = process.env.PORT || 3000;

server.use(express.json());
server.use(rateLimiter, speedLimiter);
server.use("/api/v1/auth", authRoute);
server.use(
  "/api/v1/admin",
  authMiddleware,
  isAuthorized(Roles.Admin),
  adminRoute
);

// Add the error handling middlewares
server.use(errorHandlerMiddleware);
server.use(routeNotFoundMiddleware);

const start = async () => {
  try {
    await connectDatabase(process.env.MONGO_CONNECTION_STRING);
    server.listen(port, () =>
      console.log(`server is listening on port ${port} ...`)
    );
  } catch (error) {
    // console.log(error);
  }
};

start();
