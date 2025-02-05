import { useState } from "react";
import type { DraftExpense } from "../types";
import { categories } from "../data/categories";
import { currencies } from "../data/Monedas";
import DatePicker from "react-date-picker";
import { NumericFormat } from "react-number-format";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

interface ExpenseFormProps {
  onClose: () => void; // Función para cerrar el modal
}

export default function ExpenseForm({ onClose }: ExpenseFormProps) {
    const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
    currency: "",
    customCurrency: "",
    });

    // Estado para el mensaje de éxito
    const [message, setMessage] = useState<string>("");
    // Estado para el input de monto
    const [isAmountFocused, setIsAmountFocused] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación si el usuario selecciona la opción de moneda manual
    if (
        expense.currency === "manual" &&
        (expense.customCurrency?.trim() ?? "") === ""
    ) {
        alert("Por favor, ingresa el nombre de la moneda.");
        return;
    }

    // Aquí iría la lógica para enviar o almacenar el gasto
    const formattedAmount = expense.amount.toFixed(2);
    setMessage(`Gasto registrado exitosamente! ${formattedAmount}`);

    // Reiniciamos el formulario
    setExpense({
        amount: 0,
        expenseName: "",
        category: "",
        date: new Date(),
        currency: "",
        customCurrency: "",
    });

    // Opcional: Esperamos 2 segundos para mostrar el mensaje de éxito y luego cerramos el modal
    setTimeout(() => {
        onClose();
    }, 2000);
    };

    return (
    <div>
        <form className="space-y-5" onSubmit={handleSubmit}>
        <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
            Nuevos Gastos
        </legend>

        {/* Nombre del gasto */}
        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">
            Nombre Gastos:
            </label>
            <input
            type="text"
            id="expenseName"
            placeholder="Añade el nombre del gasto"
            className="bg-slate-100 p-2"
            name="expenseName"
            value={expense.expenseName}
            onChange={(e) =>
                setExpense({
                ...expense,
                expenseName: e.target.value,
                })
            }
            />
        </div>

        {/* Monto del gasto */}
        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">
            Gastos:
            </label>
            <NumericFormat
            id="amount"
            className="bg-slate-100 p-2"
            placeholder="Añade la cantidad del gasto: ej. 300"
            name="amount"
            value={
                isAmountFocused && expense.amount === 0 ? "" : expense.amount
            }
            thousandSeparator={true}
            decimalScale={0}
            fixedDecimalScale={true}
            allowNegative={false}
            onFocus={() => setIsAmountFocused(true)}
            onBlur={(e) => {
                setIsAmountFocused(false);
                if (!e.target.value || e.target.value.trim() === "") {
                setExpense({
                    ...expense,
                    amount: 0,
                });
                }
            }}
            onValueChange={(values) => {
                const { floatValue } = values;
                setExpense({
                ...expense,
                amount: floatValue ?? 0,
                });
            }}
            />
        </div>

        {/* Selección de moneda */}
        <div className="flex flex-col gap-2">
            <label htmlFor="currency" className="text-xl">
            Moneda:
            </label>
            <select
            id="currency"
            name="currency"
            className="bg-slate-100 p-2"
            value={expense.currency}
            onChange={(e) =>
                setExpense({
                ...expense,
                currency: e.target.value,
                customCurrency: "",
                })
            }
            >
            <option value=""> -- Seleccione -- </option>
            {currencies.map((currency) => (
                <option key={currency.id} value={currency.id}>
                {currency.name}
                </option>
            ))}
            <option value="manual">Otro (ingresar manualmente)</option>
            </select>
        </div>

        {/* Input para moneda manual */}
        {expense.currency === "manual" && (
            <div className="flex flex-col gap-2">
            <label htmlFor="customCurrency" className="text-xl">
                Ingresa la moneda:
            </label>
            <input
                type="text"
                id="customCurrency"
                placeholder="Ingresa el nombre de la moneda"
                className="bg-slate-100 p-2"
                name="customCurrency"
                value={expense.customCurrency}
                onChange={(e) =>
                setExpense({
                    ...expense,
                    customCurrency: e.target.value,
                })
                }
            />
            </div>
        )}

        {/* Categoría del gasto */}
        <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-xl">
            Categoría:
            </label>
            <select
            id="category"
            name="category"
            className="bg-slate-100 p-2"
            value={expense.category}
            onChange={(e) =>
                setExpense({
                ...expense,
                category: e.target.value,
                })
            }
            >
            <option value=""> -- Seleccione -- </option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                {category.name}
                </option>
            ))}
            </select>
        </div>

        {/* Fecha del gasto */}
        <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-xl">
            Fecha Gastos:
            </label>
            <DatePicker
            className="bg-slate-100 p-2 border-0"
            value={expense.date}
            onChange={(value) => {
                if (value instanceof Date) {
                setExpense({
                    ...expense,
                    date: value,
                });
                }
            }}
            />
        </div>

        {/* Botón de envío */}
        <input
            type="submit"
            className="bg-blue-600 cursor-pointer w-full p-2 text-white font-bold rounded-lg"
            value="Registrar Gastos"
        />
        </form>

      {/* Mensaje de éxito */}
        {message && (
        <div className="mt-4 p-4 bg-green-200 text-green-800 text-center rounded">
            {message}
        </div>
        )}
    </div>
    );
}


/* No se como tengas pensando hacer la toma de datos del formulario enviado,
ya que se puede de la forma con una base de datos o usando archivos json generados
en ambos casos el consumo de una api es buena opcion si no quieres usar api, pues
usa una base de datos y has este formulario tipo crud

ya para temrtinar, arregle tu problema que estabas presentando, tambien agrege las funciones
que querias agregar respecto a los formularios numeros que no se presentara el 0 es decir que
este si este pero que a una vez se escriba este se elimine de forma automatica
tambien recuerda en poner la caracteristica de la moneda un ejemplo si es colombia la moneda seria COP
puedes hacer eso agregando los tipos de monedas en un archivo en la carpeta types
*/