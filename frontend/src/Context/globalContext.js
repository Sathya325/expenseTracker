import React, { useContext, useState } from "react";
import axios from 'axios';

const GlobalContext = React.createContext();

export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    const BASE_URL = "http://localhost:5000/api/v1/";

    const handleRequestError = (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            setError(error.response.data.message);
        } else if (error.request) {
            // The request was made but no response was received
            setError("No response received from the server.");
        } else {
            // Something happened in setting up the request that triggered an error
            setError("An error occurred while processing the request.");
        }
    };

    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}add-income`, income);
            getIncomes();
        } catch (error) {
            handleRequestError(error);
        }
    };

    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`);
            setIncomes(response.data);
        } catch (error) {
            handleRequestError(error);
        }
    };

    const deleteIncome = async (id) => {
        try {
            const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
            getIncomes();
        } catch (error) {
            handleRequestError(error);
        }
    };

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome = totalIncome + income.amount;
        });
        return totalIncome;
    };

    const addExpense = async (expense) => {
        try {
            const response = await axios.post(`${BASE_URL}add-expense`, expense);
            getExpenses();
        } catch (error) {
            handleRequestError(error);
        }
    };

    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`);
            setExpenses(response.data);
        } catch (error) {
            handleRequestError(error);
        }
    };

    const deleteExpense = async (id) => {
        try {
            const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
            getExpenses();
        } catch (error) {
            handleRequestError(error);
        }
    };

    const totalExpenses = () => {
        let totalExpenses = 0;
        expenses.forEach((expense) => {
            totalExpenses = totalExpenses + expense.amount;
        });
        return totalExpenses;
    };

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return history.slice(0, 3);
    };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
