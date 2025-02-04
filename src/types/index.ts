export type Expense = {
    id: string;
    expenseName: string;
    amount: number;
    category: string;
    date: Value;
    // Nueva propiedad para la moneda
    currency: string;
    // Propiedad opcional para cuando se ingrese la moneda de forma manual
    customCurrency?: string;
};

export type DraftExpense = Omit<Expense, "id">;

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Category = {
    id: string;
    name: string;
    icon: string;
};
