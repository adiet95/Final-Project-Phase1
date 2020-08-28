const router = require("express").Router();
const Controller = require("../controllers/ProController");

router.get("/", Controller.home);
router.get("/edit-profile/:memberId", Controller.editProfileForm);
router.post("/edit-profile/:memberId", Controller.editProfile);
router.get("/top-up/:memberId", Controller.topUp);
router.get("/buy/:memberId", Controller.buyForm);
router.post("/buy/:memberId", Controller.buy);
router.get("/upgrade/:memberId", Controller.upgrade);

router.get("/add-item/:memberId", Controller.addForm);
router.post("/add-item/:memberId", Controller.add);
router.get("/items/:memberId", Controller.showItems);
router.get("/edit-item/:memberId/:itemId", Controller.editItemForm);
router.post("/edit-item/:memberId/:itemId", Controller.editItem);

module.exports = router;