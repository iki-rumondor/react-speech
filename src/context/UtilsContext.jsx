import { createContext, useContext, useState } from "react";

const UtilsContext = createContext();

export const UtilsProvider = ({ children }) => {
  const [classSelected, setClassSelected] = useState("");

  return (
    <UtilsContext.Provider value={{ classSelected, setClassSelected }}>
      {children}
    </UtilsContext.Provider>
  );
};

export const useUtils = () => useContext(UtilsContext);
