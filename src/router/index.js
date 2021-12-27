const express = require("express");
const authRouter = express.Router();
const apiRouter = express.Router();

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const friendRoutes = require("./friend.routes");
const roomRoutes = require("./room.routes");
const postsRoutes = require("./post.routes");

authRouter.use("/auth", authRoutes);

apiRouter.get("/health", (_, res) => res.send("Healthy"));
apiRouter.use("/user", userRoutes);
apiRouter.use("/friend", friendRoutes);
apiRouter.use("/rooms", roomRoutes);
apiRouter.use("/posts", postsRoutes);

module.exports = {
	authRouter,
	apiRouter,
};
