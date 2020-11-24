const User = require("../models/User");
const bcrypt = require('bcrypt');

//Desc to register an User = (Admin, Super User, User)

const userRegister = async (userDetails, role, res) => {
    try {
        //Validate the user
        let usernameNotTaken = await checkValidateUserName(userDetails.username);
        if (!usernameNotTaken) {
            return res.status(400).json({
                message: 'Username is already taken',
                sucess: false
            });
        }
        //Validate the Email
        let emailNotTaken = await checkValidateEmail(userDetails.email);
        if (!emailNotTaken) {
            return res.status(400).json({
                message: 'Email is already taken',
                sucess: false
            });
        }

        //Get the hash password
        const hashpassword = await bcrypt.hash(userDetails.password, 12);
        // Create a new User
        const newUser = User({
            ...userDetails,
            role: role,
            password: hashpassword

        });
        await newUser.save();

        return res.status(201).json({
            message: 'User successfully registered',
            sucess: true
        });
    } catch (error) {
        //Implement logger function(winston)
        return res.status(500).json({
            message: 'Unable to create your account' + error,
            sucess: false
        });
    }
}

const checkValidateUserName = async username => {
    let user = await User.findOne({ username });

    return user ? false : true;
}
const checkValidateEmail = async email => {
    let user = await User.findOne({ email });
    return user ? false : true;
}

module.exports = {
    userRegister
};