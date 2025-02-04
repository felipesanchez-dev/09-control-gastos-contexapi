import { useState, useMemo } from "react";
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {
    const [budget, setBudget] = useState<string>(""); // Ahora es un string
    const { dispatch } = useBudget();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        
        // Elimina ceros iniciales, pero permite escribir solo "0"
        if (/^0+\d/.test(value)) {
            value = value.replace(/^0+/, "");
        }
        setBudget(value);
    };

    const isValid = useMemo(() => {
        const numericBudget = Number(budget);
        return isNaN(numericBudget) || numericBudget <= 0;
    }, [budget]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'add-budget', payload: { budget: Number(budget) } });
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-green-400 font-bold text-center">
                    Definir Presupuesto
                </label>
                <input 
                    id="budget"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu Presupuesto" 
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>
            <input 
                type="submit" 
                value="Definir Presupuesto"
                className="bg-green-600 hover:bg-green-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
                disabled={isValid}
            />
        </form>
    );
};
