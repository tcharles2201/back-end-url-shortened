const Context = require("../lib/services/context");
const { id, router } = Context.Pull();
const controller = require("../controllers/links_controller");
const validatorMiddleware = require("../middleware/validatorMiddleware");
const linksSchema = require("../lib/validation/links_schema");

router.get("/links", controller.findAll);
router.post("/links", validatorMiddleware(linksSchema), controller.save);
