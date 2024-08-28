/**
 * This is config connect file 
 */

const { Sequelize } = require('sequelize');  // Only destructure Sequelize
const { logger } = require('sequelize/lib/utils/logger');

// Define a parameter of a database
const sequelize = new Sequelize("zomatodb", "root", "newRoot", {
    host: "localhost",
    dialect: "mysql"
});

sequelize
.authenticate()
.then(() => {
    console.log("Connected to MySQL successfully");
})
.catch((err) => {
    console.log("Unable to connect due to error", err);
});

module.exports = sequelize;