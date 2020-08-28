const router = require("express").Router();
const freeRouter = require("./freeRouter");
// const proRouter = require("./proRouter");
// const adminRouter = require("./adminRouter");
const Controller = require("../controllers/MemberController");
const auten = require('../middlewares/log')

router.get("/", (req, res) => res.render("home"));


router.get("/login", Controller.loginForm);
router.post("/login", Controller.login);
router.get("/register", Controller.registerForm);
router.post("/register", Controller.register);
// router.get("/logout/:memberId", Controller.logout);

router.use(auten);

router.use("/membership/free", freeRouter);
// router.use("/membership/pro", proRouter);
// router.use("/admin", adminRouter);

module.exports = router;