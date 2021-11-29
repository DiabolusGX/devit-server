const express = require("express");
const cors = require("cors");
require("./strategies/google");

const helmet = require("helmet");
const passport = require("passport");
const mongoose = require("mongoose");
const sessions = require("client-sessions");

const config = require("../configs/config");

// setup app and use middlewares
const app = express();
app.use(helmet());

// parse JSON body
app.use(express.json());

// cross origin access
app.use(
	cors({
		origin: `http://${config.client.hostname}:${config.client.port}`,
		credentials: true,
	})
);

// maintain client session
app.use(
	sessions({
		// cookie name -> key name added to the request object
		cookieName: "session",
		secret: config.sessions.secret,
		// how long the session will stay valid (ms)
		duration: config.sessions.duration,
		// if expiresIn < activeDuration, the session will be extended by activeDuration (ms)
		activeDuration: config.sessions.activeDuration,
		cookie: {
			httpOnly: true, // Cookie is not accessible from javascript
			ephemeral: true, // Exit session when browser closes
			secure: config.production, // Only allow through SSL
		},
	})
);

// Configure passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
const router = require("./router");
app.use(router.authRouter);
app.use("/api/v1", router.apiRouter);

// start database connection and server
const port = config.server.PORT;
mongoose
	.connect(config.mongo.URI, config.mongo.options)
	.then((result) => {
		app.listen(port, () => {
			console.log(`Server running on port: ${port}`);
		});
		console.log(`Connected to ${result.connections[0].name} database.`);
	})
	.catch((err) => console.error(err));
