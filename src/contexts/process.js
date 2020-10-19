import React, { createContext, useState } from 'react';
import { useContext } from 'react';

const ProcessContext = createContext();

export default function ProcessProvider({ children }) {
  const [process, setProcess] = useState(null);
  const [id, setId] = useState(50);

  return (
    <ProcessContext.Provider
      value={{
        process,
        setProcess,
        id,
        setId
      }}
    >
      {children}
    </ProcessContext.Provider>
  );
}

export function useProcess() {
  const context = useContext(ProcessContext);
  if (!context) throw new Error("useProcess must be used within a ProcessProvider");
  const { process, setProcess, id, setId } = context;
  return { process, setProcess, id, setId };
}