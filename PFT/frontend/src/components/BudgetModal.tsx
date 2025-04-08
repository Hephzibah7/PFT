import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import monthlyBudgetType from '../interfaces/monthlyBudgetType';
import budgetInputType from '../interfaces/budgetInputType';

const BudgetModal: React.FC<monthlyBudgetType> = ({
  show,
  handleClose,
  onSave,
}) => {

  if(!show) return null;

  const [modalData, setModalData]=useState<budgetInputType|null>(null);



  const handleOnChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
    try{
      const name=event.target.name;
      const value=event.target.value;
      setModalData(
        (values) => ({ ...values, [name]: value } as budgetInputType)
      )
    }
    catch(error){
      alert(error);
    }
  }

  const handleSubmit=()=>{
   onSave(modalData);
    handleClose();
  }

  return (
    
    <div
    className="fixed inset-0 flex items-center justify-center z-10 bg-opacity-50 cursor-pointer"
    onClick={handleClose}
  >
    <div
      className="modal-content bg-white p-5 rounded-2xl shadow-xl w-96 h-auto backdrop-blur"
      onClick={(e) => e.stopPropagation()} // Prevent clicking inside from closing the modal
    >
      <div className="modal-header flex justify-between items-center border-b pb-3">
        <h2 className="text-lg font-semibold">Enter Monthly Budget</h2>
        <button onClick={handleClose} className="text-gray-500 text-3xl cursor-pointer">
          &times;
        </button>
      </div>
      <div className="modal-body mt-4">
        <form >
          {/* Amount Field */}
          <div className="mb-3">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleOnChange}
            />
          </div>

          {/* Category Field */}
          <div className="mb-3">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleOnChange}
            />
          </div>
        </form>
      </div>
      <div className="modal-footer flex justify-end mt-4">
        <button
          className="px-4 py-2 mr-2 text-white bg-gray-500 rounded-md cursor-pointer"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md cursor-pointer"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
 
  );
};

export default BudgetModal;
