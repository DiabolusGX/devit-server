const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const User = require("../database/models/User");
const config = require("../../configs/config");

// Serialize User
passport.serializeUser((user, done) => done(null, user.id));

// Deserialize User
passport.deserializeUser(function (id, done) {
	User.findById(id, (err, user) => done(err, user));
});

// Set up Passport Google Strategy
passport.use(
	new GoogleStrategy(
		{
			clientID: config.google.clientID,
			clientSecret: config.google.clientSecret,
			callbackURL: config.google.redirectURI,
			scope: ["email", "profile"],
		},
		async (request, accessToken, refreshToken, profile, cb) => {
			try {
				const email = profile.emails[0].value;

				// validate email
				// if (!email.endsWith("@vitbhopal.ac.in")) {
				// 	return cb("", null);
				// }

				const user = await User.findOne({ email });

				if (user) return cb(null, user);
				else {
					// get name and year from email
					const username = email.substring(0, email.indexOf("@"));
					const displayName = username
						.slice(0, -4)
						.replaceAll(".", " ");
					const batchYear = username.slice(-4);
					const avatar = profile.photos[0]?.value;

					const newUser = await User.create({
						email,
						username,
						displayName,
						batchYear,
						avatar,
					});
					return cb(null, newUser);
				}
			} catch (err) {
				console.error("Error while logging the user in:\n", err);
				return cb(err);
			}
		}
	)
);
