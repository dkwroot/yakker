const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/*", async (req, res, next) => {
  await passport.authenticate("jwt", { session: false })(req, res, next);
});

router.post("/*", async (req, res, next) => {
  await passport.authenticate("jwt", { session: false })(req, res, next);
});

router.put("/*", async (req, res, next) => {
  await passport.authenticate("jwt", { session: false })(req, res, next);
});

router.delete("/*", async (req, res, next) => {
  await passport.authenticate("jwt", { session: false })(req, res, next);
});

module.exports = router;
