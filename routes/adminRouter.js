const router = require("express").Router();
const Controller = require("../controllers/AdminController");

router.get("/", Controller.home);

router.get("/members/create", Controller.createMember);
router.get("/members/read/free", Controller.readMembersFree);
router.get("/members/read/pro", Controller.readMembersPro);
router.get("/members/update/:memberId", Controller.updateMember);
router.get("/members/delete/:memberId", Controller.deleteMember);

router.get("/items/create", Controller.createItem);
router.get("/items/read", Controller.readItem);
router.get("/items/update/:itemId", Controller.updateItem);
router.get("/items/delete/:itemId", Controller.deleteItem);

module.exports = router;