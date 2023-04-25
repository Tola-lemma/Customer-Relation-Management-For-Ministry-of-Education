import express from "express";

const server = express();
const port = 3000 || process.env.PORT;

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ msg: "home page" });
});

server.listen(port, () => console.log(`server is listening on port ${port} ...`));
