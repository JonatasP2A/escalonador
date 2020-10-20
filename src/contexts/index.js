import React, { createContext} from 'react';
import { __useProcessData } from './Process';

export const StoreContext = createContext();

export default ({ children }) => {
  
  return (
    <StoreContext.Provider value={{
        process: __useProcessData(),
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}