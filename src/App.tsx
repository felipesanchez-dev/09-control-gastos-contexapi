import { useMemo } from "react";
import BudgetForm from "./components/BudgetForm";
import { useBudget } from "./hooks/useBudget";
import BudgetTraker from "./components/BudgetTraker";
import ExpenseModal from "./components/ExpenseModal";

function App() { 

    const {state} = useBudget();
    const isValidBudget = useMemo(()=> state.budget > 0, [state.budget])

    return (
        <>
        <header className="bg-green-600 py-8 max-h-72">
            <h1 className=" uppercase text-center font-black text-4xl text-white">
            Planificador de Gastos 
            </h1>
        </header>
        
        <div className=" max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 pt-10">
            {isValidBudget ?<BudgetTraker/> :<BudgetForm/>}
        </div>

        {isValidBudget && (
            <main className=" max-w-3xl mx-auto py-10">
                <ExpenseModal/>
            </main>
        )}
        
        </>
    )
}

export default App
