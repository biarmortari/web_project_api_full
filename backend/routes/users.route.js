const router = require("express").Router();
const {
  getUsers,
  getUserById,
  getUserInfo,
  updateProfile,
  updateAvatar,
} = require("../controllers/users.controller");

const auth = require("../middleware/auth.middleware");

router.get("/me", auth, getUserInfo);
router.patch("/me", auth, updateProfile);
router.patch("/me/avatar", auth, updateAvatar);

router.get("/", auth, getUsers);

router.get("/:userId", auth, getUserById);

module.exports = router;
