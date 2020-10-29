import React, { createContext} from 'react';
import { __useProcessData } from './Process';
import { __useLogData } from './Log';
import { __useTimeData } from './Time';
import { __useMemoryData } from './Memory';
import { __useCpuData } from './Cpu';

export const StoreContext = createContext();

export default ({ children }) => {
  
  return (
    <StoreContext.Provider value={{
        process: __useProcessData(),
        log: __useLogData(),
        time: __useTimeData(),
        memory: __useMemoryData(),
        cpu: __useCpuData()
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}