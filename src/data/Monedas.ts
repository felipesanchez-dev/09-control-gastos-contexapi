
export interface Currency {
    id: string;
    name: string;
};

export const currencies: Currency[] = [
    { id: "USD", name: "Dólar estadounidense" },
    { id: "COP", name: "Peso Colombiano" },
    { id: "MXM", name: "Peso Mexicano" },
    // agregar más monedas aquí si lo deseas
];