const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const User = require("../database/models/User");
const config = require("../../configs/config");

// Serialize User
passport.serializeUser((user, done) => done(null, user.id));

// Deserialize User
passport.deserializeUser(function (id, done) {
	User.findOne({ id }, (err, user) => done(err, user));
});

console.log(config.google);

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
				email = profile.emails[0].value;
				console.log(email);
				const user = await User.findOne({ email });
				if (user) return cb(null, user);
				else {
					const user = await User.create({
						email: email,
						username: "diabolusgx",
						displayName: profile.displayName,
						avatar: profile.photos[0]?.value,
						batchYear: "2018",
					});
					return cb(null, user);
				}
			} catch (err) {
				console.error(
					"Something went wrong while logging the user in:\n",
					err
				);
				return cb(err);
			}
		}
	)
);
