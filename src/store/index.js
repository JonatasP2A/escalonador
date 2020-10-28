import React, { createContext} from 'react';
import { __useProcessData } from './Process';
import { __useLogData } from './Log';
import { __useTimeData } from './Time';
import { __useMemoryData } from './Memory';

export const StoreContext = createContext();

export default ({ children }) => {
  
  return (
    <StoreContext.Provider value={{
        process: __useProcessData(),
        log: __useLogData(),
        time: __useTimeData(),
        memory: __useMemoryData()
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}