import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Bar } from "react-chartjs-2";
import dataType from "../interfaces/dataTyoe";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import catperDataType from "../interfaces/catperDataType";
import ChartDataLabels from "chartjs-plugin-datalabels";
import incomeDescType from "../interfaces/incomeDescType";
import expenseDescType from "../interfaces/expenseDescType";
import yearDataType from "../interfaces/yearDataType";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

function Analysis() {
  const [data, setData] = useState([]);
  const [expensedata, setExpenseData] = useState([]);
  const [categorylabel, setCategoryLabel] = useState([]);
  const [categorypercentage, setCategoryPercentage] = useState([]);
  const [year, setYear] = useState("2025");
  const [totalincome, setTotalIncome] = useState(0);
  const [totalexpense, setTotalExpense] = useState(0);
  const [totalbalance, setTotalBalance] = useState(0);
  const [incomedesc, setIncomeDesc] = useState<incomeDescType[]>([]);
  const [expensedesc, setExpenseDesc] = useState<expenseDescType[]>([]);
  const [expensePer, setExpensePer] = useState(0);
  const [filter, setFilter] = useState("monthly");
  const [yearData, setYearData] = useState<yearDataType[]>([]);
  const [yearsArray, setYearsArray] = useState<number[]>([]);
  const [incomesArray, setIncomesArray] = useState<(string | null)[]>([]);
  const [expensesArray, setExpensesArray] = useState<(string | null)[]>([]);
  const dataPattern = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Income per Month",
        data: data,
        barThickness: 50,
        backgroundColor: "rgba(13, 99, 211, 0.6)",
        borderWidth: 1,
      },
      {
        label: "Expense per Month",
        data: expensedata,
        barThickness: 50,
        backgroundColor: "rgba(218, 8, 54, 0.6)",
        borderWidth: 1,
      },
    ],
  };
  const categoryPattern = {
    labels: categorylabel,
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Percentage",
        data: categorypercentage,
        barThickness: 150,
        categoryPercentage: 3,
        backgroundColor: [
          "rgba(7, 55, 119, 0.6)",
          "rgba(218, 8, 54, 0.6)",
          "rgba(18, 148, 6, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };
 

  const yearlyPattern = {
    labels: yearsArray,
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Income per Year",
        data: incomesArray,
        barThickness: 50,
        backgroundColor: "rgba(13, 99, 211, 0.6)",
        borderWidth: 1,
      },
      {
        label: "Expense per Year",
        data: expensesArray,
        barThickness: 50,
        backgroundColor: "rgba(218, 8, 54, 0.6)",
        borderWidth: 1,
      },
    ],
  };
  const token = Cookies.get("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    try {
      const fetchcategoryper = async () => {
        const response = await axios.get(
          `http://localhost:4000/categorydata`,
          config
        );
        const categoryData = response.data.map(
          (key: catperDataType) => key.percentage
        );
        const categorylabelData = response.data.map(
          (key: catperDataType) => key.category
        );
        setCategoryLabel(categorylabelData);
        setCategoryPercentage(categoryData);
      };

      const fetchdata = async () => {
        const responseincome = await axios.get(
          `http://localhost:4000/totalincome`,
          config
        );
        setTotalIncome(responseincome.data[0].income);

        const responseexpense = await axios.get(
          `http://localhost:4000/totalexpense`,
          config
        );
        setTotalExpense(responseexpense.data[0].expense);

        const responseper = await axios.get(
          `http://localhost:4000/categoryper`,
          config
        );
        setExpensePer(responseper.data[0].percentage);
      };

      const fetchcategorydesc = async () => {
        try {
          const responseincome = await axios.get(
            `http://localhost:4000/incomesdesc`,
            config
          );
          console.log(responseincome.data);
          setIncomeDesc(responseincome.data);

          const responsexpense = await axios.get(
            `http://localhost:4000/expensesdesc`,
            config
          );
          setExpenseDesc(responsexpense.data);
        } catch (error) {}
      };

      fetchdata();
      fetchcategoryper();
      fetchcategorydesc();
    } catch (error) {}
  }, []);

  useEffect(() => {
    const years = Array.from({ length: 8 }, (_, i) => 2018 + i);
        // Initialize empty arrays for incomes and expenses
        const tempIncomesArray: (string | null)[] = [];
        const tempExpensesArray: (string | null)[] = [];
    // Populate the arrays with corresponding values for each year
    years.forEach((year) => {
      // Find the data for the current year
      const dataForYear = yearData.find(
        (item) => String(item.year) === String(year)
      );
      console.log(yearData);
     // Push the year, income, and expense to the respective arrays
     tempIncomesArray.push(dataForYear ? dataForYear.total_income : null);
     tempExpensesArray.push(dataForYear ? dataForYear.total_expense : null);
    });
    setYearsArray(years);
    setIncomesArray(tempIncomesArray);
    setExpensesArray(tempExpensesArray);
  }, [yearData]);

  useEffect(() => {
    try {
      const calcBalance = () => {
        const income = totalincome || 0;
        const expense = totalexpense || 0;
        const balance: number = income - expense;
        setTotalBalance(balance);
      };
      calcBalance();
    } catch (error) {}
  });
  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      console.log(event.target.value);
      setFilter(event.target.value);
      if (event.target.value == "Monthly") {
        const response = await axios.get(
          `http://localhost:4000/month/2025`,
          config
        );
        const incomeData = response.data.map((key: dataType) => key.incomes);
        const expenseData = response.data.map((key: dataType) => key.expenses);
        incomeData.unshift(0);
        expenseData.unshift(0);
        setExpenseData(expenseData);
        setData(incomeData);
      } else {
        const response = await axios.get(
          `http://localhost:4000/yearlydetails`,
          config
        );
       
        setYearData(response.data);
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="p-5 w-full xl:pl-85 pl-0 m-5 mt-10 md:mt-15 lg:mt-0 h-screen">
        <div className="mb-5">
          <h1 className="font-bold text-2xl mb-2">Dashboard</h1>
          <h4 className="text-gray-500">
            Keep Track, Assess, and Enhance Your Financial Performance
          </h4>
        </div>
        <div className="flex md:flex-nowrap flex-wrap w-full xl:h-1/3 gap-5 w-full ">
          <div className="border border-gray-400 rounded-2xl xl:w-1/3 p-3 w-full">
            <div className="font-bold">
              <h1>My Balance</h1>
            </div>
            <div className="mt-15">
              <h3 className="text-gray-400 mb-2">Total balance</h3>
              <h1 className="text-5xl font-bold">
                {totalbalance !== null ? `Rs ${totalbalance}` : "No Data"}
              </h1>
            </div>
          </div>
          <div className="border border-gray-400 rounded-2xl xl:w-1/3 p-3 w-full  ">
            <div className="flex justify-between">
              <h1 className="font-bold">My Income</h1>
              <h2>February 2025</h2>
            </div>
            <div className="mt-15">
              <h3 className="text-gray-400 mb-2">Total income</h3>
              <h1 className="text-5xl font-bold">
                {totalincome !== null ? `Rs ${totalincome}` : "No Data"}
              </h1>
              <div className="flex mt-5 ">
                {incomedesc.map((key) => (
                  <div className="border-x border-blue-400 lg:pr-12 md:pr-5 pl-3 pr-5  ">
                    <div>
                      <h1>{key.description}</h1>
                      <h3>{key.amount}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border border-gray-400 rounded-2xl xl:w-1/3 p-3 w-full">
            <div className="flex justify-between">
              <h1 className="font-bold">My Expense</h1>
              <h2>February 2025</h2>
            </div>
            <div className="mt-15">
              <h3 className="text-gray-400 mb-2">Total expense</h3>
              <h1 className="text-5xl font-bold">
                {totalexpense !== null ? `Rs ${totalexpense}` : "No Data"}
              </h1>
              <div className="flex mt-5 ">
                {expensedesc.map((key) => (
                  <div className="border-x border-blue-400 lg:pr-12 md:pl-5 pl-3 pr-5 ">
                    <div>
                      <h1>{key.category}</h1>
                      <h3>{key.amount}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap xl:flex-nowrap gap-3 w-full h-full md:h-1/2  mt-5">
          <div className="border border-gray-400 rounded-2xl lg:w-2/3 w-full p-3">
            <div className="flex font-bold justify-between">
              <h1>Money Flow</h1>
              <select className="p-2" onChange={handleChange}>
                <option>Select</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>
            <div className="w-full h-full md:ml-20 md:pb-20 md:p-5 mt-5">
            {filter=="Monthly" ?
              <Bar
              data={dataPattern}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Incomes vs Expenses",
                  },
                  legend: {
                    display: true,
                    position: "top",
                  },
                },
                scales: {
                  x: {
                    display: true,
                    stacked: true,
                  },
                  y: {
                    display: false,
                  },
                },
              }}
            />:
            <Bar
              data={yearlyPattern}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Incomes vs Expenses",
                  },
                  legend: {
                    display: true,
                    position: "top",
                  },
                },
                scales: {
                  x: {
                    display: true,
                    stacked: true,
                  },
                  y: {
                    display: false,
                  },
                },
              }}
            />
            }
            </div>
          </div>
          <div className="border border-gray-400 rounded-2xl xl:w-1/3 w-full p-3">
            <h1 className="font-bold">Categorical Breakdown</h1>
            <h1 className="mt-5 text-6xl font-bold ">{expensePer}%</h1>
            <div className="mt-20">
              <Bar
                data={categoryPattern}
                options={{
                  plugins: {
                    title: {
                      display: false,
                      text: "Category-Wise Data",
                    },
                    legend: {
                      display: false,
                      position: "top",
                    },
                    datalabels: {
                      anchor: "end",
                      align: "top",
                      color: "black",
                      font: {
                        weight: "bold",
                      },
                    },
                  },
                  scales: {
                    x: {
                      stacked: true,
                      position: "bottom",
                      grid: {
                        display: false,
                      },
                      ticks: {
                        padding: 5,
                        font: {
                          weight: "bold",
                        },
                      },
                    },
                    y: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analysis;
