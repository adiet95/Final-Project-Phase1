const router = require("express").Router();
const Controller = require("../controllers/FreeController");

router.get("/:memberId", Controller.home);
router.get("/:memberId/edit-profile", Controller.editProfileForm);
router.post("/:memberId/edit-profile", Controller.editProfile);
router.get("/:memberId/top-up", Controller.topUpForm);
router.post("/:memberId/top-up", Controller.topUp);
router.get("/:memberId/upgrade", Controller.upgradeForm);
router.post("/:memberId/upgrade", Controller.upgrade);
// router.get("/:memberId/buy", Controller.buyForm);
// router.post("/:memberId/buy", Controller.buy);

module.exports = router;