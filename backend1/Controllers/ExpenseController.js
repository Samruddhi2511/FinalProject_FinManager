const UserModel = require('../models/User'); // Ensure correct path

const addExpenses = async (req, res) => {
    const body = req.body;
    const { _id } = req.user;

    if (!req.user || !_id) {
        return res.status(400).json({ message: "User not authenticated", success: false });
    }

    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id, // user ID
            { $push: { expenses: body } },
            { new: true } // return updated info
        );

        return res.status(200).json({
            message: "Your expense added successfully",
            success: true,
            data: userData?.expenses
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message,
            success: false
        });
    }
};

const fetchExpenses = async (req, res) => {
    const { _id } = req.user;

    if (!req.user || !_id) {
        return res.status(400).json({ message: "User not authenticated", success: false });
    }

    try {
        const userData = await UserModel.findById(_id).select('expenses');

        return res.status(200).json({
            message: "Expenses fetched successfully",
            success: true,
            data: userData?.expenses
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message,
            success: false
        });
    }
};

const deleteExpenses = async (req, res) => {
    const { _id } = req.user;
    const { expenseId } = req.params;

    if (!req.user || !_id) {
        return res.status(400).json({ message: "User not authenticated", success: false });
    }

    if (!expenseId) {
        return res.status(400).json({
            message: "Expense ID is required",
            success: false
        });
    }

    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id, // user ID
            { $pull: { expenses: { _id: expenseId } } },
            { new: true } // return updated info
        );

        if (!userData) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Your expense was deleted successfully",
            success: true,
            data: userData?.expenses
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message,
            success: false
        });
    }
};

module.exports = {
    addExpenses,
    fetchExpenses,
    deleteExpenses
};
