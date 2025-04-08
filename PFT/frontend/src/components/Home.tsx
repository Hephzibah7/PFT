import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Transaction from "./Transaction";
import Analysis from "./Analysis";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import Budget from "./Budget";
function Home(){
    const [status, setStatus]=useState("Transactions");
    const navigate = useNavigate();
    return(
        <>
        <div className="flex">
            <Navbar option={setStatus}/>
         
             {status === "Dashboard" && <Analysis />} 
        {status === "Budget" && <Budget />}
        {status === "Transactions" && <Transaction />}
        
        </div>
        </>
    )
}

export default Home; 