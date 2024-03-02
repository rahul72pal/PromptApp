import { Schema, model , models } from "mongoose";


const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'UserName is required'],
        unique: [true, 'UserName is exists!'],
        // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 
        // "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    email: {
        type: String,
        required: [true, 'UserName is required'],
        unique: [true, 'Email is exists!'],
        // You might want to add more validation for email format
    },
    image:{
        type: String
    },
    
});

const User = models.User || model('User', UserSchema);

module.exports = User;
