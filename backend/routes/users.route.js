const router = require("express").Router();

const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
} = require("../controllers/users.controller");

const auth = require("../middleware/auth.middleware");

router.get("/", auth, getUsers);

router.patch("/me", updateProfile);

router.get("/:userId", getUserById);

router.patch("/me/avatar", updateAvatar);

module.exports = router;
