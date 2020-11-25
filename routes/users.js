const router = require("express").Router();

//Bring the user regitration function
const { userLogin, userRegister, userAuth, serializeUser, checkRole } = require("../utils/Auth");

//User Registration
router.post('/register-user', async (req, res) => {
    await userRegister(req.body, "user", res);
});
//Admin Registration Mode
router.post('/register-admin', async (req, res) => {
    await userRegister(req.body, "admin", res);
});
//Super Admin Registration Mode
router.post('/register-super-admin', async (req, res) => {
    await userRegister(req.body, "superadmin", res);
});
//User Login
router.post('/login-user', async (req, res) => {
    await userLogin(req.body, "user", res);
});
//Admin Login Mode
router.post('/login-admin', async (req, res) => {
    await userLogin(req.body, "admin", res);
});
//Super Admin Login Mode
router.post('/login-super-admin', async (req, res) => {
    await userLogin(req.body, "superadmin", res);
});
//Profile route
router.get('/profile', userAuth, async (req, res) => {
    return res.json(serializeUser(req.user));
});

//User Protected
router.get('/user-protected', userAuth, checkRole(["user"]), async (req, res) => {
    return res.json("Hello user");
});
//Admin Protected Mode
router.get('/admin-protected', userAuth, checkRole(["admin"]), async (req, res) => {
    return res.json("Hello admin");
});
//Super Admin Protected Mode
router.get('/super-admin-protected', userAuth, checkRole(["superadmin"]), async (req, res) => {
    return res.json("Hello super admin");
});
//Super Admin Protected Mode
router.get('/super-admin-and-admin-protected', userAuth, checkRole(["admin"],["superadmin"]), async (req, res) => {
    return res.json("Hello super admin and admin");
});
module.exports = router;