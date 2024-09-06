const mongoose = require('mongoose');
main().catch(err=> console.log("Error connecting to MongoDB"));
async function main() {
await mongoose.connect("mongodb://localhost:27017/flexipay");
console.log("Connected to MongoDB");
}
const{Schema, model} = require("mongoose");


const userSchema = new Schema({
username: {
type: String,
required: true,
unique: true,
trim: true,
lowercase: true
},
password: {
type: String,
required: true
},
firstName: {
type: String,
required: true,
trim: true
},
lastName: {
type: String,
required: true,
trim: true
}
});

const User = model('User', userSchema);

const accountSchema= new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const Account= model('Account', accountSchema);

module.exports = {
User,
Account
};


