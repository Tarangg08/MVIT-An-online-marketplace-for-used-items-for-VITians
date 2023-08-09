const mongoose = require('mongoose');
const {userSchema} = require("./models/user");

// Items functions
async function add_item(itemDetails) {
    const ItemModel = mongoose.model('item_list', itemSchema);
    let item = new ItemModel({
        "postedBy": itemDetails.postedBy,
        "postedByEmail": itemDetails.postedByEmail,
        "productCost": itemDetails.productCost,
        "productName": itemDetails.productName,
    });

    return await item.save();
}

async function get_item_by_id(itemID) {
    let ItemModel = mongoose.model('item_list', itemSchema);
    return await ItemModel.findById(itemID);
}

async function get_item_by_name(itemName) {
    let ItemModel = mongoose.model('item_list', itemSchema);
    return await ItemModel.find({"productName": itemName});
}

async function get_all_items() {
    let ItemModel = mongoose.model('item_list', itemSchema);
    return await ItemModel.find();
}

// Users function
async function add_user(userDetails) {
    const UserModel = mongoose.model('users', userSchema);
    let user = new UserModel({
        "name": userDetails.name,
        "email": userDetails.email,
        "about": userDetails.about,
        "password": userDetails.password
    });

    console.log(user);

    return await user.save()
}

async function get_user_by_id(userID) {
    let UserModel = mongoose.model('user', userSchema);
    return await UserModel.findById(userID);
}

async function get_user_by_email(userEmail) {
    let UserModel = mongoose.model('users', userSchema);
    return await UserModel.find({"email": userEmail});
}

module.exports = { add_item, get_item_by_id, get_item_by_name, get_all_items, add_user, get_user_by_id, get_user_by_email };