import { useState, useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import { NumericFormat } from "react-number-format";

export default function BudgetForm() {
    const [budget, setBudget] = useState<string>(""); // Estado del presupuesto como string
    const { dispatch } = useBudget();

    const isValid = useMemo(() => {
        const numericBudget = Number(budget.replace(/,/g, "")); // Elimina separadores antes de evaluar
        return isNaN(numericBudget) || numericBudget <= 0;
    }, [budget]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: "add-budget", payload: { budget: Number(budget.replace(/,/g, "")) } });
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-green-400 font-bold text-center">
                    Definir Presupuesto
                </label>
                <NumericFormat
                    id="budget"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu Presupuesto"
                    name="budget"
                    value={budget}
                    thousandSeparator={true} // Formateo con separadores de miles
                    decimalScale={0} // Cero decimales
                    fixedDecimalScale={true}
                    allowNegative={false}
                    onValueChange={(values) => {
                        setBudget(values.formattedValue); // Guarda el valor formateado
                    }}
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
}
