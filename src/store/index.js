import React, { createContext} from 'react';
import { __useProcessData } from './Process';
import { __useLogData } from './Log';
import { __useTimeData } from './Time';

export const StoreContext = createContext();

export default ({ children }) => {
  
  return (
    <StoreContext.Provider value={{
        process: __useProcessData(),
        log: __useLogData(),
        time: __useTimeData(),
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}