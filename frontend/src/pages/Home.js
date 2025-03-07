import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIUrl, handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import ExpensesTable from "./ExpensesTable";
import ExpenseTrackerForm from "./ExpenseTrackerForm";
import ExpenseTotal from "./ExpenseTotal";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
    const [loggedInUser, setLoggedInUser] = useState("");
    const [expenses, setExpenses] = useState([]);
    const [expenseAmt, setExpenseAmt] = useState(0);
    const [incomeAmt, setIncomeAmt] = useState(0);
    const [showExpenses, setShowExpenses] = useState(false); // Toggle State
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("loggedInUser");
        if (!user) {
            navigate("/login");
        } else {
            setLoggedInUser(user);
        }
    }, [navigate]);

    // Fetch Expenses from API
    const fetchExpenses = async () => {
        try {
            const url = `${APIUrl}/expenses`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });

            if (response.status === 403) {
                navigate("/login");
                return;
            }

            const result = await response.json();
            if (result && result.data) {
                setExpenses(result.data);
            } else {
                setExpenses([]);
            }
        } catch (err) {
            handleError("Failed to fetch expenses");
        }
    };

    // Update Expense & Income Amounts
    useEffect(() => {
        if (!Array.isArray(expenses)) return;

        const amounts = expenses.map((item) => item.amount);
        const income = amounts.filter((item) => item > 0).reduce((acc, item) => acc + item, 0);
        const expense = amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) * -1;

        setIncomeAmt(income);
        setExpenseAmt(expense);
    }, [expenses]);

    // Add Expense
    const addExpenses = async (data) => {
        try {
            const url = `${APIUrl}/expenses`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.status === 403) {
                navigate("/login");
                return;
            }

            const result = await response.json();
            if (result && result.data) {
                setExpenses(result.data);
                handleSuccess(result.message || "Expense added successfully");
            }
        } catch (err) {
            handleError("Failed to add expense");
        }
    };

    // Delete Expense
    const handleDeleteExpense = async (expenseId) => {
        try {
            const url = `${APIUrl}/expenses/${expenseId}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 403) {
                navigate("/login");
                return;
            }

            const result = await response.json();
            if (result && result.data) {
                setExpenses(result.data);
                handleSuccess(result.message || "Expense deleted successfully");
            }
        } catch (err) {
            handleError("Failed to delete expense");
        }
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        setExpenses([]);
        handleSuccess("User logged out");
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div>
            <div className="user-section">
                <h1>Welcome, {loggedInUser}</h1>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>

            <ExpenseTotal incomeAmt={incomeAmt} expenseAmt={expenseAmt} />
            <ExpenseTrackerForm addExpenses={addExpenses} />

            {/* Toggle Button */}
            <button className="toggle-expenses-btn" onClick={() => setShowExpenses(!showExpenses)}>
                {showExpenses ? "Hide Expenses List" : "Show Expenses List"}
            </button>

            {/* Show Expenses List Only When showExpenses is True */}
            {showExpenses && <ExpensesTable expenses={expenses} handleDeleteExpense={handleDeleteExpense} />}

            <ToastContainer />
        </div>
    );
}

export default Home;
