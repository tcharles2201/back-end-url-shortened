const Context = require("../lib/services/context");
const { id, router } = Context.Pull();
const controller = require("../controllers/links_controller");
const validatorMiddleware = require("../middleware/validatorMiddleware");
const linksSchema = require("../lib/validation/index").linksSchema;
const isAdmin = require("../middleware/jwtMiddleware").isAdmin;

router.get("/api/links", [isAdmin], controller.findAll);
router.post("/api/links", [validatorMiddleware.validate(linksSchema)], controller.save);
router.delete("/api/links/:id", controller.deleteOne);
router.put("/api/links",  controller.updateOne);
router.get("/api/:code", controller.redirectTo);
