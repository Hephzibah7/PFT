import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import AddTrans from "./AddItem/AddTrans";
import History from "./AddItem/History";
import updateType from "../interfaces/updateType";
function Transaction(){
    const [incomeprop, SetIncomeProp]=useState<updateType>({type:"", id:-1});
    useEffect(()=>{
        console.log(incomeprop);
    }, [incomeprop, SetIncomeProp])
    return(
        <>
        <div className="xl:ml-80 mx-auto sm:p-4 md:p-0 sm-w-5/6  w-full   ">
  <div className="flex flex-col md:flex-row md:gap-10 sm:gap-7 gap-10 justify-between   sm:h-9/10 mt-10  sm:p-10 sm:pb-15 sm:m-10 p-6 md:p-0 md:pt-10  rounded-3xl">
    <AddTrans edit={incomeprop} />
    <History edit={SetIncomeProp} />
  </div>
</div>

        </>
    )
}

export default Transaction; 