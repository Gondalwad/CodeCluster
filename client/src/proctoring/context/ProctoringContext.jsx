import { createContext, useContext } from "react";

const ProctoringContext = createContext(null);

export function ProctoringProvider({ value, children }) {
  return (
    <ProctoringContext.Provider value={value}>
      {children}
    </ProctoringContext.Provider>
  );
}

export function useProctoringContext() {
  const context = useContext(ProctoringContext);

  if (!context) {
    throw new Error(
      "useProctoringContext must be used inside ProctoringProvider"
    );
  }

  return context;
}

export default ProctoringContext;