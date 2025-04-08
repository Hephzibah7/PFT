import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomModal from "../Modal";
import { useUserContext } from "../../hooks/UserProvider";

interface ComponentType {
  edit: React.Dispatch<React.SetStateAction<{ type: string; id: number }>>;
}

const ExpenseHistory: React.FC<ComponentType> = ({ edit }) => {
  const [expenseData, setExpenseData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(-1);
  const { expenseCounter, updateExpense } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Keep track of current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const itemsPerPage = 5; // Number of items per page

  const token = Cookies.get("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async (page:number) => {
    try {
      setExpenseData([]);
      const response = await axios.get(`http://localhost:4000/expenses?page=${page}&limit=${itemsPerPage}`, config);
      console.log("Fetched Data: ", response.data); // Log response data
      setTotalPages(response.data.totalPage);
      return response.data.expenses;
    } catch (error) {
      console.error("Error fetching data: ", error);
      toast.error("Error fetching data", {
        position: "top-center",
      });
    }
  };
  const fetchDataAsync = async () => {
    try {
      setIsLoading(true);
      console.log(expenseCounter);
      const data = await fetchData(currentPage);
      console.log("Data received after fetching the data:", data); // Log received data
        setExpenseData(data); // Update with the fetched data
    } catch (error) {
      console.error("Error during fetch:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };
  useEffect(() => {
    fetchDataAsync(); // Fetch data asynchronously
  }, [expenseCounter, currentPage]); // Fetch when expenseCounter changes

  // Function to handle update of an expense entry
  const handleEdit = (value: number) => {
    edit({ type: "expense", id: value });
  };

  // Function to handle deletion of an expense entry
  const handleDelete = async () => {
    try {
      console.log("Deleting ID:", deleteId);
      setIsModalOpen(false);
      const response = await axios.delete(
        `http://localhost:4000/expenses/${deleteId}`,
        config
      );
      console.log("Delete Response:", response);
      if (response.status === 200) {
        updateExpense();
        toast.success("Deleted successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please check your internet connection and try again!", {
        position: "top-center",
      });
    }
  };

   // Handle page change (previous, next, or specific page)
   const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page); 
     
    }
  };

  return (
    <>
      <div className="relative w-full mt-5 overflow-x-auto overflow-y-auto">
        <table className="w-full border border-collapse table-auto">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="p-3 border border-gray-400 text-left">Category</th>
              <th className="p-3 border border-gray-400 text-left">Amount</th>
              <th className="p-3 border border-gray-400 text-left">Description</th>
              <th className="p-3 border border-gray-400 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenseData.length > 0 ? (
              expenseData.map((key) => (
                <tr key={key.id} className="">
                  <td className="border p-5 border-gray-400">{key.category}</td>
                  <td className="border p-5 border-gray-400">{key.amount}</td>
                  <td className="border p-5 border-gray-400">{key.description}</td>
                  <td className="border p-3 border-gray-400">
                    <div className="flex  flex-col sm:flex-row gap-4 sm:gap-3">
                      <button
                        className="border border-green-600 px-4 sm:px-11 py-2 rounded-2xl cursor-pointer text-green-600 hover:bg-green-100"
                        onClick={() => handleEdit(key.id as number)}
                      >
                        Edit
                      </button>
                      <button
                        className="border border-red-600 px-4 sm:px-11 py-2 rounded-2xl cursor-pointer text-red-600 hover:bg-red-100"
                        onClick={() => {
                          setDeleteId(key.id as number);
                          setIsModalOpen(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-3">
                  {isLoading ? "Loading..." : "No data available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <ToastContainer />
        <CustomModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          title="Confirm Action"
          message="Are you sure you want to delete?"
        />

<div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-950 text-white rounded-lg cursor-pointer"
          >
            Previous
          </button>
          <span className="mx-4 text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-950 text-white rounded-lg cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ExpenseHistory;
