const Context = require("../lib/services/context");
const { id, router } = Context.Pull();
const jwtMiddleware = require('../middleware/jwtMiddleware');

const authController = require("../controllers/users_controller");

router.get('/api/users/authenticate', jwtMiddleware.verifyJWT, authController.isUserAuth);
router.post('/api/users/', authController.userRegister);
router.post('/api/users/login', authController.userLogin);


router.get('/api/users/', jwtMiddleware.verifyJWT, authController.getAllUsers);
router.get('/api/users/:userId', jwtMiddleware.verifyJWT, authController.getUserById);

router.put('/api/users/:userId', jwtMiddleware.verifyJWT, authController.updateUserById);

router.delete('/api/users/:userId', jwtMiddleware.verifyJWT, authController.deleteUserById);