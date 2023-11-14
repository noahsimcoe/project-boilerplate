const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) { // only hash if it is new or has been modified from one we already have
        const saltRounds = 10; // how much entropy/safety we are using for it, 10-12 is good
        this.password = await bcrypt.hash(this.password, saltRounds); // hashing password and putting it back as this.password
    }

    next();
});

userSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);