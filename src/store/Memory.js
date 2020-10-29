import { useContext, useState} from "react";
import { StoreContext } from ".";
import {MEMORY_SIZE} from '../constants';


export const useMemoryContext = () => {
  const store = useContext(StoreContext);
  return store.memory;
}

export const __useMemoryData = () => {
  const [memoryFreeSize, setMemoryFreeSize] = useState(MEMORY_SIZE); //Tamanho inicical livre
  const memorySize = MEMORY_SIZE; //16GB = 16000Mb Tamanho da memória

  return {
    data: {
      memoryFreeSize,
      memorySize,
    },
    actions: {
      setNewFreeMemoryValue: (newFreeMemoryValue) => { //Recebe diminui a quantidade de memória livre
          setMemoryFreeSize(newFreeMemoryValue);
      }
    }
  }
}