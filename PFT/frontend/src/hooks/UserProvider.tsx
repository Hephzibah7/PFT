/*eslint-disable*/

import React, { createContext, useState, useContext, useEffect } from "react";
import userType from "../interfaces/userType";
import userContextType from "../interfaces/userContextType";
import Cookies from "js-cookie";
import axios from "axios";
import expenseDataType from "../interfaces/expenseDataType";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserContext = createContext<userContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<userType | null>(null);
  const [expenseCounter, setExpenseCounter] = useState(1);
  const [incomeCounter, setIncomeCounter] =useState(1);

  const token = Cookies.get("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Function to update user and toggle boolean
  const updateExpense = () => {
    const val=expenseCounter+1;
    setExpenseCounter(val);
  };

  useEffect(()=>{
    updateUser();
  }, [])

  const updateIncome = () => {
    const val=incomeCounter+1;
    setIncomeCounter(val);
  };

  useEffect(()=>{
    updateUser();
  }, [])


  const updateUser = async () => {
    try {
      const response = await axios.get("http://localhost:4000/user", config);
      setUser(response.data);
    } catch (error) {
      toast.error("Unable to fetch User Details! ", {
        position: "top-center",
      });
    }
  };

  return (
    <UserContext.Provider value={{ user, expenseCounter, updateExpense, updateUser, incomeCounter, updateIncome }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useFormContext");
  }
  return context;
};
