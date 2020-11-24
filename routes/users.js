const router = require("express").Router();

//Bring the user regitration function
const { userRegister } = require("../utils/Auth");

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

});
//Admin Login Mode
router.post('/login-admin', async (req, res) => {

});
//Super Admin Login Mode
router.post('/login-super-admin', async (req, res) => {

});
//Profile route
router.get('/profile', async (req, res) => {

});

//User Protected
router.post('/user-protected', async (req, res) => {

});
//Admin Protected Mode
router.post('/admin-protected', async (req, res) => {

});
//Super Admin Protected Mode
router.post('/super-admin-protected', async (req, res) => {

});
module.exports = router;