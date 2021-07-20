const Context = require("../lib/services/context");
const { id, router } = Context.Pull();
const controller = require("../controllers/links_controller");
const validatorMiddleware = require("../middleware/validatorMiddleware");
const linksSchema = require("../lib/validation/index").linksSchema;

router.get("/api/links", controller.findAll);
router.post("/api/links", validatorMiddleware.validate(linksSchema), controller.save);
router.get("/api/:code", controller.redirectTo);
