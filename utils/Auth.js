const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require("passport");

const { SECRET } = require("../config");

/*
* @Desc to register an User = (Admin, Super User, User)
*/
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

/*
* @Desc to login an User = (Admin, Super User, User)
*/
const userLogin = async (userCredenditals, role, res) => {
    let { username, password } = userCredenditals;
    const user = await User.findOne({ username:username });
    
    //Check username in Database
    if (!user) {
        return res.status(404).json({
            message: 'User not found. Invalid login credentials',
            sucess: false
        });
    }
    //Check for role
    if (user.role !== role) {
        return res.status(403).json({
            message: 'Please make sure you are login from the right portal',
            sucess: false
        });
    }
    //Now check for the password
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        //Sign in with token and issue it to the user
        let token = jwt.sign(
            {
                user_id: user._id,
                role: user.role,
                username: user.username,
                email: user.email
            },
            SECRET,
            { expiresIn: "7 days" }
        );
        let result = {
            username: user.username,
            role: user.role,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: "168"
        };
        return res.status(200).json({
            ...result,
            message: 'You are logged in!',
            sucess: true
        });

    } else {
        return res.status(403).json({
            message: 'Incorrect password',
            sucess: false
        });
    }
};

const checkValidateUserName = async username => {
    let user = await User.findOne({ username });

    return user ? false : true;
}
const checkValidateEmail = async email => {
    let user = await User.findOne({ email });
    return user ? false : true;
}

module.exports = {
    userLogin,
    userRegister
};