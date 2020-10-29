import { useContext, useState } from "react";
import { StoreContext } from ".";


export const useCpuContext = () => {
  const store = useContext(StoreContext);
  return store.cpu;
}

export const __useCpuData = () => {
  const [cpu0, setCpu0] = useState({ id: -1, color: '#233D4D' }); //id do processo em execução
  const [cpu1, setCpu1] = useState({ id: -1, color: '#FFB7C3' }); //id do processo em execução
  const [cpu2, setCpu2] = useState({ id: -1, color: '#708D81' }); //id do processo em execução
  const [cpu3, setCpu3] = useState({ id: -1, color: '#8C4843' }); //id do processo em execução


  return {
    data: {
      cpu0,
      cpu1,
      cpu2,
      cpu3
    },
    actions: {
      setCpus: (obj) => {
        setCpu0(obj.cpus.cpu0);
        setCpu1(obj.cpus.cpu1);
        setCpu2(obj.cpus.cpu2);
        setCpu3(obj.cpus.cpu3);
      }
    }
  }
}