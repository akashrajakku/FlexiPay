const mongoose = require('mongoose');
main().catch(err=> console.log("Error connecting to MongoDB"));
async function main() {
await mongoose.connect("mongodb://localhost:27017/flexipay");
console.log("Connected to MongoDB");
}


const userSchema = new mongoose.Schema({
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

const User = mongoose.model('User', userSchema);


module.exports = {
User
};


