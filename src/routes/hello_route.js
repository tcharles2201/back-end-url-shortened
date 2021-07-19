const Context = require("../lib/services/context");
const { id, router } = Context.Pull();
const controller = require("../controllers/hello_controller");

router.get("/hello", controller.hello);
