const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const MONGOURL = require('./config/keys')

const connectToMongo = () => {
    mongoose.connect(MONGOURL.MONGOURL, () => {
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;