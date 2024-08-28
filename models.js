const {DataTypes} = require("sequelize");

const sequelize = require("./dbConnect");

const User = sequelize.define("User", {
    idUSERS: {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    UserName :{
        type: DataTypes.STRING,
        allowNull : false
    },
    emailUser : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    phone_Number : { 
        type : DataTypes.INTEGER,
        allowNull : false,
        unique : true
    },
    createdAt : {
        type : DataTypes.TIME
    },
    updatedAt : {
        type : DataTypes.TIME
    }
});


const Menu = sequelize.define("food_menu",{
    item_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    item_name :{
        type: DataTypes.STRING,
        allowNull : false
    },
    item_description : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    item_price : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    item_rating : { 
        type : DataTypes.INTEGER,
    },
    item_availability : { 
        type : DataTypes.INTEGER,
        allowNull : false
    },
    is_veg : { 
        type : DataTypes.BOOLEAN,
        allowNull : false
    },
    restaurant_id : { 
        type : DataTypes.INTEGER,
        allowNull : false,
        unique : true
    },
    createdAt : {
        type : DataTypes.TIME
    },
    updatedAt : {
        type : DataTypes.TIME
    }
});


const Restaurant = sequelize.define("restaurant", {
    restaurant_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    restaurant_name :{
        type: DataTypes.STRING,
        allowNull : false
    },
    restaurant_address : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    restaurant_phone : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    restaurant_rating : { 
        type : DataTypes.INTEGER,
    },
    restaurant_status : { 
        type : DataTypes.INTEGER,
        allowNull : false,
        unique : true
    },
    createdAt : {
        type : DataTypes.TIME
    },
    updatedAt : {
        type : DataTypes.TIME
    }
});

const Order = sequelize.define("Order", {
    order_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    restaurant_id :{
        type: DataTypes.INTEGER,
        allowNull : false
    },
    item_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    idUSERS : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    order_status : { 
        type : DataTypes.STRING,
        allowNull : false,
        defaultValue : "Pending"
    },
    createdAt : {
        type : DataTypes.TIME
    },
    updatedAt : {
        type : DataTypes.TIME
    }
});

const Order_details = sequelize.define("Order_details", {
    order_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    idUSERS : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    quantity : { 
        type : DataTypes.INTEGER,
        allowNull : false
    },
    price : { 
        type : DataTypes.INTEGER,
        allowNull : false
    },
    item_id : { 
        type : DataTypes.INTEGER,
        allowNull : false
    },
    payment_method : { 
        type : DataTypes.STRING,
        allowNull : false
    },
    createdAt : {
        type : DataTypes.TIME
    },
    updatedAt : {
        type : DataTypes.TIME
    }
});

Menu.belongsTo(Restaurant, {foreignKey : "restaurant_id"});
Restaurant.hasMany(Menu, {foreignKey : "restaurant_id"});

User.hasMany(Order, {foreignKey : "idUSERS"});
Order.belongsTo(User, {foreignKey : "idUSERS"});
Order_details.belongsTo(Order, {foreignKey : "order_id"});
Order.hasMany(Order_details, {foreignKey : "order_id"});


module.exports = {
    User,
    Menu,
    Restaurant,
    Order,
    Order_details
};