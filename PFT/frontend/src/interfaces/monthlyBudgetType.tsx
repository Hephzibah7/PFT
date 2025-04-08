import budgetInputType from "./budgetInputType";
interface monthlyBudgetType{
    show: boolean;
    handleClose: () => void;
    onSave: (data: budgetInputType | null) => void;
}
export default monthlyBudgetType;