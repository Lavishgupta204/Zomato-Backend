
const { log } = require("console");
const express = require("express");
const app = express();
const { User, Restaurant, Menu, Order, Order_details } = require("./models");
// const Restaurant = require("./models");

const port = 8080;


app.listen(port, (err) => {
    if(err) console.log("Error Occured");
    else console.log("Server started at PORT: ", port);
});

app.use(express.json());

// create a simple get api that gives you some data in response

app.post("/registerUser", 
    async (req, res) => {
        const {UserName, emailUser, password, phone_Number} = req.body;
        console.log(UserName, emailUser);

        try {
            const newUser = await User.create({
                UserName,
                emailUser,
                password,
                phone_Number
            }); 
            console.log(newUser);
            res.status(201).send("User Created successfully")

        } catch (error) {
            console.log(error);
            
        }             
    }
);

// for login api
app.post("/login", async (req, res) => {
    const {emailUser, password} = req.body;

    const findUser = await User.findOne({where : {emailUser : emailUser}});

    if(findUser){
        const logData = JSON.parse(JSON.stringify(findUser));
        console.log(logData.password);
        
        if (logData.password == password) {
            res.status(200).send("Logged in successfully");
        }
        else{
            res.status(401).send('Invalid username or password')
        }
    } else{
        res.status(200).status("User does not exist, kindly Sregister")
    }
});


app.post("/registerRestaurant", async (req, res) => {
    const {restaurant_name, restaurant_address, restaurant_phone, restaurant_rating, restaurant_status} = req.body;

    // console.log(req.body);    
    try {
        const newRestaurant = await Restaurant.create(
            {
                restaurant_name,
                restaurant_address,
                restaurant_phone,
                restaurant_rating,
                restaurant_status
            }
        );
        if(newRestaurant){
            res.status(201).send("Restaurant added successfully");
        }

    } catch (error) {
        console.log(error);
        res.status(400).send("something went wrong!");
    }
});

app.post("/addMenu", async(req, res) => {
    const {item_name, item_description, item_price, item_rating, item_availability, is_veg, restaurant_id} = req.body;
    
    try {
        const newMenu = await Menu.create({
            item_name,
            item_description,
            item_price,
            item_rating,
            item_availability,
            is_veg,
            restaurant_id
        });
        if(newMenu){
            res.status(200).send("Menu is created Successfully")
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("Nothing found")      
    }
});

app.post("/createOrder", async(req, res) => {
    const {idUSERS, quantity, price, item_id, payment_method} = req.body;
    try {
        const newOrder_tables = await Order_details.create({
            idUSERS,
            quantity,
            price,
            item_id,
            payment_method
        });

        if (newOrder_tables) {
            try {
                // find the restaurant id from item_id
                // from restaurant id get the menu and from that get the restaurant

                const restaurant_id_data = await Menu.findByPk(item_id);
                // const obj = JSON.parse(JSON.stringify(restaurant_id_data));
                const restaurant_id = restaurant_id_data.restaurant_id;
                
                // const restaurant_id = obj.restaurant_id;
                
                // const order_id_obj = JSON.parse(JSON.stringify(newOrder_tables));
                // console.log(order_id_obj);
                
                const order_id = newOrder_tables.order_id;

                // console.log(Order);                

                const createOrder = await Order.create({
                    order_id,
                    restaurant_id,
                    idUSERS,
                    order_status : 'Pending',
                    item_id
                });
                if(createOrder){
                    res.status(201).send("Aapka Order lag gaya");
                }

            } catch (error) {
                console.log(error);
                res.status(400).send("Error occured??")
            }
        }

    } catch (error) {
        console.log(error);
        res.status(400).send("Order Table??")
    }
})