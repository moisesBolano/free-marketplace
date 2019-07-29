const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const MarketRouter = express.Router();

const auth = require('./helpers/auth');

const port = process.env.PORT || 8080;
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(port, function () {
    console.log("Runnning on " + port);
});

/***VALIDATE SESSION */

MarketRouter.route('/validateSession').post(auth.isAuth, (req, res) => {
    res.status(200).send({ message: "Access granted", login: true });
});

/*******ADMIN ROUTE */
var admin_controller = require('./controllers/admin.controller');

//MarketRouter.post('/LoginAdmin', admin_controller.loginAdmin);

/*********CATEGORY ROUTE */
var category_controller = require('./controllers/category.controller');

MarketRouter.route('/categories/listAllCategories/')
            .get(category_controller.listAllCategories)
            .post(category_controller.listAllCategories);

MarketRouter.route('/categories/createNewCategory/').post(auth.isAuth, (req,res) => category_controller.createNewCategory);

/*********SUBCATEGORY ROUTE */
MarketRouter.route('/categories/listSubCategoriesOfCaterory/').post(category_controller.listSubCategoriesOfCaterory);

/*************PRODUCTS ROUTE */
var products_controller = require('./controllers/products.controller');
MarketRouter.route('/poducts/listAllProducts/')
            .get(products_controller.listAllProducts)
            .post(products_controller.listAllProducts);

MarketRouter.route('/products/getDetailOfProduct/')
            .post(products_controller.getDetailOfProduct);

/******************SHOPPING CART ROUTE */
var cart_controller = require('./controllers/shoppingCar.controller');
//AddItem to shooping cart need auth first
MarketRouter.route('/shoppingCart/addItemToShoppingCart/').post(auth.isAuth, cart_controller.addItemToShoppingCart);
MarketRouter.route('/shoppingCart/detailOfMyShoppingCart/').post(auth.isAuth, cart_controller.detailOfMyShoppingCart);
MarketRouter.route('/shoppingCart/deleteItemOfMycart/').post(auth.isAuth, cart_controller.deleteItemOfMycart);

/******USERS ROUTES */
var user_controller = require('./controllers/user.controller');
MarketRouter.route('/loginUser').post(user_controller.loginUser);
MarketRouter.route("/getDetailUser/").post(auth.isAuth, user_controller.getDetailUser);
MarketRouter.route("/updateUserDetail/").post(auth.isAuth, user_controller.updateUserDetail);
MarketRouter.route("/createNewUser/").post(user_controller.createNewUser);


app.use('/', MarketRouter);

module.exports = app;