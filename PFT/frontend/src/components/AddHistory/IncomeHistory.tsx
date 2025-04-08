import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import incomeDataType from "../../interfaces/incomeDataType";
import updateType from "../../interfaces/updateType";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomModal from "../Modal";
import { useUserContext } from "../../hooks/UserProvider";
/**Interface defining the expected props for the ExpenseHistory component
 * containing the id of the row that has to be updated in income table
 **/
interface ComponentType {
  edit: React.Dispatch<React.SetStateAction<updateType>>;
}
const IncomeHistory: React.FC<ComponentType> = ({ edit }) => {
  const [incomeData, setIncomeData] = useState<incomeDataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(-1);
  const { incomeCounter, updateIncome } = useUserContext();

  const [currentPage, setCurrentPage] = useState(1); // Keep track of current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const itemsPerPage = 5; // Number of items per page

  const token = Cookies.get("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/incomes?page=${currentPage}&limit=${itemsPerPage}`,
          config
        );
        console.log(response.data);
        setIncomeData(response.data.income);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [incomeCounter]);

  // Function to handle deletion of an income entry
  const handleEdit = (value: number) => {
    edit({ type: "income", id: value });
  };

  const handleDeleteConfirm = (value: number) => {
    setDeleteId(value);
    setIsModalOpen(true);
  };

  // Function to handle deletion of an eincome entry
  const handleDelete = async () => {
    try {
      setIsModalOpen(false);
      const value = deleteId;
      const response = await axios.delete(
        `http://localhost:4000/incomes/${value}`,
        config
      );
      if (response.status == 200) {
        updateIncome();
        toast.success("Deleted successfully !", {
          position: "top-right",
          autoClose: 2000,
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

    // Handle page change (previous, next, or specific page)
    const handlePageChange = (page: number) => {
      if (page > 0 && page <= totalPages) {
        setCurrentPage(page); 
       
      }
    };
  

  return (
    <>
      <div className="relative w-full h-3/4 mt-5  overflow-x-auto">
        <table className="border">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="p-3  border border-gray-400 text-left">Amount</th>
              <th className="p-3  border border-gray-400 text-left">
                Description
              </th>
              <th className="p-2  border border-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {incomeData.map((key) => (
              <tr key={key.id}>
                <td className="border p-5 border-gray-400 xl:pr-20">{key.amount}</td>
                <td className="border p-5 border-gray-400 xl:pr-20">
                  {key.description}
                </td>
                <td className="border p-4 border-gray-400 xl:pr-45">
                  <div className="flex  flex-col sm:flex-row gap-4 sm:gap-3">
                    <button
                      className="border border-green-600 px-4 sm:px-11 py-2 rounded-2xl cursor-pointer text-green-600 hover:bg-green-100"
                      onClick={() => handleEdit(key.id as number)}
                    >
                      Edit
                    </button>
                    <button
                      className="border border-red-600 px-4 sm:px-11 py-2 rounded-2xl cursor-pointer text-red-600 hover:bg-red-100"
                      onClick={() => handleDeleteConfirm(key.id as number)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
        <CustomModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          title="Confirm Action"
          message="Are you sure you want to Delete?"
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

export default IncomeHistory;
