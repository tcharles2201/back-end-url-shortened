const Context = require("../lib/services/context");
const { id, router } = Context.Pull();
const jwtMiddleware = require('../middleware/jwtMiddleware');

const authController = require("../controllers/users_controller");

//router.get('/api/users'/*, [jwtMiddleware.isAdmin]*/, authController.getAllUsers);
router.get("/api/users/", (req, res) => res.text("hello world"));
router.post('/api/users/', authController.userRegister);
router.get('/api/users/:userId', jwtMiddleware.verifyJWT, authController.getUserById);
router.put('/api/users/:userId', jwtMiddleware.verifyJWT, authController.updateUserById);
router.delete('/api/users/:userId', jwtMiddleware.isAdmin, authController.deleteUserById);

router.post('/api/users/login', authController.userLogin);
router.get('/api/users/authenticate', jwtMiddleware.verifyJWT, authController.isUserAuth);
