import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import budgetDetailType from "../interfaces/budgetDetailType";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BudgetModal from "./BudgetModal";
import budgetInputType from "../interfaces/budgetInputType";

function Budget() {
  const [budgets, setBudgets] = useState<budgetDetailType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const token = Cookies.get("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/budgetdetails",
        config
      );
      setBudgets(response.data);
    } catch (error) {
      toast.error("Failed to fetch budget details.Please try again", {
        position: "top-center",
      });
    }
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const handleSubmit = async (data: budgetInputType) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/budgets", data,
        config
      );
      if (response.status == 200) {
        toast.success("Budget Added successfully!", {
          position: "top-center",
        });
        fetchDetails();
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <div className="m-5 mt-10 lg:mt-10 lg:m-10 xl:pl-80 h-screen">
        <div className="xl:border xl:border-gray-400 xl:h-auto rounded-2xl">
          <div className="lg:m-10 w-auto h-screen">
            <h1 className="text-2xl lg:text-3xl md:text-3xl font-bold mb-10">
              My Budgets
            </h1>
            <div className="flex flex-wrap   h-5/12  gap-10 ">
              {/* Create New Budget Card */}
              <div
                className="border border-gray-200  w-full lg:w-6/14 sm:w-3/7 h-7/12 xl:w-4/13  rounded-2xl shadow-lg bg-blue-100 cursor-pointer"
                onClick={handleModal}
              >
                <div className="flex  justify-center items-center flex-col gap-3 w-auto h-full ">
                  <div className="text-5xl">+</div>
                  <div className="font-bold text-xl md:text-xl lg:text-xl">
                    Create New Budget!
                  </div>
                </div>
              </div>
              {/* Empty Budget Card 1 */}
              {budgets.map((key) => {
                // Calculate percentage
                const percentage =
                  (Number(key.spent) / Number(key.budget)) * 100;
                const progressBarWidth = Math.min(percentage, 100); // Ensuring the width doesn't exceed 100%

                return (
                  <div
                    key={key.category}
                    className="border border-gray-200 w-full xl:w-4/13 md:w-3/7 sm:w-5/7 h-7/12 p-10 rounded-2xl shadow-lg bg-blue-100 cursor-pointer"
                  >
                    {/* Content for this card */}
                    <div>
                      <div className="flex flex-wrap justify-between xl:text-2xl lg:text-2xl xl:text-xl font-bold">
                        <h2>{key.category}</h2>
                        <h2>{key.budget} Rs</h2>
                      </div>
                      <div>
                        <h2>{key.expense_count} Item</h2>
                      </div>
                      <div className="flex justify-between gap-10 md:gap-15 xl:mt-10 lg:mt-5 mt-5 mb-2 xl:mb-3 lg:mb-1">
                        <h2>{key.spent} Rs Spend</h2>
                        <h2>{key.balance} Rs Remaining</h2>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-full bg-gray-300 lg:h-7/5 h-4/5 rounded-full h-4">
                          <div
                            className="bg-blue-950 h-full text-center text-white rounded-full"
                            role="progressbar"
                            aria-valuenow={progressBarWidth} // Dynamically set progress value
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: `${progressBarWidth}%` }} // Dynamically set width
                          >
                            {percentage.toFixed(2)}%{" "}
                            {/* Display percentage with 2 decimal places */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <BudgetModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          onSave={handleSubmit}
        />
      </div>
    </>
  );
}

export default Budget;
