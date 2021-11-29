const express = require("express");
const authRouter = express.Router();
const apiRouter = express.Router();

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");

authRouter.use("/auth", authRoutes);

apiRouter.get("/health", (_, res) => res.send("Healthy"));
apiRouter.use("/user", userRoutes);

module.exports = {
	authRouter,
	apiRouter,
};
