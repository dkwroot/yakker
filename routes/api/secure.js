const express = require("express");
const router = express.Router();
const UserModel = require("../../models/model");
const validator = require("validator");
const isImageUrl = require("is-image-url");
const defaultImage = require("../../constants");

router.get("/profile", (req, res) => {
	res.status(200).send({
		payload: {
			picture: req.user.picture,
			username: req.user.username,
			email: req.user.email,
			bio: req.user.bio,
			comments: req.user.comments
		}
	});
});

router.put("/profile", async (req, res) => {
	let errors = [];
	if (!isImageUrl(req.body.picture) && req.body.picture !== "") {
		errors.push("Not an image url");
	}
	if (!validator.isLength(req.body.bio, { min: 0, max: 121 })) {
		errors.push("Bio must be less than 120 characters");
	}
	if (errors.length > 0) {
		res.status(400).send({ message: errors });
	} else {
		// If user sets picture to null, set to default image
		let pictureURL = req.body.picture;
		if (pictureURL === "" || pictureURL === null) pictureURL = defaultImage;
		await UserModel.update(
			{ _id: req.user._id },
			{
				picture: pictureURL,
				bio: req.body.bio
			}
		);
		res.status(200).send({
			payload: {
				picture: pictureURL,
				bio: req.body.bio
			}
		});
	}
});

router.post("/addcomment", async (req, res) => {
	let errors = [];
	if (!validator.isLength(req.body.comment, { min: 0, max: 121 })) {
		errors.push("Comments must be less than 120 characters");
	}

	if (errors.length > 0) {
		res.status(400).send({ message: errors });
	} else {
		const currDate = new Date();
		const result = await UserModel.findByIdAndUpdate(req.user._id, {
			$push: {
				comments: {
					$each: [{ comment: req.body.comment, date: currDate.toISOString() }],
					$position: 0
				}
			}
		});
		if (result) {
			res
				.status(200)
				.send({ message: { comment: req.body.comment, date: currDate } });
		}
	}
});

router.delete("/deletecomment", async (req, res) => {
	const currDate = new Date(req.body.date);
	const result = await UserModel.findByIdAndUpdate(
		req.user._id,
		{ $pull: { comments: { date: req.body.date } } },
		{ new: true }
	);
	if (result) {
		res.status(200).send({ message: "Message Deleted Successful" });
	} else {
		res.status(400).send({ message: "Delete Failed" });
	}
});

module.exports = router;
