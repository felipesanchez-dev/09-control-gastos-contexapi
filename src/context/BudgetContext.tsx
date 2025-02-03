import { createContext, Dispatch, useReducer, ReactNode } from "react";
import { BudgetActions,  budgetReducer, initialState, BudgetState} from "../reducers/budget-reducer";

// Definición de los tipos de contexto
type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
};

type BudgetProviderProps = {
  children: ReactNode
}

// Creación del contexto
export const BudgetContext = createContext<BudgetContextProps | null>(null);

// Proveedor del contexto
export const BudgetProvider = ({children}: BudgetProviderProps ) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    <BudgetContext.Provider 
      value={{ 
        state, 
        dispatch 
      }}
      >
      {children}
    </BudgetContext.Provider>
  );
};