const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
    {
        text: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { _id: true }          // each expense has a unique ID
);

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        expenses: [expenseSchema]         // Store expenses as an array of objects
    },
    { timestamps: true }                 // Adds createdAt and updatedAt automatically
);

// Prevents model recompilation error
const UserModel = mongoose.models.users || mongoose.model('users', UserSchema);

module.exports = UserModel;
