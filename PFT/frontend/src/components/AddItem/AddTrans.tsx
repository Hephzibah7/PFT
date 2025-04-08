import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import expenseDataType from "../../interfaces/expenseDataType";
import categoryDataType from "../../interfaces/categoryDataType";
import Cookies from "js-cookie";
import incomeDataType from "../../interfaces/incomeDataType";
import updateType from "../../interfaces/updateType";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../../hooks/UserProvider";
import transactionConstants from "../../constants/home";
import { useForm } from "react-hook-form";
import ErrorIcon from "@mui/icons-material/Error";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

/*
  Declaring the `AddTrans` functional component:
  - Accepts `edit` prop of type `updateType` to determine whether the user is editing an existing transaction.
  - Initializes state variables:
    - `expenseData`: Stores expense details.
    - `incomeData`: Stores income details.
    - `categoryData`: Holds new category input.
    - `categories`: Stores available categories fetched from the backend.
    - `selectedcategory`: Tracks the selected category for expenses.
    - `populateIncome`: Stores income data when editing an existing record.
  - Uses `useUserContext` to manage a counter for re-rendering after updates.
  - Retrieves authentication token from cookies and configures request headers.
*/
const AddTrans: React.FC<{ edit: updateType }> = ({ edit }) => {
  const [expenseData, setExpenseData] = useState<expenseDataType | null>(null);
  const [incomeData, setIncomeData] = useState<incomeDataType | null>(null);
  const [categoryData, setCategoryData] = useState("");
  const [categories, setCategories] = useState<categoryDataType[]>([]);
  const [selectedcategory, setSelectedCategory] = useState("");
  const [populateIncome, setPopulateIncome] = useState<incomeDataType | null>(
    null
  );
  const { register: registerIncome, handleSubmit: handleSubmitIncome, formState: { errors: errorsIncome } } = useForm({
    mode: "onBlur",
  });
  const { register: registerExpense, handleSubmit: handleSubmitExpense, formState: { errors: errorsExpense } } = useForm({
    mode: "onBlur",
  });
  const { expenseCounter, updateExpense } = useUserContext();
  const {updateIncome} = useUserContext();
  const token = Cookies.get("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
 

  /*
  useEffect Hook:
  - Fetches categories from the backend when the component mounts.
  - Calls `checkUpdate()` to determine if the component is in edit mode:
    - If `edit.id` is not -1, fetches existing income or expense data based on `edit.type`.
    - Populates the form fields with existing data for editing.
  - Ensures the effect runs whenever the `edit` prop changes.
*/

  /*
  Function: `getCategories`
  - Makes an API request to fetch categories.
  - Updates the `categories` state with the response data.
  - Displays an alert in case of an error fetching the data.
*/
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/categories",
          config
        );
        setCategories(response.data);
      } catch (error) {
        alert("Error fetching categories data");
      }
    };

    /*
  Function: `checkUpdate`
  - Determines if an existing income or expense entry is being edited.
  - If `edit.id` is valid, fetches the corresponding data from the backend.
  - Updates the respective state (`populateIncome` or `expenseData`) with the fetched details.
*/

    const checkUpdate = async () => {
      if (edit.id != -1) {
        if (edit.type == "income") {
          const response = await axios.get(
            `http://localhost:4000/incomes/${edit.id}`,
            config
          );
          setPopulateIncome(response.data);
          setIncomeData({
            amount: response.data.amount,
            description: response.data.description,
            id: response.data.id,
            userId: response.data.userId,
          });
        } else if (edit.type == "expense") {
          const response = await axios.get(
            `http://localhost:4000/expenses/${edit.id}`,
            config
          );
          setExpenseData({
            amount: response.data.amount,
            description: response.data.description,
            id: response.data.id,
            category: response.data.category,
          });
        }
      }
    };
    getCategories();
    checkUpdate();
  }, [edit]);

  /*
  Function: `addCategory`
  - Prevents default form submission behavior.
  - Sends a request to add a new category to the backend.
  - Displays success notification if the request is successful.
  - Displays an error notification if the request fails.
*/

  const addCategory = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      const data = {
        name: categoryData,
      };
      const response = await axios.post(
        "http://localhost:4000/categories",
        data,
        config
      );
      if (response.status == 200) {
        toast.success("New Category Added !", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("Failed to add category.Please try again", {
        position: "top-center",
      });
    }
  };

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryData(event.target.value);
  };

  const handleChangeExpense = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const name = event.target.name;
      const value = event.target.value;
      setExpenseData(
        (values) => ({ ...values, [name]: value } as expenseDataType)
      );
    } catch (error) {
      alert(error);
    }
  };

  const handleSelectExpense = (value: string | undefined) => {
    console.log(value);
    setSelectedCategory(value as string);
    setExpenseData(
      (values) => ({ ...values, ["category"]: value } as expenseDataType)
    );
  };

  const handleChangeIncome = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const name = event.target.name;
      const value = event.target.value;
      setIncomeData(
        (values) => ({ ...values, [name]: value } as incomeDataType)
      );
    } catch (error) {
      alert(error);
    }
  };

  /*
  Function: `handleAddIncome`
  - Prevents default form submission behavior.
  - If a new income entry is being added (`edit.id == -1`):
    - Sends a POST request to create a new income entry.
    - Displays a success notification upon successful creation.
  - If an existing income entry is being edited:
    - Sends a PATCH request to update the existing entry.
    - Displays a success notification upon successful update.
  - Resets the `incomeData` state to clear the form after submission.
  - Catches and handles errors by displaying an error notification.
*/
  const handleAddIncome = async () => {
    try {
      if (edit.id == -1) {
        const response = await axios.post(
          "http://localhost:4000/incomes",
          incomeData,
          config
        );
        if (response.status == 201) {
          updateIncome();
          toast.success("New Income Added successfully!", {
            position: "top-center",
          });
        }
        edit.id = -1;
        edit.type = "";
      } else {
        const data = {
          amount: incomeData?.amount,
          description: incomeData?.description,
        };
        const response = await axios.patch(
          `http://localhost:4000/incomes/${edit.id}`,
          data,
          config
        );
        if (response.status == 201) {
          updateIncome();
          toast.success("Income Updated successfully!", {
            position: "top-center",
          });
        }
      }

      setIncomeData({ id: "", userId: "", amount: "", description: "" });
    } catch (error) {
      toast.error(
        "Something went wrong. Please check your internet connection and try again!",
        {
          position: "top-center",
        }
      );
    }
  };

  /*
  Function: `handleAddExpense`
  - Prevents default form submission behavior.
  - If an existing expense entry is being edited (`edit.id != -1`):
    - Sends a PATCH request to update the entry.
    - Displays a success notification upon successful update.
    - Triggers a re-render using the `setCounter` state from `useUserContext`.
  - If a new expense is being added:
    - Sends a POST request to create a new expense entry.
    - Displays a success notification upon successful creation.
    - Triggers a re-render using `setCounter`.
  - Resets the `expenseData` state to clear the form after submission.
  - Catches and handles errors by displaying an error notification.
*/

  const validateInputs = (
    obj: expenseDataType | null | incomeDataType
  ): boolean => {
    let flag = true;
    if (!obj) return false;
    console.log(obj);
    Object.keys(obj).forEach((key, value) => {
      if (value == null) {
        console.log(key);
        flag = false;
      }
    });
    return flag;
  };
  const handleAddExpense = async () => {
 
    try {
      if (validateInputs(expenseData) == true) {
        if (edit.id != -1) {
          const data = {
            amount: expenseData?.amount,
            category: expenseData?.category,
            description: expenseData?.description,
          };
          console.log(data);
          const response = await axios.patch(
            `http://localhost:4000/expenses/${edit.id}`,
            data,
            config
          );
          if (response.status == 200) {
            toast.success("Expense updated successfully!", {
              position: "top-center",
            });
          }
          edit.id = -1;
          edit.type = "";
        } else {
          const response = await axios.post(
            "http://localhost:4000/expenses",
            expenseData,
            config
          );
          updateExpense();
          if (response.status == 200) {
            toast.success("New expense added successfully!", {
              position: "top-center",
              autoClose: 3000,
            });
          }
        }

        setExpenseData({ id: "", amount: "", category: "", description: "" });
        setSelectedCategory("");
      } else {
        toast.error("Inputs Missing!", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(
        "Something went wrong. Please check your internet connection and try again!",
        {
          position: "top-center",
        }
      );
    }
  };

  return (
    <>
      <>
        <div className="w-full flex flex-col items-center  lg:w-1/3 md:w-2/3  mx-auto  ">
          {/* Income Form */}
          <div className="w-full ">
            <form onSubmit={handleSubmitIncome(handleAddIncome)}>
              <div className="bg-blue-100 shadow-lg rounded-3xl p-5 mb-6 ">
                <h1 className="text-2xl font-bold">
                  {transactionConstants.income}
                </h1>
                <div className="mt-2 flex flex-col gap-2">
                  <div>
                    <h2 className="mb-2">
                      {transactionConstants.incomeamount}
                    </h2>
                    {errorsIncome.amount?.message && (
                      <div className="mb-1 flex justify-end absolute xl:top-35 xl:left-152 top-30 left-60 text-red-500 text-sm">
                        <ErrorIcon />
                        <p className="pl-2 pr-2">
                          {errorsIncome.amount.message as string}
                        </p>
                      </div>
                    )}
                    <input
                      {...registerIncome("amount", {
                        required: {
                          value: true,
                          message: "Amount is required",
                        },
                      })}
                      name="amount"
                      value={incomeData?.amount}
                      onChange={handleChangeIncome}
                      className="mb-2 border-gray-200 rounded-2xl w-full p-2 bg-white"
                    />
                  </div>
                  <div>
                    <h2 className="mb-2">
                      {transactionConstants.incomedescription}
                    </h2>
                    {errorsIncome.description?.message && (
                      <div className="mb-1 flex justify-end absolute xl:top-60 xl:left-148 top-55 left-55 text-red-500 text-sm">
                        <ErrorIcon />
                        <p className="pl-2 pr-2">
                          {errorsIncome.description.message as string}
                        </p>
                      </div>
                    )}
                    <input
                      {...registerIncome("description", {
                        required: {
                          value: true,
                          message: "Description is required",
                        },
                      })}
                      name="description"
                      value={incomeData?.description}
                      onChange={handleChangeIncome}
                      className="mb-2 border-gray-200 rounded-2xl w-full p-2 bg-white"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <button className="w-full p-3 bg-blue-950 rounded-2xl text-white">
                    {transactionConstants.incomebutton}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Expense Form */}
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmitExpense(handleAddExpense)}>
              <div className="bg-blue-100 shadow-lg rounded-3xl p-5">
                <h1 className="text-2xl font-bold">
                  {transactionConstants.expense}
                </h1>
                <div className="mt-2 ">
                  <div>
                    <h2 className="mb-2">
                      {transactionConstants.expenseamount}
                    </h2>
                    {errorsExpense.amount?.message && (
                      <div className="mb-1 flex justify-end absolute xl:top-122 xl:left-154 top-55 left-55 text-red-500 text-sm">
                        <ErrorIcon />
                        <p className="pl-2 pr-2">
                          {errorsExpense.amount.message as string}
                        </p>
                      </div>
                    )}
                    <input
                      {...registerExpense("amount", {
                        required: {
                          value: true,
                          message: "Amount is required",
                        },
                      })}
                      name="amount"
                      value={expenseData?.amount}
                      onChange={handleChangeExpense}
                      className="mb-2 border-gray-200 rounded-2xl w-full p-2 bg-white"
                    />
                  </div>
                  <div className="mb-3 mt-5">
                  {/* {errorsExpense.category?.message && (
                      <div className="mb-1 flex justify-end absolute xl:top-140  xl:left-152 top-65 left-55 text-red-500 text-sm">
                        <ErrorIcon />
                        <p className="pl-2 pr-2">
                          {errorsExpense.category.message as string}
                        </p>
                      </div>
                    )} */}
                    <Listbox
                    //   {...registerExpense("category", {
                    //     required: {
                    //       value: true,
                    //       message: "Category is required",
                    //     },
                    //   })}
                      value={expenseData?.category}
                      onChange={handleSelectExpense}
                      name="category"
                    >
                      <div className="relative">
                        <ListboxButton className="border-none text-black-500 p-2 rounded-2xl p-1 bg-white w-full flex justify-start" >
                          {selectedcategory || "Select Category"}
                        </ListboxButton>
                        <ListboxOptions className="absolute w-full max-h-40 overflow-y-auto border bg-white shadow-lg rounded">
                          {categories.map((key) => (
                            <ListboxOption
                              key={key.name}
                              value={key.name}
                              className="cursor-pointer p-2 hover:bg-blue-100"
                            >
                              {key.name}
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </div>
                    </Listbox>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-3 mb-3">
                    <input
                      className="border-gray-200 bg-white w-full md:w-3/5 rounded-2xl p-2"
                      value={categoryData}
                      onChange={handleChangeCategory}
                      placeholder="Add Category"
                    />
                    <button
                      className="bg-blue-950 rounded-xl p-3 text-white w-full md:w-2/5"
                      onClick={addCategory}
                    >
                      Add
                    </button>
                  </div>
                  <div>
                    <h2 className="mb-2">
                      {transactionConstants.expensedescription}
                    </h2>
                    {errorsExpense.description?.message && (
                      <div className="mb-1 flex justify-end absolute xl:top-178  xl:left-148 top-65 left-55 text-red-500 text-sm">
                        <ErrorIcon />
                        <p className="pl-2 pr-2">
                          {errorsExpense.description.message as string}
                        </p>
                      </div>
                    )}
                    <input
                    {...registerExpense("description", {
                      required: {
                        value: true,
                        message: "Description is required",
                      },
                    })}
                      value={expenseData?.description}
                      name="description"
                      onChange={handleChangeExpense}
                      className="mb-2 border-gray-200 rounded-2xl w-full p-2 bg-white"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <button className="w-full p-3 bg-blue-950 rounded-2xl text-white">
                    {transactionConstants.expensebutton}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    </>
  );
};

export default AddTrans;
