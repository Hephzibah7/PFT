import userType from "./userType";
import expenseDataType from "./expenseDataType";
interface userContextType{
    user:userType|null,
   expenseCounter:number,
   updateExpense:()=>void,
  updateUser:()=>void,
  incomeCounter:number,
  updateIncome:()=>void
}

export default userContextType;