const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const JWTstrategy = require("passport-jwt").Strategy;
const UserModel = require("../models/model");

// Authorize User Login
passport.use(
	"login",
	new localStrategy(
		{
			usernameField: "email",
			passwordField: "password"
		},
		async (email, password, done) => {
			try {
				const user = await UserModel.findOne({ email });
				if (!user) {
					throw "Email not registered";
				}

				const validate = await bcrypt.compare(password, user.password);
				if (!validate) {
					throw "Incorrect password";
				}

				return done(null, user, { message: "login successful" });
			} catch (error) {
				return done(error);
			}
		}
	)
);

// Authenticate Cookie
passport.use(
	"jwt",
	new JWTstrategy(
		{
			jwtFromRequest: req => req.signedCookies.jwt,
			secretOrKey: process.env.SECRET
		},
		async (jwtPayload, done) => {
			await UserModel.findOne({ _id: jwtPayload._id }, function(err, user) {
				if (err) return done(err, false);
				if (user) return done(null, user);
				return done(null, false);
			});
		}
	)
);
