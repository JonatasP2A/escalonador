import React, { createContext, useState } from 'react';
import { useContext } from 'react';

const ProcessContext = createContext();

export default function ProcessProvider({ children }) {
  const [process, setProcess] = useState([]);
  
  return (
    <ProcessContext.Provider
      value={{
        process,
        setProcess,
      }}
    >
      {children}
    </ProcessContext.Provider>
  );
}

export function useProcess() {
  const context = useContext(ProcessContext);
  if (!context) throw new Error("useProcess must be used within a ProcessProvider");
  const { process, setProcess} = context;
  return { process, setProcess};
}