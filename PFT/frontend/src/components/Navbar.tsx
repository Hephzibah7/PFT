

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../hooks/UserProvider";
import CustomModal from "./Modal";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";
import SavingsIcon from '@mui/icons-material/Savings';

interface StatusType {
  option: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<StatusType> = ({ option }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleState = (value: string) => {
    option(value);
    setIsMenuOpen(false); // Close menu after selecting an option
  };

  const handleLogOut = async () => {
    try {
      const response = await axios.post("http://localhost:4000/logout", {}, { withCredentials: true });
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong. Please check your internet connection and try again!", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <div className="lg:bg-blue-950 h-auto sm:h-screen sm:text-white md:w-0  sm:text-white   w-full lg:w-2/6  xl:w-1/6 w-full md:block flex flex-col lg:relative xl:fixed lg:fixed fixed z-20">
        {/* Menu Button (for small screens) */}
        <div className=" flex justify-between text-black  bg-white md:bg-white  p-2 md:p-5 lg:bg-blue-950 lg:text-white">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <SpeakerNotesIcon /> Fundcy
          </h1>
          <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black md:text-white cursor-pointer">
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          </div>
          
        </div>
        
        {/* Sidebar Menu */}
        <div className={`lg:block ${isMenuOpen ? "block" : "hidden"} sm:h-full h-screen text-xl sm:pr-5 md:mt-10 pl-5  md:w-full w-4/5 sm:w-3/5 rounded-xl  mr-10 bg-blue-950  sm:text-xl  text-white  bg-blue-100 z-30`}>
        <div className="bg-blue-100 flex justify-start items-center  sm:h-3/10 sm:w-full  lg:w-full sm:m-0 mt:w-1/5 h-2/10 w-4/5 m-5 text-black  rounded-3xl p-5 sm:m-5 lg:m-0 lg:h-1/4">
        <div className="text-3xl sm:text-4xl md:text-3xl  lg:text-4xl font-bold">Hi!<br></br> {user?.username}</div>
        </div> 
          <h1 className="text-2xl sm:text-2xl  mt-40 font-semibold ml-5">MENU</h1>
          <div className="mt-3 space-y-1 ml-5 pr-5">
            <div className="flex gap-2 hover:bg-blue-100 hover:text-black p-3 rounded cursor-pointer" onClick={() => handleState("Dashboard")}>
              <DashboardIcon />
              <h3>Dashboard</h3>
            </div>
            <div className="flex gap-2 hover:bg-blue-100 p-3  hover:text-black rounded cursor-pointer" onClick={() => handleState("Transactions")}>
              <ReceiptIcon />
              <h3>Transactions</h3>
            </div>
            <div className="flex gap-2 hover:bg-blue-100 p-3  hover:text-black rounded cursor-pointer" onClick={() => handleState("Budget")}>
              <SavingsIcon/>
              <h3>Budget</h3>
            </div>
          </div>
          
          <h1 className="mt-5 text-2xl font-semibold ml-5">TOOLS</h1>
          <div className="mt-3 pr-5">
            <div className="flex gap-3 hover:bg-blue-100 hover:text-black p-3 rounded cursor-pointer ml-5" onClick={() => setIsModalOpen(true)}>
              <LogoutIcon />
              <h2 >LogOut</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <CustomModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogOut}
        title="Confirm Action"
        message="Are you sure you want to log out?"
      />
      <ToastContainer />
    </>
  );
};

export default Navbar;

