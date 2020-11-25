const cors = require("cors");
const express = require("express");
const bodeparser = require("body-parser");
const passport = require("passport");
const { connect } = require("mongoose");
const { success, error } = require("consola");

//Bring contants in th App
const { DB, PORT } = require("./config");
//Initialize the application
const app = express();
//Middlewares
app.use(cors());
app.use(bodeparser.json());
app.use(passport.initialize());

require('./middlewares/passport')(passport);
//User router middleware
app.use('/api/users', require("./routes/users"));

const startapp = async () => {
    try {
        //connecting with database
        await connect(DB, {
            useFindAndModify: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        success({
            message: `Successfully conected with the Database \n${DB} `,
            badge: true
        });
        // start listening for server on PORT
        app.listen(PORT, () => success({
            message: `Server started on port: ${PORT}`,
            badge: true
        }));
    } catch (error) {
        error({
            message: `Error conecting with the Database \n${DB}`,
            badge: true
        });
        //startapp();
    }
};
startapp();

