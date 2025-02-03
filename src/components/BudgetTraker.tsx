import AmounDisplay from "./AmounDisplay";

export default function BudgetTraker() {
    return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className=" flex justify-center">
                <img src="/grafico.jpg" alt="Gráfica" />
            </div>

            <div className="flex flex-col justify-center gap-8">
                <button
                    type="button"
                    className=" bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                >
                    Resetear App
                </button>

                <AmounDisplay
                label="Presupuesto"
                amount={300}
                />
                <AmounDisplay
                    label="Disponible"
                    amount={200}
                />
                <AmounDisplay
                    label="Gastado"
                    amount={100}
                />
            </div>

            
    </div>
    )
}
