import { useContext, useState} from "react";
import { StoreContext } from ".";


export const useMemoryContext = () => {
  const store = useContext(StoreContext);
  return store.memory;
}

export const __useMemoryData = () => {
  const [memoryFreeSize, setMemoryFreeSize] = useState(16000); //Tamanho inicical livre
  const memorySize = 16000; //16GB = 16000Mb Tamanho da memória

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