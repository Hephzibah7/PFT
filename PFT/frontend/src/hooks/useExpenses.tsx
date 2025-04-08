import { useState, useEffect } from "react";
import axios from "axios";
import expenseDataType from "../interfaces/expenseDataType";
import Cookies from "js-cookie";

export function useExpenses() {
  const [allExpenseData, setAllExpenseData] = useState<expenseDataType[]>([]);
  const [refetch, setRefetch] = useState(false); // Trigger re-fetch
  const token = Cookies.get("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:4000/expenses", config);
        setAllExpenseData(response.data);
      } catch (error) {
        console.error("Error fetching expenses", error);
      }
    };
    fetchExpenses();
  }, [refetch]); // Runs when `refetch` changes

  // Function to trigger refetch
  const refetchExpenses = () => {
    console.log(allExpenseData);
    setRefetch(!refetch);
  };

  return { allExpenseData, refetchExpenses };
}

